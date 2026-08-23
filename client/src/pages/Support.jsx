import "./InfoPages.css";

function Support() {
    return (
        <div className="info-page">

            <div className="info-hero compact">

                <span className="info-kicker">
                    GROWELL AI SUPPORT
                </span>

                <h1>
                    How can we help?
                </h1>

                <p>
                    Find help with using GroWell AI and its
                    agricultural intelligence features.
                </p>

            </div>


            <div className="info-section">

                <h2>🛠️ Common Issues</h2>

                <div className="info-grid">

                    <div className="info-card">

                        <span>🤖</span>

                        <h3>
                            AI Assistant
                        </h3>

                        <p>
                            If the AI assistant is not responding,
                            check your internet connection and try
                            submitting your question again.
                        </p>

                    </div>


                    <div className="info-card">

                        <span>🌿</span>

                        <h3>
                            Crop Diagnosis
                        </h3>

                        <p>
                            Upload a clear image of the crop or plant
                            with sufficient lighting for better
                            analysis.
                        </p>

                    </div>


                    <div className="info-card">

                        <span>🌦️</span>

                        <h3>
                            Weather
                        </h3>

                        <p>
                            Make sure the requested location can be
                            identified correctly.
                        </p>

                    </div>


                    <div className="info-card">

                        <span>⚙️</span>

                        <h3>
                            Settings
                        </h3>

                        <p>
                            Check your language and application
                            preferences from the Settings section.
                        </p>

                    </div>

                </div>

            </div>


            <div className="info-section">

                <h2>💬 Need More Help?</h2>

                <div className="support-card">

                    <div className="support-icon">
                        ✉️
                    </div>

                    <div>

                        <h3>
                            Contact GroWell AI
                        </h3>

                        <p>
                            Support contact information will be
                            published as GroWell AI moves toward
                            public release.
                        </p>

                    </div>

                </div>

            </div>


            <div className="info-section">

                <h2>🌱 Before Contacting Support</h2>

                <ul className="info-list">

                    <li>
                        Check that your internet connection is active.
                    </li>

                    <li>
                        Refresh the GroWell AI application.
                    </li>

                    <li>
                        Check whether the issue occurs on another
                        page.
                    </li>

                    <li>
                        Note the exact error message if one appears.
                    </li>

                </ul>

            </div>


            <div className="info-bottom">

                <strong>
                    GroWell AI
                </strong>

                <span>
                    We're building agricultural intelligence for
                    everyone.
                </span>

            </div>

        </div>
    );
}

export default Support;