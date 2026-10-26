import { lazy, Suspense, useState } from "react";

import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Chat from "../components/Chat/Chat";
import GrowthJourney from "../components/GrowthJourney/GrowthJourney";

/*
 * Only the chat is in the initial bundle. Every other page is
 * split into its own chunk so the first paint does not wait for
 * the 300 KB crop library or the soil forms.
 */
const Weather = lazy(() => import("../components/Weather/Weather"));
const CropDiagnosis = lazy(() => import("./CropDiagnosis"));
const SoilHealth = lazy(() => import("./SoilHealth"));
const Library = lazy(() => import("./Library"));
const Settings = lazy(() => import("./Settings"));
const Premium = lazy(() => import("./Premium"));
const About = lazy(() => import("./About"));
const Terms = lazy(() => import("./Terms"));
const Privacy = lazy(() => import("./Privacy"));
const Support = lazy(() => import("./Support"));

import "./Dashboard.css";

function Dashboard({ user, onLogout }) {
    const [activePage, setActivePage] = useState("Chat");

    function renderPage() {
        switch (activePage) {
            case "Chat":
                return <Chat user={user} setActivePage={setActivePage} />;

            case "Crop Diagnosis":
                return <CropDiagnosis />;

            case "Weather":
                return <Weather />;

            case "Soil Health":
                return <SoilHealth />;

            case "Journey":
                return (
                    <div className="journey-page">
                        <GrowthJourney />
                    </div>
                );

            case "Library":
                return <Library />;

            case "Settings":
                return (
                    <Settings setActivePage={setActivePage} />
                );

            case "Premium":
                return <Premium />;

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
                return (
                    <Chat
                        user={user}
                        setActivePage={setActivePage}
                    />
                );
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

                <main
                    className={
                        "page-container" +
                        (activePage === "Chat"
                            ? " chat-page"
                            : "")
                    }
                >
                    <Suspense
                        fallback={
                            <div
                                className="page-loader"
                                role="status"
                                aria-live="polite"
                            >
                                <span className="page-loader-spinner" />
                                <span>Loading…</span>
                            </div>
                        }
                    >
                        {renderPage()}
                    </Suspense>
                </main>

            </div>

        </div>
    );
}

export default Dashboard;