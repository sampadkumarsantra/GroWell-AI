import { useState, useEffect } from "react";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Intro from "./pages/Intro/Intro";

import { PremiumProvider } from "./context/PremiumContext";
import { apiRequest, readJson } from "./services/api";

function App() {
    // =====================================================
    // INTRO
    // =====================================================

    const [showIntro, setShowIntro] = useState(() => {
        return localStorage.getItem("growell_intro_seen") !== "true";
    });

    // =====================================================
    // USER
    // =====================================================

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("growell_user");
        const savedToken = localStorage.getItem("growell_token");

        if (!savedUser || !savedToken) {
            return null;
        }

        try {
            return JSON.parse(savedUser);
        } catch (error) {
            console.error("Invalid saved user:", error);

            localStorage.removeItem("growell_user");
            localStorage.removeItem("growell_token");
            localStorage.removeItem("growell_refresh_token");

            return null;
        }
    });

    const [showSignup, setShowSignup] = useState(false);

    // =====================================================
    // SESSION REHYDRATION
    // =====================================================

    /*
     * A saved session proves nothing. The token could be expired,
     * revoked, or belong to a subscription that has since lapsed,
     * so the plan is always re-read from the server before the
     * farmer is shown anything they are paying for.
     */
    useEffect(() => {

        if (!user) {
            return;
        }

        let active = true;

        async function verify() {

            try {

                const response =
                    await apiRequest("/api/auth/me");

                const data = await readJson(response);

                if (!active) {
                    return;
                }

                if (
                    response.status === 401 ||
                    !data.success
                ) {
                    localStorage.removeItem(
                        "growell_token"
                    );
                    localStorage.removeItem(
                        "growell_user"
                    );
                    setUser(null);
                    return;
                }

                setUser(data.user);

            } catch (error) {

                // Offline or the server is restarting. Keep the
                // cached profile so the app is still usable; the
                // server re-checks entitlement on every request.
                console.warn(
                    "Session check skipped:",
                    error.message
                );
            }
        }

        verify();

        return () => {
            active = false;
        };

    }, []);

    // =====================================================
    // INTRO FINISHED
    // =====================================================

    function handleIntroFinish() {
        localStorage.setItem("growell_intro_seen", "true");
        setShowIntro(false);
    }

    // =====================================================
    // LOGIN
    // =====================================================

    function handleLogin(loggedInUser) {
        console.log("🌱 GroWell login successful:", loggedInUser);

        setUser(loggedInUser);
        setShowSignup(false);
        setShowIntro(false);
    }

    // =====================================================
    // LOGOUT
    // =====================================================

    function handleLogout() {
        console.log("🌱 GroWell logout");

        localStorage.removeItem("growell_token");
        localStorage.removeItem("growell_user");
        localStorage.removeItem("growell_refresh_token");
        localStorage.removeItem("growell_intro_seen");

        setUser(null);
        setShowSignup(false);

        // Replay the intro, then ask the user to sign back in.
        setShowIntro(true);
    }

    // =====================================================
    // SIGNUP
    // =====================================================

    function handleSignupSuccess() {
        console.log("🌱 GroWell signup completed");

        setShowSignup(false);
    }

    // =====================================================
    // FIRST VISIT → INTRO
    // =====================================================

    if (showIntro) {
        return (
            <Intro
                onFinish={handleIntroFinish}
            />
        );
    }

    // =====================================================
    // NOT LOGGED IN → LOGIN / SIGNUP
    // =====================================================

    if (!user) {
        if (showSignup) {
            return (
                <Signup
                    onSignup={handleSignupSuccess}
                    onSwitchToLogin={() =>
                        setShowSignup(false)
                    }
                />
            );
        }

        return (
            <Login
                onLogin={handleLogin}
                onSwitchToSignup={() =>
                    setShowSignup(true)
                }
            />
        );
    }

    // =====================================================
    // LOGGED IN → DASHBOARD
    // =====================================================

    return (
        <PremiumProvider user={user}>
            <Dashboard
                user={user}
                onLogout={handleLogout}
            />
        </PremiumProvider>
    );
}

export default App;