const crypto = require("crypto");

const db = require("../database/pool");
const {
    PLANS,
    PREMIUM,
    FREE
} = require("./entitlements");


// =====================================================
// RAZORPAY CLIENT
// =====================================================

const KEY_ID = process.env.RAZORPAY_KEY_ID || "";
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "";
const WEBHOOK_SECRET =
    process.env.RAZORPAY_WEBHOOK_SECRET || "";

const PREMIUM_PLAN_ID =
    process.env.RAZORPAY_PREMIUM_PLAN_ID || "";


let razorpayInstance = null;

/**
 * The SDK is required lazily so the server still boots in
 * development without Razorpay credentials configured.
 */
function getClient() {

    if (razorpayInstance) {
        return razorpayInstance;
    }

    if (!KEY_ID || !KEY_SECRET) {
        const error = new Error(
            "Razorpay is not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET."
        );
        error.code = "BILLING_NOT_CONFIGURED";
        throw error;
    }

    const Razorpay = require("razorpay");

    razorpayInstance = new Razorpay({
        key_id: KEY_ID,
        key_secret: KEY_SECRET
    });

    return razorpayInstance;
}


function isConfigured() {
    return Boolean(
        KEY_ID && KEY_SECRET && PREMIUM_PLAN_ID
    );
}


// =====================================================
// WEBHOOK SIGNATURE
// =====================================================

/**
 * Verifies the X-Razorpay-Signature header against the raw
 * request body. Comparing the raw bytes is the only safe way —
 * re-serialising the parsed JSON would change the hash.
 */
function verifyWebhookSignature(
    rawBody,
    signature
) {

    if (!WEBHOOK_SECRET) {
        return false;
    }

    if (!signature || !rawBody) {
        return false;
    }

    const expected = crypto
        .createHmac("sha256", WEBHOOK_SECRET)
        .update(rawBody)
        .digest("hex");

    const a = Buffer.from(expected);
    const b = Buffer.from(String(signature));

    if (a.length !== b.length) {
        return false;
    }

    return crypto.timingSafeEqual(a, b);
}


// =====================================================
// CUSTOMER
// =====================================================

async function ensureCustomer(user) {

    const existing = await db.get(
        `SELECT razorpay_customer_id
         FROM subscriptions
         WHERE user_id = $1`,
        [user.id]
    );

    if (
        existing &&
        existing.razorpay_customer_id
    ) {
        return existing.razorpay_customer_id;
    }

    const razorpay = getClient();

    const customer =
        await razorpay.customers.create({
            name: user.name,
            email: user.email,
            notes: {
                growell_user_id: String(user.id)
            }
        });

    await db.run(
        `UPDATE subscriptions
         SET razorpay_customer_id = $1,
             updated_at = NOW()
         WHERE user_id = $2`,
        [customer.id, user.id]
    );

    return customer.id;
}


// =====================================================
// SUBSCRIPTION CREATE
// =====================================================

/**
 * Creates a Razorpay subscription and returns the id plus the
 * hosted checkout URL. Nothing is granted here — entitlement
 * only flips when the signed webhook says the payment landed.
 */
async function createSubscription(user) {

    if (!PREMIUM_PLAN_ID) {
        const error = new Error(
            "RAZORPAY_PREMIUM_PLAN_ID is not set."
        );
        error.code = "BILLING_NOT_CONFIGURED";
        throw error;
    }

    const razorpay = getClient();
    const customerId = await ensureCustomer(user);

    const subscription =
        await razorpay.subscriptions.create({
            plan_id: PREMIUM_PLAN_ID,
            customer_id: customerId,
            total_count: 12,
            quantity: 1,
            start_at: Math.floor(Date.now() / 1000),
            notes: {
                growell_user_id: String(user.id)
            },
            notify: {
                email: user.email
            }
        });

    await db.run(
        `UPDATE subscriptions
         SET razorpay_subscription_id = $1,
             razorpay_plan_id = $2,
             status = 'created',
             updated_at = NOW()
         WHERE user_id = $3`,
        [
            subscription.id,
            PREMIUM_PLAN_ID,
            user.id
        ]
    );

    return {
        id: subscription.id,
        shortUrl: subscription.short_url
    };
}


// =====================================================
// WEBHOOK APPLICATION
// =====================================================

/**
 * Maps a Razorpay subscription status onto our stored state.
 * Only "active" grants Premium.
 */
function mapStatus(razorpayStatus) {
    switch (razorpayStatus) {
        case "active":
        case "authenticated":
            return "active";

        case "created":
        case "pending":
            return "pending";

        case "cancelled":
            return "cancelled";

        case "completed":
            return "completed";

        case "halted":
            return "halted";

        case "paused":
            return "paused";

        default:
            return "none";
    }
}


