import { useEffect, useRef, useState } from "react";
import "./Header.css";

import {
    Bell,
    Search,
    CircleUserRound,
    LogOut,
    UserRound,
    ChevronDown,
    Info,
    Leaf,
    FileText,
    ShieldCheck,
    MessageCircle
} from "lucide-react";

function Header({
    user,
    setActivePage,
    onLogout
}) {
    const [search, setSearch] = useState("");
    const [profileOpen, setProfileOpen] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);

    const profileRef = useRef(null);
    const infoRef = useRef(null);

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
    // CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
    // =====================================================

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setProfileOpen(false);
            }

            if (
                infoRef.current &&
                !infoRef.current.contains(event.target)
            ) {
                setInfoOpen(false);
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
                "statistics",
                "market"
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
        const query = search.toLowerCase().trim();

        if (!query) {
            return;
        }

        const match = features.find(feature =>
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
            setInfoOpen(false);
            setProfileOpen(false);
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
    // INFORMATION MENU NAVIGATION
    // =====================================================

    function handleInfoItemClick(page) {
        setInfoOpen(false);
        setProfileOpen(false);

        setActivePage(page);
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

            {/* =================================================
                LEFT
            ================================================= */}

            <div className="header-left">

                <h1>
                    {greeting} 👋
                </h1>

                <p>
                    Welcome back to{" "}
                    <strong>GroWell AI</strong>
                </p>

            </div>

            {/* =================================================
                RIGHT
            ================================================= */}

            <div className="header-right">

                {/* =================================================
                    SEARCH
                ================================================= */}

                <div className="search-box">

                    <Search
                        size={18}
                        className="search-icon"
                        onClick={performSearch}
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

                {/* =================================================
                    NOTIFICATIONS
                ================================================= */}

                <button
                    className="icon-btn"
                    type="button"
                    title="Notifications"
                    aria-label="Notifications"
                >

                    <Bell size={20} />

                    <span className="notification-dot"></span>

                </button>

                {/* =================================================
                    INFORMATION
                ================================================= */}

                <div
                    className="info-wrapper"
                    ref={infoRef}
                >

                    <button
                        className={`icon-btn ${
                            infoOpen
                                ? "info-btn-active"
                                : ""
                        }`}
                        type="button"
                        title="About & Information"
                        aria-label="Open GroWell information"

                        onClick={() => {
                            setInfoOpen(!infoOpen);
                            setProfileOpen(false);
                        }}
                    >

                        <Info size={20} />

                    </button>

                    {/* =================================================
                        INFORMATION DROPDOWN
                    ================================================= */}

                    {infoOpen && (

                        <div className="info-dropdown">

                            {/* HEADER */}

                            <div className="info-dropdown-header">

                                <div className="info-header-icon">
                                    <Leaf size={18} />
                                </div>

                                <div>

                                    <h3>
                                        GroWell AI
                                    </h3>

                                    <p>
                                        Information & Support
                                    </p>

                                </div>

                            </div>

                            <div className="info-divider"></div>

                            {/* ABOUT */}

                            <button
                                className="info-menu-item"
                                type="button"
                                onClick={() =>
                                    handleInfoItemClick("About")
                                }
                            >

                                <span className="info-item-icon">
                                    <Leaf size={17} />
                                </span>

                                <span>

                                    <strong>
                                        About GroWell AI
                                    </strong>

                                    <small>
                                        Our vision and mission
                                    </small>

                                </span>

                            </button>

                            {/* TERMS */}

                            <button
                                className="info-menu-item"
                                type="button"
                                onClick={() =>
                                    handleInfoItemClick("Terms")
                                }
                            >

                                <span className="info-item-icon">
                                    <FileText size={17} />
                                </span>

                                <span>

                                    <strong>
                                        Terms of Use
                                    </strong>

                                    <small>
                                        Rules for using GroWell AI
                                    </small>

                                </span>

                            </button>

                            {/* PRIVACY */}

                            <button
                                className="info-menu-item"
                                type="button"
                                onClick={() =>
                                    handleInfoItemClick("Privacy")
                                }
                            >

                                <span className="info-item-icon">
                                    <ShieldCheck size={17} />
                                </span>

                                <span>

                                    <strong>
                                        Privacy Policy
                                    </strong>

                                    <small>
                                        How your information is handled
                                    </small>

                                </span>

                            </button>

                          
                                

                            {/* SUPPORT */}

                            <button
                                className="info-menu-item"
                                type="button"
                                onClick={() =>
                                    handleInfoItemClick(
                                        "Support"
                                    )
                                }
                            >

                                <span className="info-item-icon">
                                    <MessageCircle size={17} />
                                </span>

                                <span>

                                    <strong>
                                        Support & Feedback
                                    </strong>

                                    <small>
                                        Get help or share feedback
                                    </small>

                                </span>

                            </button>

                          

                                   

                              
                            {/* FOOTER */}

                            <div className="info-footer">

                                <strong>
                                    GroWell AI
                                </strong>

                                <span>
                                    Founded & Created by
                                    Sampad Kumar Santra
                                </span>

                            </div>

                        </div>

                    )}

                </div>

                {/* =================================================
                    PROFILE
                ================================================= */}

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

                        onClick={() => {
                            setProfileOpen(!profileOpen);
                            setInfoOpen(false);
                        }}

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

                    {/* =================================================
                        PROFILE DROPDOWN
                    ================================================= */}

                    {profileOpen && (

                        <div className="profile-dropdown">

                            {/* USER */}

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
                                onClick={handleLogoutClick}
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