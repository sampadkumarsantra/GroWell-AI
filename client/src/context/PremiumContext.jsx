import {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect
} from "react";

import { apiRequest, readJson } from "../services/api";

const PremiumContext = createContext(null);


// =====================================================
// LIMITS
// =====================================================
//
// Mirrors services/entitlements.js on the server. This exists only
// so the UI can hide or lock things before the farmer taps them.
// The server re-checks every request and is the real authority.
//

export const FREE_LIMITS = {
    chatPerDay: 15,
    voicePerMonth: 30,
    maxEffort: "Balanced",
    deepReasoning: false
};


export function PremiumProvider({ user, children }) {

    const [isPremium, setIsPremium] = useState(
        user?.isPremium === true
    );

    const [plan, setPlan] = useState(
        user?.plan || "free"
    );

    const [limits, setLimits] = useState(
        user?.limits || FREE_LIMITS
    );

    const [subscription, setSubscription] = useState(
        user?.subscription || {}
    );

    const [chatRemaining, setChatRemaining] = useState(
        null
    );

    const [voiceRemaining, setVoiceRemaining] = useState(
        null
    );

    const [upgradeOpen, setUpgradeOpen] = useState(false);

    const [checking, setChecking] = useState(false);

    // =================================================
    // DEEP REASONING TOGGLE
    // =================================================

    /*
     * The farmer opts in per message rather than having a paid
     * mode switched on silently — a long reasoning pass takes
     * longer, and that difference should be a choice, not a
     * surprise.
     */
    const [deepMode, setDeepMode] = useState(
        () =>
            localStorage.getItem(
                "growell_deep_mode"
            ) === "true"
    );

    const toggleDeepMode = useCallback(() => {
        setDeepMode((previous) => {
            const next = !previous;

            localStorage.setItem(
                "growell_deep_mode",
                String(next)
            );

            return next;
        });
    }, []);


    // =================================================
    // APPLY A SERVER PAYLOAD
    // =================================================

    const applyUser = useCallback((nextUser) => {

        if (!nextUser) {
            return;
        }

        setIsPremium(nextUser.isPremium === true);
        setPlan(nextUser.plan || "free");
        setLimits(nextUser.limits || FREE_LIMITS);
        setSubscription(nextUser.subscription || {});

        localStorage.setItem(
            "growell_user",
            JSON.stringify(nextUser)
        );
    }, []);


    // =================================================
    // UPDATE QUOTA COUNTERS
    // =================================================

    const applyEntitlement = useCallback(
        (entitlement) => {

            if (!entitlement) {
                return;
            }

            if (
                entitlement.chatRemaining !==
                undefined
            ) {
                setChatRemaining(
                    entitlement.chatRemaining
                );
            }

            if (
                entitlement.voiceRemaining !==
                undefined
            ) {
                setVoiceRemaining(
                    entitlement.voiceRemaining
                );
            }

            if (entitlement.isPremium !== undefined) {
                setIsPremium(
                    entitlement.isPremium === true
                );
            }
        },
        []
    );


    // =================================================
    // OPEN UPGRADE
    // =================================================

    const openUpgrade = useCallback(() => {
        setUpgradeOpen(true);
    }, []);

    const closeUpgrade = useCallback(() => {
        setUpgradeOpen(false);
    }, []);


    // =================================================
    // REFRESH FROM SERVER
    // =================================================

    const refresh = useCallback(async () => {

        setChecking(true);

        try {

            const response = await apiRequest(
                "/api/billing/status"
            );

            const data = await readJson(response);

            if (data.success) {
                setIsPremium(data.isPremium === true);
                setPlan(data.plan || "free");
            }

            return data;

        } catch (error) {

            console.error(
                "Could not refresh plan:",
                error
            );

            return null;

        } finally {
            setChecking(false);
        }

    }, []);


    // =================================================
    // SYNC ON USER CHANGE
    // =================================================

    useEffect(() => {

        if (!user) {
            return;
        }

        setIsPremium(user.isPremium === true);
        setPlan(user.plan || "free");
        setLimits(user.limits || FREE_LIMITS);
        setSubscription(user.subscription || {});

        // A lapsed subscription must not leave a paid toggle
        // switched on in the interface.
        if (user.isPremium !== true) {
            setDeepMode(false);
            localStorage.setItem(
                "growell_deep_mode",
                "false"
            );
        }

    }, [user?.id]);


    const value = {
        isPremium,
        plan,
        limits,
        subscription,
        chatRemaining,
        voiceRemaining,
        upgradeOpen,
        checking,
        deepMode,

        setDeepMode,
        toggleDeepMode,
        openUpgrade,
        closeUpgrade,
        refresh,
        applyUser,
        applyEntitlement,

        canUseDeepReasoning:
            limits.deepReasoning === true,

        maxEffort: limits.maxEffort || "Balanced"
    };

    return (
        <PremiumContext.Provider value={value}>
            {children}
        </PremiumContext.Provider>
    );
}


export function usePremium() {
    const context = useContext(PremiumContext);

    if (!context) {
        throw new Error(
            "usePremium must be used inside PremiumProvider"
        );
    }

    return context;
}