async function applySubscriptionEntity(entity) {

    if (!entity || !entity.id) {
        return null;
    }

    const userId = await resolveUserId(entity);

    if (!userId) {
        console.warn(
            "⚠️  No GroWell user for Razorpay subscription",
            entity.id
        );
        return null;
    }

    const status = mapStatus(entity.status);

    const plan =
        status === "active" ? PREMIUM : FREE;

    await db.run(
        `INSERT INTO subscriptions
            (user_id, plan, status,
             razorpay_subscription_id, razorpay_plan_id,
             current_period_start, current_period_end,
             updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
         ON CONFLICT (user_id) DO UPDATE SET
            plan = EXCLUDED.plan,
            status = EXCLUDED.status,
            razorpay_subscription_id =
                EXCLUDED.razorpay_subscription_id,
            razorpay_plan_id = EXCLUDED.razorpay_plan_id,
            current_period_start =
                EXCLUDED.current_period_start,
            current_period_end =
                EXCLUDED.current_period_end,
            updated_at = NOW()`,
        [
            userId,
            plan,
            status,
            entity.id,
            entity.plan_id || null,
            toTimestamp(entity.current_start),
            toTimestamp(entity.current_end)
        ]
    );

    return { userId, plan, status };
}


/**
 * Resolves which GroWell user a webhook belongs to. Prefers the
 * notes we attach at creation, then falls back to the stored
 * subscription id.
 */
async function resolveUserId(entity) {

    const noteUserId =
        entity.notes &&
        (entity.notes.growell_user_id ||
            entity.notes.growellUserId);

    if (noteUserId) {
        const parsed = parseInt(noteUserId, 10);
        if (!Number.isNaN(parsed)) {
            return parsed;
        }
    }

    const row = await db.get(
        `SELECT user_id
         FROM subscriptions
         WHERE razorpay_subscription_id = $1`,
        [entity.id]
    );

    return row ? row.user_id : null;
}


function toTimestamp(value) {
    if (!value) {
        return null;
    }
    return new Date(Number(value) * 1000);
}


// =====================================================
// CANCEL
// =====================================================

/**
 * Cancels at period end. Premium stays live until the date the
 * farmer already paid through, then lapses on its own.
 */
async function cancelSubscription(userId) {

    const row = await db.get(
        `SELECT razorpay_subscription_id
         FROM subscriptions
         WHERE user_id = $1`,
        [userId]
    );

    if (!row || !row.razorpay_subscription_id) {
        const error = new Error(
            "No active subscription to cancel."
        );
        error.code = "NOTHING_TO_CANCEL";
        throw error;
    }

    const razorpay = getClient();

    await razorpay.subscriptions.cancel(
        row.razorpay_subscription_id
    );

    await db.run(
        `UPDATE subscriptions
         SET cancel_at_period_end = TRUE,
             updated_at = NOW()
         WHERE user_id = $1`,
        [userId]
    );

    return true;
}


// =====================================================
// RECONCILE
// =====================================================

/**
 * Asks Razorpay for the true state and repairs local storage.
 * Covers a webhook that was lost, or a server that was down
 * when the renewal fired.
 */
async function reconcile(userId) {

    if (!isConfigured()) {
        return null;
    }

    const row = await db.get(
        `SELECT razorpay_subscription_id
         FROM subscriptions
         WHERE user_id = $1`,
        [userId]
    );

    if (!row || !row.razorpay_subscription_id) {
        return null;
    }

    try {
        const razorpay = getClient();

        const remote = await razorpay.subscriptions.fetch(
            row.razorpay_subscription_id
        );

        return await applySubscriptionEntity(remote);
    } catch (error) {
        console.warn(
            "⚠️  Could not reconcile subscription:",
            error.message
        );
        return null;
    }
}


// =====================================================
// PUBLIC PLAN SHAPE
// =====================================================

function publicPlans() {

    return {
        premium: {
            name: PLANS[PREMIUM].name,
            priceLabel: PLANS[PREMIUM].priceLabel,
            priceInPaise:
                PLANS[PREMIUM].priceInPaise,
            pricePeriod:
                PLANS[PREMIUM].pricePeriod,
            features:
                PLANS[PREMIUM].features
        },
        free: {
            name: PLANS[FREE].name,
            priceLabel: PLANS[FREE].priceLabel,
            pricePeriod: PLANS[FREE].pricePeriod,
            features: PLANS[FREE].features
        }
    };
}


module.exports = {
    isConfigured,
    verifyWebhookSignature,
    createSubscription,
    cancelSubscription,
    applySubscriptionEntity,
    reconcile,
    publicPlans,
    KEY_ID
};
