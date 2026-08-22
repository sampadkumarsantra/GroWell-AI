
import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Intro from "./pages/Intro/Intro";

function App() {

    // =====================================================
    // INTRO STATE
    // =====================================================

    const [showIntro, setShowIntro] = useState(() => {

        const introSeen =
            localStorage.getItem("growell_intro_seen");

        return introSeen !== "true";
    });


    // =====================================================
    // USER STATE
    // =====================================================

    const [user, setUser] = useState(() => {

        const savedUser =
            localStorage.getItem("growell_user");

        const savedToken =
            localStorage.getItem("growell_token");

        if (savedUser && savedToken) {

            try {

                return JSON.parse(savedUser);

            } catch (error) {

                console.error(
                    "Invalid saved user:",
                    error
                );

                localStorage.removeItem(
                    "growell_user"
                );

                localStorage.removeItem(
                    "growell_token"
                );

                localStorage.removeItem(
                    "growell_refresh_token"
                );

            }

        }

        return null;
    });


    const [showSignup, setShowSignup] =
        useState(false);


    // =====================================================
    // INTRO FINISHED
    // =====================================================

    function handleIntroFinish() {

        setShowIntro(false);

    }


    // =====================================================
    // LOGIN
    // =====================================================

    function handleLogin(loggedInUser) {

        setUser(loggedInUser);

        setShowSignup(false);

    }


    // =====================================================
    // LOGOUT
    // =====================================================

    function handleLogout() {

        console.log(
            "🌱 GroWell logout → showing intro"
        );


        // Remove authentication
        localStorage.removeItem(
            "growell_token"
        );

        localStorage.removeItem(
            "growell_user"
        );

        localStorage.removeItem(
            "growell_refresh_token"
        );


        // Remove current user
        setUser(null);


        // Reset signup state
        setShowSignup(false);


        // IMPORTANT:
        // Show intro again after logout.
        //
        // We DO NOT remove growell_intro_seen.
        // This means logout does not pretend
        // that this is the user's first visit.
        //
        // We simply display the intro again.
        setShowIntro(true);

    }


    // =====================================================
    // SIGNUP
    // =====================================================

    function handleSignupSuccess() {

        setShowSignup(false);

    }


    // =====================================================
    // INTRO
    // =====================================================

    if (showIntro) {

        return (
            <Intro
                onFinish={handleIntroFinish}
            />
        );

    }


    // =====================================================
    // NOT LOGGED IN
    // =====================================================

    if (!user) {

        if (showSignup) {

            return (
                <Signup
                    onSignup={
                        handleSignupSuccess
                    }
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
    // LOGGED IN
    // =====================================================

    return (
        <Dashboard
            user={user}
            onLogout={handleLogout}
        />
    );

}

export default App;
