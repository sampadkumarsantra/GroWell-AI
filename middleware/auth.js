const jwt = require("jsonwebtoken");

const db = require("../database/pool");
const {
    PLANS,
    FREE,
    PREMIUM
} = require("../services/entitlements");

const JWT_SECRET =
    process.env.JWT_SECRET ||
    "growell-development-secret";


// =====================================================
// SIGN / VERIFY
// =====================================================

function signToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        JWT_SECRET,
        { expiresIn: "7d" }
    );
}


function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}


// =====================================================
// SUBSCRIPTION LOOKUP
// =====================================================

const ACTIVE_STATUSES = [
    "active",
    "authenticated"
];


/**
 * Reads the authoritative plan for a user straight from Postgres.
 * Never trust a plan value carried in the JWT.
 */
async function loadSubscription(userId) {

    const row = await db.get(
        `SELECT plan,
                status,
                razorpay_customer_id,
                razorpay_subscription_id,
                current_period_end,
                cancel_at_period_end
         FROM subscriptions
         WHERE user_id = $1`,
        [userId]
    );

    if (!row) {
        return null;
    }

    return row;
}


/**
 * A subscription only grants Premium while it is active and the
 * paid period has not already elapsed. A webhook that never
 * arrived must not leave someone paying for access they lost.
 */
function resolveEntitlement(subscription) {

    if (!subscription) {
        return {
            plan: FREE,
            isPremium: false,
            status: "none",
            currentPeriodEnd: null,
            cancelAtPeriodEnd: false
        };
    }

    const status = (subscription.status || "").toLowerCase();

    const statusOk = ACTIVE_STATUSES.includes(status);

    const periodEnd = subscription.current_period_end
        ? new Date(subscription.current_period_end)
        : null;

    const periodOk =
        !periodEnd ||
        periodEnd.getTime() > Date.now();

    const isPremium =
        subscription.plan === PREMIUM &&
        statusOk &&
        periodOk;

    return {
        plan: isPremium ? PREMIUM : FREE,
        isPremium,
        status: subscription.status || "none",
        currentPeriodEnd: periodEnd
            ? periodEnd.toISOString()
            : null,
        cancelAtPeriodEnd:
            subscription.cancel_at_period_end === true
    };
}


async function getEntitlement(userId) {
    const subscription = await loadSubscription(userId);
    return resolveEntitlement(subscription);
}


/**
 * Ensures every user has a subscription row so reads never 500
 * on a brand new account.
 */
async function ensureSubscription(userId) {

    await db.run(
        `INSERT INTO subscriptions (user_id, plan, status)
         VALUES ($1, 'free', 'none')
         ON CONFLICT (user_id) DO NOTHING`,
        [userId]
    );
}


// =====================================================
// MIDDLEWARE
// =====================================================

/**
 * Hard requirement: a valid token, or 401.
 */
function authenticateToken(req, res, next) {

    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Authentication required."
        });
    }

    const token = header.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authentication token missing."
        });
    }

    try {
        req.user = verifyToken(token);
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Session expired. Please sign in again."
        });
    }
}


/**
 * Reads the token if present but never blocks the request.
 * Used so anonymous callers still work, just with Free limits.
 */
function optionalAuth(req, res, next) {

    const header = req.headers.authorization;

    if (header && header.startsWith("Bearer ")) {
        try {
            req.user = verifyToken(header.split(" ")[1]);
        } catch (error) {
            req.user = null;
        }
    }

    next();
}


/**
 * Blocks the request unless the caller has a live subscription.
 */
async function requirePremium(req, res, next) {

    try {

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required."
            });
        }

        const entitlement = await getEntitlement(
            req.user.id
        );

        if (!entitlement.isPremium) {
            return res.status(403).json({
                success: false,
                code: "PREMIUM_REQUIRED",
                message:
                    "This is a GroWell Premium feature.",
                entitlement
            });
        }

        req.entitlement = entitlement;

        next();

    } catch (error) {

        console.error(
            "❌ requirePremium failed:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Could not verify your plan."
        });

    }
}


/**
 * The entitlement payload the client mirrors for its UI.
 */
async function describeUser(user) {

    const entitlement = await getEntitlement(user.id);
    const plan = PLANS[entitlement.plan] || PLANS[FREE];

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture || "",
        plan: entitlement.plan,
        isPremium: entitlement.isPremium,
        subscription: {
            status: entitlement.status,
            currentPeriodEnd: entitlement.currentPeriodEnd,
            cancelAtPeriodEnd: entitlement.cancelAtPeriodEnd
        },
        limits: {
            chatPerDay: plan.chatPerDay,
            voicePerMonth: plan.voicePerMonth,
            maxEffort: plan.maxEffort,
            deepReasoning: plan.deepReasoning
        }
    };
}


module.exports = {
    signToken,
    verifyToken,
    authenticateToken,
    optionalAuth,
    requirePremium,
    loadSubscription,
    resolveEntitlement,
    getEntitlement,
    ensureSubscription,
    describeUser
};
