import { useState } from "react";

import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Chat from "../components/Chat/Chat";

import Weather from "../components/Weather/Weather";
import CropDiagnosis from "./CropDiagnosis";
import SoilHealth from "./SoilHealth";
import Library from "./Library";
import Analytics from "./Analytics";
import Settings from "./Settings";

import About from "./About";
import Terms from "./Terms";
import Privacy from "./Privacy";
import Support from "./Support";

import "./Dashboard.css";

function Dashboard({ user, onLogout }) {
    const [activePage, setActivePage] = useState("Chat");

    function renderPage() {
        switch (activePage) {
            case "Chat":
                return <Chat user={user} />;

            case "Crop Diagnosis":
                return <CropDiagnosis />;

            case "Weather":
                return <Weather />;

            case "Soil Health":
                return <SoilHealth />;

            case "Library":
                return <Library />;

            case "Analytics":
                return <Analytics />;

            case "Settings":
                return <Settings />;

            /* =========================================
               INFORMATION PAGES
            ========================================= */

            case "About":
                return <About />;

            case "Terms":
                return <Terms />;

            case "Privacy":
                return <Privacy />;

            case "Support":
                return <Support />;

            /* =========================================
               FALLBACK
            ========================================= */

            default:
                return <Chat user={user} />;
        }
    }

    return (
        <div className="dashboard-layout">

            <Sidebar
                activePage={activePage}
                setActivePage={setActivePage}
            />

            <div className="dashboard-main">

                <Header
                    user={user}
                    setActivePage={setActivePage}
                    onLogout={onLogout}
                />

                <main className="page-container">
                    {renderPage()}
                </main>

            </div>

        </div>
    );
}

export default Dashboard;