import { useEffect, useState } from "react";
import {
    Bell,
    Check,
    Download,
    Leaf,
    LockKeyhole,
    MapPin,
    Monitor,
    Palette,
    Save,
    ShieldCheck,
    SlidersHorizontal,
    UserRound
} from "lucide-react";

import "./Settings.css";

const STORAGE_KEY = "growell-settings";

const DEFAULT_SETTINGS = {
    profile: {
        name: "Farmer",
        email: "",
        farmName: "My Farm",
        location: "",
        cropFocus: ""
    },
    preferences: {
        theme: "System",
        language: "English",
        units: "Metric",
        effort: "Balanced"
    },
    notifications: {
        weather: true,
        diagnosis: true,
        weeklyReport: true,
        productUpdates: false
    },
    privacy: {
        analytics: true
    }
};

function loadSettings() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return DEFAULT_SETTINGS;
        }

        const stored = JSON.parse(saved);

        return {
            profile: {
                ...DEFAULT_SETTINGS.profile,
                ...stored.profile
            },
            preferences: {
                ...DEFAULT_SETTINGS.preferences,
                ...stored.preferences
            },
            notifications: {
                ...DEFAULT_SETTINGS.notifications,
                ...stored.notifications
            },
            privacy: {
                ...DEFAULT_SETTINGS.privacy,
                ...stored.privacy
            }
        };
    } catch {
        return DEFAULT_SETTINGS;
    }
}

function applyAppTheme(theme) {
    const resolvedTheme =
        theme === "System"
            ? window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
                ? "dark"
                : "light"
            : theme.toLowerCase();

    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.style.colorScheme = resolvedTheme;
}

const tabs = [
    { name: "Profile", icon: UserRound },
    { name: "Preferences", icon: SlidersHorizontal },
    { name: "Notifications", icon: Bell },
    { name: "Privacy & Data", icon: ShieldCheck }
];

