/*
 * One-time Razorpay live setup for GroWell Premium.
 *
 * Usage:
 *   1. Put your LIVE keys in .env (never paste them in chat):
 *        RAZORPAY_KEY_ID=rzp_live_xxxxxxxx
 *        RAZORPAY_KEY_SECRET=xxxxxxxx
 *   2. Run:
 *        npm run setup:billing
 *   3. Copy the printed env lines into Render (or set them there
 *      before the first run and use --skip-env-write).
 *
 * The script is idempotent: it creates the monthly plan only if
 * missing, verifies an existing plan matches the displayed price,
 * and creates/updates the subscription webhook.
 */

require("dotenv").config();

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const {
    PLANS,
    PREMIUM
} = require("../services/entitlements");

const PREMIUM_PRICE_IN_PAISE = PLANS[PREMIUM].priceInPaise;

const DEFAULT_WEBHOOK_BASE =
    "https://growell-ai-2.onrender.com";

const WEBHOOK_EVENTS = [
    "subscription.authenticated",
    "subscription.activated",
    "subscription.charged",
    "subscription.completed",
    "subscription.updated",
    "subscription.pending",
    "subscription.halted",
    "subscription.paused",
    "subscription.resumed",
    "subscription.cancelled"
];

// The merchant webhook API (/v1/webhooks) expects events as an
// object map of event name → true, not an array.
const WEBHOOK_EVENT_MAP = Object.fromEntries(
    WEBHOOK_EVENTS.map((name) => [name, true])
);

const ENV_PATH = path.join(__dirname, "..", ".env");

function argValue(name) {
    const prefix = `--${name}=`;
    const found = process.argv.find((arg) =>
        arg.startsWith(prefix)
    );

    return found ? found.slice(prefix.length) : "";
}

function hasFlag(name) {
    return process.argv.includes(`--${name}`);
}

function fail(message) {
    console.error(`\n❌ ${message}\n`);
    process.exit(1);
}

function upsertEnv(values) {
    if (hasFlag("skip-env-write")) {
        return;
    }

    let content = "";

    try {
        content = fs.readFileSync(ENV_PATH, "utf8");
    } catch {
        content = "";
    }

    for (const [key, value] of Object.entries(values)) {
        if (!value) {
            continue;
        }

        const line = `${key}=${value}`;
        const pattern = new RegExp(
            `^\\s*${key}\\s*=.*$`,
            "m"
        );

        if (pattern.test(content)) {
            content = content.replace(pattern, line);
        } else {
            content = `${content.replace(/\s*$/, "")}\n${line}\n`;
        }
    }

    fs.writeFileSync(ENV_PATH, content, "utf8");
}

