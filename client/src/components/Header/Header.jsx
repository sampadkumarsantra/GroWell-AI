import { useEffect, useRef, useState } from "react";

import "./Header.css";

import {
    Bell,
    Search,
    CircleUserRound,
    LogOut,
    UserRound,
    ChevronDown
} from "lucide-react";


function Header({
    user,
    setActivePage,
    onLogout
}) {

    const [search, setSearch] = useState("");

    const [profileOpen, setProfileOpen] =
        useState(false);

    const profileRef = useRef(null);


    // =====================================================
    // GREETING
    // =====================================================

    const hour = new Date().getHours();

    let greeting;

    if (hour < 12) {

        greeting = "Good Morning";

    } else if (hour < 17) {

        greeting = "Good Afternoon";

    } else if (hour < 21) {

        greeting = "Good Evening";

    } else {

        greeting = "Good Night";

    }


    // =====================================================
    // CLOSE PROFILE WHEN CLICKING OUTSIDE
    // =====================================================

    useEffect(() => {

        function handleClickOutside(event) {

            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {

                setProfileOpen(false);

            }

        }


        document.addEventListener(
            "mousedown",
            handleClickOutside
        );


        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);


    // =====================================================
    // FEATURE SEARCH
    // =====================================================

    const features = [

        {
            keywords: [
                "chat",
                "ai",
                "ask",
                "assistant"
            ],
            page: "Chat"
        },

        {
            keywords: [
                "crop",
                "diagnosis",
                "disease",
                "plant disease"
            ],
            page: "Crop Diagnosis"
        },

        {
            keywords: [
                "weather",
                "rain",
                "temperature",
                "forecast"
            ],
            page: "Weather"
        },

        {
            keywords: [
                "soil",
                "soil health",
                "soil intelligence",
                "ph",
                "nutrient"
            ],
            page: "Soil Health"
        },

        {
            keywords: [
                "library",
                "disease library",
                "pest",
                "reference"
            ],
            page: "Library"
        },

        {
            keywords: [
                "analytics",
                "analysis",
                "statistics"
            ],
            page: "Analytics"
        },

        {
            keywords: [
                "settings",
                "preferences",
                "configuration"
            ],
            page: "Settings"
        }

    ];


    function performSearch() {

        const query =
            search.toLowerCase().trim();


        if (!query) {
            return;
        }


        const match = features.find(
            feature =>
                feature.keywords.some(
                    keyword =>
                        keyword === query ||
                        keyword.includes(query) ||
                        query.includes(keyword)
                )
        );


        if (match) {

            setActivePage(match.page);

            setSearch("");

        } else {

            alert(
                `No GroWell AI feature found for "${search}".`
            );

        }

    }


    function handleKeyDown(e) {

        if (e.key === "Enter") {

            performSearch();

        }

    }


    // =====================================================
    // LOGOUT
    // =====================================================

    function handleLogoutClick() {

        setProfileOpen(false);

        if (onLogout) {

            onLogout();

        }

    }


    // =====================================================
    // USER DISPLAY
    // =====================================================

    const userName =
        user?.name || "GroWell User";

    const userEmail =
        user?.email || "No email available";


    const userInitial =
        userName
            .charAt(0)
            .toUpperCase();


    // =====================================================
    // UI
    // =====================================================

    return (

        <header className="gw-header">


            {/* =========================================
                LEFT
            ========================================= */}

            <div className="header-left">

                <h1>
                    {greeting} 👋
                </h1>

                <p>
                    Welcome back to{" "}
                    <strong>GroWell AI</strong>
                </p>

            </div>


            {/* =========================================
                RIGHT
            ========================================= */}

            <div className="header-right">


                {/* SEARCH */}

                <div className="search-box">

                    <Search
                        size={18}
                        onClick={performSearch}
                        style={{
                            cursor: "pointer"
                        }}
                    />

                    <input
                        type="text"
                        placeholder="Search features..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        onKeyDown={handleKeyDown}
                    />

                </div>


                {/* NOTIFICATIONS */}

                <button
                    className="icon-btn"
                    type="button"
                    title="Notifications"
                >

                    <Bell size={20} />

                    <span className="notification-dot"></span>

                </button>


                {/* PROFILE */}

                <div
                    className="profile-wrapper"
                    ref={profileRef}
                >

                    <button
                        className={`profile-btn ${
                            profileOpen
                                ? "profile-btn-active"
                                : ""
                        }`}
                        type="button"
                        onClick={() =>
                            setProfileOpen(
                                !profileOpen
                            )
                        }
                        aria-label="Open profile"
                    >

                        <CircleUserRound size={34} />

                        <ChevronDown
                            size={14}
                            className={`profile-chevron ${
                                profileOpen
                                    ? "profile-chevron-open"
                                    : ""
                            }`}
                        />

                    </button>


                    {/* =================================
                        PROFILE DROPDOWN
                    ================================= */}

                    {profileOpen && (

                        <div className="profile-dropdown">


                            {/* USER INFO */}

                            <div className="profile-user">

                                <div className="profile-avatar">

                                    {userInitial}

                                </div>


                                <div className="profile-user-info">

                                    <h3>
                                        {userName}
                                    </h3>

                                    <p>
                                        {userEmail}
                                    </p>

                                </div>

                            </div>


                            <div className="profile-divider"></div>


                            {/* ACCOUNT */}

                            <div className="profile-account-label">

                                ACCOUNT

                            </div>


                            <div className="profile-account">

                                <div className="profile-account-icon">

                                    <UserRound size={16} />

                                </div>


                                <div>

                                    <span>
                                        Signed in
                                    </span>

                                    <small>
                                        Your GroWell AI account
                                    </small>

                                </div>

                            </div>


                            <div className="profile-divider"></div>


                            {/* LOGOUT */}

                            <button
                                className="profile-logout"
                                type="button"
                                onClick={
                                    handleLogoutClick
                                }
                            >

                                <LogOut size={17} />

                                <span>
                                    Sign out
                                </span>

                            </button>

                        </div>

                    )}

                </div>

            </div>

        </header>

    );

}


export default Header;