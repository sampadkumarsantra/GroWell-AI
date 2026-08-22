import {
    MessageSquare,
    ScanLine,
    CloudSun,
    Sprout,
    BarChart3,
    Settings,
    BookOpen
} from "lucide-react";

import "./Sidebar.css";
import logo from "../../assets/logo.svg";
const menu = [
    { icon: MessageSquare, label: "Chat" },
    { icon: ScanLine, label: "Crop Diagnosis" },
    { icon: CloudSun, label: "Weather" },
    { icon: Sprout, label: "Soil Health" },
    { icon: BookOpen, label: "Library" },
    { icon: BarChart3, label: "Analytics" },
    { icon: Settings, label: "Settings" }
];

function Sidebar({ activePage, setActivePage }) {
    function handleMenuClick(label) {
        setActivePage(label);
    }

    return (
        <aside className="sidebar">

            <div className="gw-logo">

    <div className="logo-circle">
        <img src={logo} alt="GroWell AI" />
    </div>

    <div className="brand-text">
        <h2>GroWell AI</h2>
        <p>Cultivating Intelligence</p>
    </div>

</div>

            <nav className="gw-nav">
                {menu.map((item) => {
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.label}
                            className={
                                activePage === item.label ? "active" : ""
                            }
                            onClick={() => handleMenuClick(item.label)}
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            <div className="sidebar-footer">
                <div className="status-dot"></div>
                <span>AI Online</span>
            </div>

        </aside>
    );
}

export default Sidebar;