function Settings() {
    const [activeTab, setActiveTab] = useState("Profile");
    const [settings, setSettings] = useState(loadSettings);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(settings)
        );
    }, [settings]);

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            "(prefers-color-scheme: dark)"
        );

        function updateTheme() {
            applyAppTheme(settings.preferences.theme);
        }

        updateTheme();

        if (settings.preferences.theme === "System") {
            mediaQuery.addEventListener("change", updateTheme);

            return () => {
                mediaQuery.removeEventListener(
                    "change",
                    updateTheme
                );
            };
        }
    }, [settings.preferences.theme]);

    const initials = (settings.profile.name || "G")
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    function updateSection(section, field, value) {
        setSettings((current) => ({
            ...current,
            [section]: {
                ...current[section],
                [field]: value
            }
        }));
    }

    function saveSettings() {
        setSaved(true);

        setTimeout(() => {
            setSaved(false);
        }, 2500);
    }

    function exportSettings() {
        const file = new Blob(
            [JSON.stringify(settings, null, 2)],
            { type: "application/json" }
        );

        const url = URL.createObjectURL(file);
        const link = document.createElement("a");

        link.href = url;
        link.download = "growell-settings.json";
        link.click();

        URL.revokeObjectURL(url);
    }

    function restoreDefaults() {
        const confirmed = window.confirm(
            "Restore the default GroWell settings?"
        );

        if (confirmed) {
            setSettings(DEFAULT_SETTINGS);
            setSaved(true);

            setTimeout(() => {
                setSaved(false);
            }, 2500);
        }
    }

    return (
        <div
            className={`gw-settings theme-${settings.preferences.theme.toLowerCase()}`}
        >
            <section className="settings-hero">
                <div>
                    <div className="settings-eyebrow">
                        <Leaf size={16} />
                        GroWell workspace
                    </div>

                    <h1>Settings</h1>

                    <p>
                        Personalize your farm workspace, alerts, and account
                        preferences.
                    </p>
                </div>

                <div className="settings-status">
                    <span></span>
                    All systems operational
                </div>
            </section>

            <div className="settings-layout">
                <aside className="settings-tabs">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;

                        return (
                            <button
                                type="button"
                                key={tab.name}
                                className={
                                    activeTab === tab.name
                                        ? "settings-tab active"
                                        : "settings-tab"
                                }
                                onClick={() => setActiveTab(tab.name)}
                            >
                                <Icon size={19} />
                                {tab.name}
                            </button>
                        );
                    })}
                </aside>

                <div className="settings-content">
                    {activeTab === "Profile" && (
                        <>
                            <section className="settings-panel">
                                <div className="panel-heading">
                                    <div>
                                        <h2>Personal profile</h2>
                                        <p>
                                            Your details shown across GroWell
                                            AI.
                                        </p>
                                    </div>
                                </div>

                                <div className="profile-summary">
                                    <div className="profile-avatar">
                                        {initials}
                                    </div>

                                    <div>
                                        <strong>
                                            {settings.profile.name ||
                                                "Farmer"}
                                        </strong>

                                        <span>
                                            {settings.profile.email ||
                                                "No email address added"}
                                        </span>
                                    </div>
                                </div>

                                <div className="settings-fields">
                                    <label>
                                        Full name
                                        <input
                                            value={settings.profile.name}
                                            onChange={(event) =>
                                                updateSection(
                                                    "profile",
                                                    "name",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Your name"
                                        />
                                    </label>

                                    <label>
                                        Email address
                                        <input
                                            type="email"
                                            value={settings.profile.email}
                                            onChange={(event) =>
                                                updateSection(
                                                    "profile",
                                                    "email",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="you@example.com"
                                        />
                                    </label>
                                </div>
                            </section>

                            <section className="settings-panel">
                                <div className="panel-heading">
                                    <div>
                                        <h2>Farm details</h2>
                                        <p>
                                            Help GroWell tailor advice to your
                                            farm.
                                        </p>
                                    </div>

                                    <MapPin size={21} />
                                </div>

                                <div className="settings-fields">
                                    <label>
                                        Farm name
                                        <input
                                            value={settings.profile.farmName}
                                            onChange={(event) =>
                                                updateSection(
                                                    "profile",
                                                    "farmName",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Green Valley Farm"
                                        />
                                    </label>

                                    <label>
                                        Farm location
                                        <input
                                            value={settings.profile.location}
                                            onChange={(event) =>
                                                updateSection(
                                                    "profile",
                                                    "location",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="City or district"
                                        />
                                    </label>

                                    <label className="field-wide">
                                        Main crops
                                        <input
                                            value={settings.profile.cropFocus}
                                            onChange={(event) =>
                                                updateSection(
                                                    "profile",
                                                    "cropFocus",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Rice, wheat, tomatoes"
                                        />
                                    </label>
                                </div>
                            </section>
                        </>
                    )}

                    {activeTab === "Preferences" && (
                        <>
                            <section className="settings-panel">
                                <div className="panel-heading">
                                    <div>
                                        <h2>Workspace preferences</h2>
                                        <p>
                                            Choose how GroWell looks and
                                            communicates.
                                        </p>
                                    </div>

                                    <Palette size={21} />
                                </div>

                                <div className="settings-fields">
                                    <label>
                                        Theme
                                        <select
                                            value={
                                                settings.preferences.theme
                                            }
                                            onChange={(event) =>
                                                updateSection(
                                                    "preferences",
                                                    "theme",
                                                    event.target.value
                                                )
                                            }
                                        >
                                            <option>System</option>
                                            <option>Light</option>
                                            <option>Dark</option>
                                        </select>
                                    </label>

                                    <label>
                                        AI response effort
                                        <select
                                            value={
                                                settings.preferences.effort
                                            }
                                            onChange={(event) =>
                                                updateSection(
                                                    "preferences",
                                                    "effort",
                                                    event.target.value
                                                )
                                            }
                                        >
                                            <option>Quick</option>
                                            <option>Balanced</option>
                                            <option>Detailed</option>
                                        </select>
                                    </label>

                                    <label>
                                        Language
                                        <select
                                            value={
                                                settings.preferences.language
                                            }
                                            onChange={(event) =>
                                                updateSection(
                                                    "preferences",
                                                    "language",
                                                    event.target.value
                                                )
                                            }
                                        >
                                            <option>English</option>
                                            <option>Hindi</option>
                                            <option>Telugu</option>
                                            <option>Tamil</option>
                                            <option>Kannada</option>
                                            <option>Malayalam</option>
                                            <option>Marathi</option>
                                            <option>Bengali</option>
                                            <option>Gujarati</option>
                                            <option>Punjabi</option>
                                            <option>Odia</option>
                                            <option>Urdu</option>
                                            <option>Spanish</option>
                                            <option>French</option>
                                        </select>
                                    </label>

                                    <label>
                                        Measurement units
                                        <select
                                            value={
                                                settings.preferences.units
                                            }
                                            onChange={(event) =>
                                                updateSection(
                                                    "preferences",
                                                    "units",
                                                    event.target.value
                                                )
                                            }
                                        >
                                            <option>Metric</option>
                                            <option>Imperial</option>
                                        </select>
                                    </label>
                                </div>
                            </section>

                            <section className="settings-panel compact-panel">
                                <Monitor size={22} />

                                <div>
                                    <h3>Smart recommendations</h3>
                                    <p>
                                        GroWell uses your farm profile,
                                        language, and AI effort level to
                                        personalize future recommendations.
                                    </p>
                                </div>
                            </section>
                        </>
                    )}

                    {activeTab === "Notifications" && (
                        <section className="settings-panel">
                            <div className="panel-heading">
                                <div>
                                    <h2>Notification center</h2>
                                    <p>
                                        Decide which updates deserve your
                                        attention.
                                    </p>
                                </div>

                                <Bell size={21} />
                            </div>

                            <NotificationRow
                                title="Weather alerts"
                                description="Important rainfall, temperature, and wind updates."
                                checked={settings.notifications.weather}
                                onChange={(value) =>
                                    updateSection(
                                        "notifications",
                                        "weather",
                                        value
                                    )
                                }
                            />

                            <NotificationRow
                                title="Crop diagnosis updates"
                                description="Get notified when a diagnosis is ready."
                                checked={settings.notifications.diagnosis}
                                onChange={(value) =>
                                    updateSection(
                                        "notifications",
                                        "diagnosis",
                                        value
                                    )
                                }
                            />

                            <NotificationRow
                                title="Weekly farm report"
                                description="A concise weekly summary of insights and activity."
                                checked={
                                    settings.notifications.weeklyReport
                                }
                                onChange={(value) =>
                                    updateSection(
                                        "notifications",
                                        "weeklyReport",
                                        value
                                    )
                                }
                            />

                            <NotificationRow
                                title="Product updates"
                                description="Occasional updates about new GroWell features."
                                checked={
                                    settings.notifications.productUpdates
                                }
                                onChange={(value) =>
                                    updateSection(
                                        "notifications",
                                        "productUpdates",
                                        value
                                    )
                                }
                            />
                        </section>
                    )}

                    {activeTab === "Privacy & Data" && (
                        <>
                            <section className="settings-panel">
                                <div className="panel-heading">
                                    <div>
                                        <h2>Privacy controls</h2>
                                        <p>
                                            Control how GroWell improves your
                                            experience.
                                        </p>
                                    </div>

                                    <LockKeyhole size={21} />
                                </div>

                                <NotificationRow
                                    title="Share anonymous usage analytics"
                                    description="Helps us improve GroWell without identifying you."
                                    checked={settings.privacy.analytics}
                                    onChange={(value) =>
                                        updateSection(
                                            "privacy",
                                            "analytics",
                                            value
                                        )
                                    }
                                />
                            </section>

                            <section className="settings-panel">
                                <div className="panel-heading">
                                    <div>
                                        <h2>Your data</h2>
                                        <p>
                                            Download your preferences or start
                                            again with defaults.
                                        </p>
                                    </div>
                                </div>

                                <div className="data-actions">
                                    <button
                                        type="button"
                                        className="secondary-action"
                                        onClick={exportSettings}
                                    >
                                        <Download size={18} />
                                        Export settings
                                    </button>

                                    <button
                                        type="button"
                                        className="danger-action"
                                        onClick={restoreDefaults}
                                    >
                                        Restore defaults
                                    </button>
                                </div>
                            </section>
                        </>
                    )}

                    <div className="settings-save-bar">
                        <span>
                            {saved
                                ? "Settings saved successfully."
                                : "Changes apply instantly and are saved automatically."}
                        </span>

                        <button type="button" onClick={saveSettings}>
                            {saved ? <Check size={18} /> : <Save size={18} />}
                            {saved ? "Saved" : "Save changes"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function NotificationRow({ title, description, checked, onChange }) {
    return (
        <div className="notification-row">
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>

            <button
                type="button"
                className={checked ? "toggle-switch on" : "toggle-switch"}
                aria-label={`Toggle ${title}`}
                aria-pressed={checked}
                onClick={() => onChange(!checked)}
            >
                <span></span>
            </button>
        </div>
    );
}

export default Settings;