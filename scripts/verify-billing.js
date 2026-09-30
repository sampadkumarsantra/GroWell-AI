/*
 * Sanity checks for the parts of billing that do not need a
 * database: entitlement resolution and webhook signature
 * verification. Run with: node scripts/verify-billing.js
 */

process.env.JWT_SECRET = "test-secret";
process.env.RAZORPAY_WEBHOOK_SECRET = "whsec_test";

const crypto = require("crypto");

const {
    PLANS,
    FREE,
    PREMIUM,
    effortAllowed
} = require("../services/entitlements");

const {
    verifyWebhookSignature
} = require("../services/billing");

const {
    resolveEntitlement
} = require("../middleware/auth");

let failed = 0;

function check(name, actual, expected) {
    const pass = actual === expected;
    if (!pass) {
        failed++;
    }
    console.log(
        `${pass ? "PASS" : "FAIL"}  ${name}` +
            (pass
                ? ""
                : `\n        expected ${expected}, got ${actual}`)
    );
}


// =====================================================
// ENTITLEMENT RESOLUTION
// =====================================================

check(
    "no subscription row → free",
    resolveEntitlement(null).plan,
    FREE
);

check(
    "active subscription → premium",
    resolveEntitlement({
        plan: PREMIUM,
        status: "active",
        current_period_end: new Date(Date.now() + 864e5)
    }).isPremium,
    true
);

check(
    "authenticated status counts as active",
    resolveEntitlement({
        plan: PREMIUM,
        status: "authenticated",
        current_period_end: new Date(Date.now() + 864e5)
    }).isPremium,
    true
);

check(
    "pending payment → still free",
    resolveEntitlement({
        plan: PREMIUM,
        status: "pending",
        current_period_end: new Date(Date.now() + 864e5)
    }).isPremium,
    false
);

check(
    "cancelled → free",
    resolveEntitlement({
        plan: PREMIUM,
        status: "cancelled",
        current_period_end: new Date(Date.now() + 864e5)
    }).isPremium,
    false
);

check(
    "halted (failed payment) → free",
    resolveEntitlement({
        plan: PREMIUM,
        status: "halted",
        current_period_end: new Date(Date.now() + 864e5)
    }).isPremium,
    false
);

check(
    "lapsed period end → free",
    resolveEntitlement({
        plan: PREMIUM,
        status: "active",
        current_period_end: new Date(Date.now() - 1000)
    }).isPremium,
    false
);

check(
    "cancel_at_period_end keeps access until period ends",
    resolveEntitlement({
        plan: PREMIUM,
        status: "active",
        cancel_at_period_end: true,
        current_period_end: new Date(Date.now() + 864e5)
    }).isPremium,
    true
);

check(
    "downgrade rewrites plan to free",
    resolveEntitlement({
        plan: PREMIUM,
        status: "completed"
    }).plan,
    FREE
);


// =====================================================
// EFFORT GATING
// =====================================================

check(
    "free cannot run Deep",
    effortAllowed(FREE, "Deep"),
    false
);

check(
    "free can run Balanced",
    effortAllowed(FREE, "Balanced"),
    true
);

check(
    "free can run Quick",
    effortAllowed(FREE, "Quick"),
    true
);

check(
    "free cannot exceed Balanced",
    effortAllowed(FREE, "Detailed"),
    false
);

check(
    "premium can run Deep",
    effortAllowed(PREMIUM, "Deep"),
    true
);

check(
    "premium can run everything",
    effortAllowed(PREMIUM, "Quick"),
    true
);

check(
    "unknown plan falls back to free limits",
    effortAllowed("enterprise", "Deep"),
    false
);

check(
    "free quota is 15/day",
    PLANS[FREE].chatPerDay,
    15
);

check(
    "premium chat is unlimited",
    PLANS[PREMIUM].chatPerDay,
    null
);

check(
    "premium voice is unlimited",
    PLANS[PREMIUM].voicePerMonth,
    null
);


// =====================================================
// WEBHOOK SIGNATURE
// =====================================================

const billing = require("../services/billing");

const body = JSON.stringify({
    event: "subscription.activated",
    payload: {
        subscription: {
            entity: { id: "sub_1" }
        }
    }
});

const good = crypto
    .createHmac("sha256", "whsec_test")
    .update(body)
    .digest("hex");

check(
    "valid signature accepted",
    billing.verifyWebhookSignature(body, good),
    true
);

check(
    "tampered body rejected",
    billing.verifyWebhookSignature(
        body.replace("activated", "cancelled"),
        good
    ),
    false
);

check(
    "missing signature rejected",
    billing.verifyWebhookSignature(body, undefined),
    false
);

check(
    "empty signature rejected",
    billing.verifyWebhookSignature(body, ""),
    false
);

check(
    "wrong-length signature rejected without throwing",
    billing.verifyWebhookSignature(body, "abc"),
    false
);

check(
    "garbage signature rejected",
    billing.verifyWebhookSignature(body, "z".repeat(64)),
    false
);


console.log("");

if (failed > 0) {
    console.log(`❌ ${failed} check(s) failed`);
    process.exit(1);
}

console.log("✅ All billing checks passed");