async function main() {
    const keyId = (process.env.RAZORPAY_KEY_ID || "").trim();
    const keySecret = (
        process.env.RAZORPAY_KEY_SECRET || ""
    ).trim();

    if (!keyId || !keySecret) {
        fail(
            "RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set in .env.\n" +
                "   Use the LIVE keys from Razorpay Dashboard → Account & Settings → API Keys."
        );
    }

    if (
        !keyId.startsWith("rzp_live_") &&
        !hasFlag("allow-test")
    ) {
        fail(
            "This is not a live key (rzp_live_...). Live payments will not work with test keys.\n" +
                "   Add the LIVE key to .env, or pass --allow-test to set up test mode."
        );
    }

    const Razorpay = require("razorpay");

    const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret
    });

    const updates = {
        RAZORPAY_KEY_ID: keyId,
        RAZORPAY_KEY_SECRET: keySecret
    };

    console.log("\n🔎 Checking Razorpay credentials…");

    try {
        await razorpay.plans.all({ count: 1 });
    } catch (error) {
        fail(
            "Razorpay rejected the API keys: " +
                (error?.error?.description ||
                    error?.message ||
                    "unknown error")
        );
    }

    console.log("   ✅ Credentials work");

    // =================================================
    // PLAN
    // =================================================

    let planId = (
        process.env.RAZORPAY_PREMIUM_PLAN_ID || ""
    ).trim();

    if (planId) {
        console.log(`\n🔎 Verifying plan ${planId}…`);

        let plan;

        try {
            plan = await razorpay.plans.fetch(planId);
        } catch (error) {
            fail(
                `Could not fetch plan ${planId}: ` +
                    (error?.error?.description ||
                        error?.message ||
                        "unknown error")
            );
        }

        const amount = plan?.item?.amount;
        const currency = plan?.item?.currency;
        const period = plan?.period;
        const interval = plan?.interval;

        const matches =
            amount === PREMIUM_PRICE_IN_PAISE &&
            currency === "INR" &&
            period === "monthly" &&
            interval === 1;

        if (!matches) {
            fail(
                `Plan ${planId} does not match the app price.\n` +
                    `   App: ${PREMIUM_PRICE_IN_PAISE} paise (INR), monthly, interval 1\n` +
                    `   Plan: ${amount} paise (${currency}), ${period}, interval ${interval}\n` +
                    "   Create a matching live plan (or remove RAZORPAY_PREMIUM_PLAN_ID so this script creates one)."
            );
        }

        console.log("   ✅ Plan matches the displayed price");
    } else {
        console.log(
            "\n🛠  Creating live plan (₹" +
                (PREMIUM_PRICE_IN_PAISE / 100).toFixed(2) +
                " / month)…"
        );

        const plan = await razorpay.plans.create({
            period: "monthly",
            interval: 1,
            item: {
                name: `${PLANS[PREMIUM].name} (monthly)`,
                description:
                    "Unlimited questions, Deep Reasoning and priority answers.",
                amount: PREMIUM_PRICE_IN_PAISE,
                currency: "INR"
            },
            notes: {
                growell_plan: "premium_monthly"
            }
        });

        planId = plan.id;

        console.log(`   ✅ Created ${planId}`);
    }

    updates.RAZORPAY_PREMIUM_PLAN_ID = planId;

    // =================================================
    // WEBHOOK
    // =================================================

    const webhookBase = (
        argValue("url") ||
        process.env.PUBLIC_BASE_URL ||
        DEFAULT_WEBHOOK_BASE
    ).replace(/\/+$/, "");

    const webhookUrl = `${webhookBase}/api/billing/webhook`;

    let webhookSecret = (
        process.env.RAZORPAY_WEBHOOK_SECRET || ""
    ).trim();

    if (!webhookSecret) {
        webhookSecret = crypto
            .randomBytes(24)
            .toString("hex");
    }

    updates.RAZORPAY_WEBHOOK_SECRET = webhookSecret;

    if (hasFlag("skip-webhook")) {
        console.log(
            "\n⚠️  Skipped webhook setup (--skip-webhook)."
        );
    } else {
        console.log(
            `\n🔎 Configuring webhook → ${webhookUrl}`
        );

        try {
            const existing = await razorpay.webhooks.all({
                count: 100
            });

            const match = (existing?.items || []).find(
                (hook) => hook.url === webhookUrl
            );

            if (match) {
                await razorpay.webhooks.edit(
                    {
                        url: webhookUrl,
                        secret: webhookSecret,
                        events: WEBHOOK_EVENT_MAP,
                        active: true
                    },
                    match.id
                );

                console.log(
                    `   ✅ Updated webhook ${match.id}`
                );
            } else {
                const created =
                    await razorpay.webhooks.create({
                        url: webhookUrl,
                        secret: webhookSecret,
                        events: WEBHOOK_EVENT_MAP,
                        active: true
                    });

                console.log(
                    `   ✅ Created webhook ${created.id}`
                );
            }
        } catch (error) {
            console.warn(
                "   ⚠️  Could not create the webhook automatically: " +
                    (error?.error?.description ||
                        error?.message ||
                        "unknown error")
            );
            console.warn(
                "   Add it manually: Dashboard → Account & Settings → Webhooks\n" +
                    `      URL: ${webhookUrl}\n` +
                    `      Secret: (the RAZORPAY_WEBHOOK_SECRET written to .env)\n` +
                    `      Events: ${WEBHOOK_EVENTS.join(", ")}`
            );
        }
    }

    // =================================================
    // PERSIST
    // =================================================

    upsertEnv(updates);

    console.log("\n================ RESULT ================");
    console.log(`RAZORPAY_KEY_ID=${keyId}`);
    console.log("RAZORPAY_KEY_SECRET=(stored in .env)");
    console.log(`RAZORPAY_PREMIUM_PLAN_ID=${planId}`);
    console.log(
        "RAZORPAY_WEBHOOK_SECRET=(stored in .env)"
    );
    console.log(`Webhook URL: ${webhookUrl}`);
    console.log("========================================");

    console.log(
        "\nNext:\n" +
            "  1. Copy the same four values into your Render service → Environment.\n" +
            "  2. Redeploy so the server picks them up.\n" +
            "  3. Pay once with a real account to confirm Premium activates.\n" +
            "  4. Check Razorpay Dashboard → Settlements to confirm payout to your bank."
    );
}

main().catch((error) => {
    console.error("\n❌ Setup failed:", error);
    process.exit(1);
});
