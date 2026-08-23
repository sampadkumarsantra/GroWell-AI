import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Intro from "./pages/Intro/Intro";

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

        setUser(null);
        setShowSignup(false);

        // Do NOT show intro again.
        // User should return directly to Login.
        setShowIntro(false);
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
        <Dashboard
            user={user}
            onLogout={handleLogout}
        />
    );
}

export default App;