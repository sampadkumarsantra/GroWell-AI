import { useEffect, useState } from "react";

import {
    X,
    Check,
    Sparkles,
    Lock,
    Loader2,
    ShieldCheck,
    AlertCircle
} from "lucide-react";

import { apiRequest, readJson } from "../services/api";
import { usePremium } from "../context/PremiumContext";

import "./Premium.css";


// =====================================================
// RAZORPAY CHECKOUT SCRIPT
// =====================================================

const CHECKOUT_SRC =
    "https://checkout.razorpay.com/v1/checkout.js";

let scriptPromise = null;

function loadCheckout() {

    if (window.Razorpay) {
        return Promise.resolve(window.Razorpay);
    }

    if (scriptPromise) {
        return scriptPromise;
    }

    scriptPromise = new Promise((resolve, reject) => {

        const script = document.createElement("script");

        script.src = CHECKOUT_SRC;
        script.async = true;

        script.onload = () =>
            resolve(window.Razorpay);

        script.onerror = () => {
            scriptPromise = null;
            reject(
                new Error(
                    "Could not reach the payment provider."
                )
            );
        };

        document.body.appendChild(script);
    });

    return scriptPromise;
}


// =====================================================
// PAGE
// =====================================================

function Premium() {

    const {
        isPremium,
        subscription,
        refresh,
        applyUser
    } = usePremium();

    const [plans, setPlans] = useState(null);
    const [keyId, setKeyId] = useState("");
    const [configured, setConfigured] = useState(true);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");


    // =================================================
    // LOAD PLAN DETAILS
    // =================================================

    useEffect(() => {

        let active = true;

        async function load() {

            try {
                const response = await apiRequest(
                    "/api/billing/plans"
                );

                const data = await readJson(response);

                if (!active) {
                    return;
                }

                setPlans(data.plans);
                setKeyId(data.razorpayKeyId);
                setConfigured(data.configured);

            } catch (loadError) {
                console.error(loadError);
            }
        }

        load();

        return () => {
            active = false;
        };

    }, []);


    // =================================================
    // RAZORPAY RETURNS AFTER PAYMENT
    // =================================================

    useEffect(() => {

        const params = new URLSearchParams(
            window.location.search
        );

        if (params.get("razorpay_payment_id")) {
            setNotice(
                "Payment received. Activating your plan…"
            );
            syncAccount();
        } else if (params.get("subscription_id")) {
            syncAccount();
        }

    }, []);


    /**
     * Razorpay's hosted subscription page redirects back after the
     * first payment. The webhook is what actually grants Premium,
     * so poll briefly rather than trusting the return URL.
     */
    async function syncAccount() {

        for (let attempt = 0; attempt < 6; attempt++) {

            const data = await refresh();

            if (data?.isPremium) {
                setNotice("");

                try {
                    const response =
                        await apiRequest("/api/auth/me");

                    const me = await readJson(response);

                    if (me.success) {
                        applyUser(me.user);
                    }
                } catch (authError) {
                    console.error(authError);
                }

                return;
            }

            await new Promise((resolve) =>
                setTimeout(resolve, 2000)
            );
        }

        setNotice(
            "Payment received. Your plan will activate within a minute."
        );
    }


    // =================================================
    // SUBSCRIBE
    // =================================================

    async function handleSubscribe() {

        setError("");
        setLoading(true);

        try {

            const response = await apiRequest(
                "/api/billing/subscribe",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    }
                }
            );

            const data = await readJson(response);

            if (!response.ok) {
                throw new Error(
                    data.message ||
                        "Could not start the subscription."
                );
            }

            const Razorpay =
                await loadCheckout();

            const rzp = new Razorpay({
                key: data.keyId || keyId
            });

            rzp.openSubscription(data.subscriptionId);

        } catch (subscribeError) {

            console.error(subscribeError);

            setError(
                subscribeError.message ||
                    "Something went wrong."
            );

        } finally {
            setLoading(false);
        }
    }


    // =================================================
    // CANCEL
    // =================================================

    async function handleCancel() {

        if (
            !window.confirm(
                "Stop your Premium plan? You keep every benefit until the end of the period you have already paid for."
            )
        ) {
            return;
        }

        setError("");
        setLoading(true);

        try {

            const response = await apiRequest(
                "/api/billing/cancel",
                { method: "POST" }
            );

            const data = await readJson(response);

            if (!response.ok) {
                throw new Error(
                    data.message || "Could not cancel."
                );
            }

            await refresh();

        } catch (cancelError) {

            console.error(cancelError);

            setError(
                cancelError.message ||
                    "Something went wrong."
            );

        } finally {
            setLoading(false);
        }
    }


    // =================================================
    // RENDER
    // =================================================

    const freeFeatures = plans?.free?.features || [];
    const premiumFeatures =
        plans?.premium?.features || [];

    const renewsOn = subscription?.currentPeriodEnd
        ? new Date(
              subscription.currentPeriodEnd
          ).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric"
          })
        : null;

    return (
        <div className="premium-page">
            {/* ===================== HEADER ===================== */}
            <div className="premium-head">
                <button
                    className="premium-close"
                    onClick={() => window.history.back()}
                    aria-label="Go back"
                >
                    <X size={20} />
                </button>

                <div className="premium-head-text">
                    <span className="premium-eyebrow">
                        <Sparkles size={14} />
                        GroWell Premium
                    </span>

                    <h1>
                        {isPremium
                            ? "Your farm has a full-time agronomist."
                            : "Stop guessing. Start reasoning."}
                    </h1>

                    <p>
                        {isPremium
                            ? "Deep Reasoning is active on your account."
                            : "Most crop advice fails because it answers the question you asked instead of the one behind it. Deep Reasoning works out what you actually need before it answers."}
                    </p>
                </div>
            </div>

            {notice && (
                <div className="premium-notice">
                    <Loader2
                        size={16}
                        className="spin"
                    />
                    {notice}
                </div>
            )}

            {error && (
                <div className="premium-error">
                    <AlertCircle size={16} />
                    {error}
                </div>
            )}

            {!configured && (
                <div className="premium-error">
                    <AlertCircle size={16} />
                    Payments are not configured yet. Add
                    the Razorpay keys to enable checkout.
                </div>
            )}

            {/* ===================== PLAN CARDS ===================== */}
            <div className="premium-grid">
                <div className="premium-card">
                    <div className="premium-card-head">
                        <h2>Free</h2>
                        <div className="premium-price">
                            <span className="premium-amount">
                                ₹0
                            </span>
                            <span className="premium-period">
                                forever
                            </span>
                        </div>
                    </div>

                    <ul className="premium-features">
                        {freeFeatures.map((feature) => (
                            <li
                                key={feature.label}
                                className={
                                    feature.included
                                        ? "is-in"
                                        : "is-out"
                                }
                            >
                                {feature.included ? (
                                    <Check size={16} />
                                ) : (
                                    <X size={16} />
                                )}
                                <span>
                                    {feature.label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="premium-card is-featured">
                    <div className="premium-flag">
                        <Sparkles size={13} />
                        Most value
                    </div>

                    <div className="premium-card-head">
                        <h2>Premium</h2>
                        <div className="premium-price">
                            <span className="premium-amount">
                                {plans?.premium
                                    ?.priceLabel ||
                                    "₹499"}
                            </span>
                            <span className="premium-period">
                                {plans?.premium
                                    ?.pricePeriod ||
                                    "per month"}
                            </span>
                        </div>
                    </div>

                    <ul className="premium-features">
                        {premiumFeatures.map((feature) => (
                            <li
                                key={feature.label}
                                className={
                                    feature.included
                                        ? "is-in"
                                        : "is-out"
                                }
                            >
                                {feature.included ? (
                                    <Check size={16} />
                                ) : (
                                    <X size={16} />
                                )}
                                <span>
                                    {feature.label}
                                </span>
                            </li>
                        ))}
                    </ul>

                    {isPremium ? (
                        <div className="premium-active">
                            <div className="premium-active-row">
                                <ShieldCheck size={16} />
                                <span>
                                    Premium is active
                                </span>
                            </div>

                            {renewsOn && (
                                <p className="premium-renew">
                                    {subscription
                                        ?.cancelAtPeriodEnd
                                        ? "Access ends on "
                                        : "Renews on "}
                                    <strong>
                                        {renewsOn}
                                    </strong>
                                </p>
                            )}

                            {!subscription
                                ?.cancelAtPeriodEnd && (
                                <button
                                    className="premium-ghost"
                                    onClick={
                                        handleCancel
                                    }
                                    disabled={loading}
                                >
                                    Cancel plan
                                </button>
                            )}
                        </div>
                    ) : (
                        <button
                            className="premium-cta"
                            onClick={
                                handleSubscribe
                            }
                            disabled={
                                loading || !configured
                            }
                        >
                            {loading ? (
                                <Loader2
                                    size={17}
                                    className="spin"
                                />
                            ) : (
                                <Sparkles size={17} />
                            )}
                            {loading
                                ? "Opening checkout…"
                                : `Upgrade to Premium — ${
                                      plans?.premium
                                          ?.priceLabel ||
                                      "₹499"
                                  }/month`}
                        </button>
                    )}
                </div>
            </div>

            {/* ===================== DEEP REASONING EXPLAINER ===================== */}
            {!isPremium && (
                <div className="premium-explainer">
                    <h3>
                        <Lock size={17} />
                        What Deep Reasoning actually does
                    </h3>

                    <ol>
                        <li>
                            <strong>
                                Reads the real situation
                            </strong>
                            <p>
                                Before answering, a planning
                                pass works out which facts are
                                genuinely missing — growth
                                stage, variety, days after
                                sowing, recent rain.
                            </p>
                        </li>

                        <li>
                            <strong>
                                Looks for the expensive mistake
                            </strong>
                            <p>
                                It names the ways a normal
                                answer could cost you money:
                                wrong dose, wrong growth
                                stage, phytotoxicity, ignoring
                                resistance.
                            </p>
                        </li>

                        <li>
                            <strong>
                                Answers with the
                                assumptions visible
                            </strong>
                            <p>
                                You see the reasoning, the
                                assumption it rested on, the
                                cost per acre, and what to
                                watch. Not just a number to
                                type in.
                            </p>
                        </li>
                    </ol>
                </div>
            )}

            <p className="premium-fineprint">
                Pay securely by UPI, netbanking or card via
                Razorpay. Cancel any time from Settings —
                you keep Premium until the end of the period
                you have paid for.
            </p>
        </div>
    );
}


export default Premium;
