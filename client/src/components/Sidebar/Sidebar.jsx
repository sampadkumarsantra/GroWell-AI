import {
    MessageSquare,
    ScanLine,
    CloudSun,
    Sprout,
    Settings,
    BookOpen,
    Lock
} from "lucide-react";

import "./Sidebar.css";
import logo from "../../assets/logo.png";
import GrowthJourney from "../GrowthJourney/GrowthJourney";
import { usePremium } from "../../context/PremiumContext";

const menu = [
    { icon: MessageSquare, label: "Chat" },
    { icon: ScanLine, label: "Crop Diagnosis" },
    { icon: CloudSun, label: "Weather" },
    { icon: Sprout, label: "Soil Health" },
    { icon: BookOpen, label: "Library" },
    { icon: Settings, label: "Settings" }
];

function Sidebar({ activePage, setActivePage }) {
    const { isPremium } = usePremium();

    function handleMenuClick(label) {
        setActivePage(label);
    }

    // Soil Health is a GroWell Premium feature. Free users still see the
    // entry, but it renders as locked until they have an active premium.
    const visibleMenu = menu.map((item) => ({
        ...item,
        locked: item.label === "Soil Health" && !isPremium,
    }));

    return (
        <aside className="sidebar">

            {/* =========================
                GROWell BRAND
            ========================= */}
            <div className="gw-logo">

                <div className="logo-circle">
                    <img
                        src={logo}
                        alt="GroWell AI"
                    />
                </div>

                <div className="brand-text">
                    <h2>GroWell AI</h2>
                    <p>Cultivating Intelligence</p>
                </div>

            </div>

            {/* =========================
                NAVIGATION
            ========================= */}
            <nav className="gw-nav">

                {visibleMenu.map((item) => {
                    const Icon = item.locked ? Lock : item.icon;

                    return (
                        <button
                            key={item.label}
                            type="button"
                            className={[
                                activePage === item.label
                                    ? "active"
                                    : "",
                                item.hideOnMobile
                                    ? "gw-nav-hide-mobile"
                                    : ""
                            ].filter(Boolean).join(" ")}
                            onClick={() => {
                                if (item.locked) {
                                    // Soil Health is premium-only: send the
                                    // farmer to the upgrade surface.
                                    setActivePage("Premium");
                                    return;
                                }
                                handleMenuClick(item.label);
                            }}
                        >
                            <Icon size={20} />

                            <span>
                                {item.label}
                            </span>
                        </button>
                    );
                })}

            </nav>

            {/* =========================
                GROWTH JOURNEY
            ========================= */}
            <GrowthJourney />

        </aside>
    );
}

export default Sidebar;