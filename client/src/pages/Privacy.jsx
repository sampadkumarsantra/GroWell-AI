import "./InfoPages.css";

function Privacy() {
    return (
        <div className="info-page">

            <div className="info-hero compact">

                <span className="info-kicker">
                    GROWELL AI
                </span>

                <h1>
                    Privacy Policy
                </h1>

                <p>
                    Your privacy matters to GroWell AI.
                </p>

            </div>


            <div className="info-section">

                <h2>1. Information We May Collect</h2>

                <p>
                    Depending on the features you use, GroWell AI may
                    process information such as your name, email
                    address, language preferences and agricultural
                    inputs.
                </p>

            </div>


            <div className="info-section">

                <h2>2. Agricultural Information</h2>

                <p>
                    Information entered into agricultural features
                    may include crop information, soil parameters,
                    farming questions, weather-related information
                    and crop images submitted for analysis.
                </p>

            </div>


            <div className="info-section">

                <h2>3. How Information Is Used</h2>

                <ul className="info-list">

                    <li>
                        To provide GroWell AI services.
                    </li>

                    <li>
                        To personalize the user experience.
                    </li>

                    <li>
                        To process agricultural analysis requests.
                    </li>

                    <li>
                        To improve platform functionality and
                        reliability.
                    </li>

                </ul>

            </div>


            <div className="info-section">

                <h2>4. AI Processing</h2>

                <p>
                    Some GroWell AI features use external artificial
                    intelligence services to process user requests.
                </p>

                <p>
                    Information required to provide a requested
                    feature may therefore be transmitted to the
                    relevant service provider.
                </p>

            </div>


            <div className="info-section">

                <h2>5. Data Security</h2>

                <p>
                    GroWell AI aims to use appropriate technical and
                    organizational measures to protect user
                    information.
                </p>

                <p>
                    However, no internet-based system can guarantee
                    absolute security.
                </p>

            </div>


            <div className="info-section">

                <h2>6. Local Storage</h2>

                <p>
                    Some application preferences and user experience
                    information may be stored locally in the browser
                    using technologies such as localStorage.
                </p>

            </div>


            <div className="info-section">

                <h2>7. Third-Party Services</h2>

                <p>
                    GroWell AI may integrate third-party services for
                    functions such as artificial intelligence,
                    weather information and agricultural data.
                </p>

            </div>


            <div className="info-section">

                <h2>8. Policy Updates</h2>

                <p>
                    This Privacy Policy may be updated as GroWell AI
                    develops and introduces new services.
                </p>

            </div>


            <div className="info-bottom">

                <strong>
                    GroWell AI
                </strong>

                <span>
                    Built with privacy and responsible AI in mind.
                </span>

            </div>

        </div>
    );
}

export default Privacy;