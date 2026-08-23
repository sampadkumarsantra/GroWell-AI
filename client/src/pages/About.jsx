import "./InfoPages.css";

function About() {
    return (
        <div className="info-page">

            <div className="info-hero">
                <span className="info-kicker">
                    ABOUT GROWELL AI
                </span>

                <h1>
                    Cultivating Intelligence.
                    <br />
                    Growing Possibilities.
                </h1>

                <p>
                    GroWell AI is an intelligent agricultural companion
                    designed to help farmers make better, faster and
                    more informed farming decisions.
                </p>
            </div>


            <div className="info-section">

                <h2>🌱 Our Vision</h2>

                <p>
                    Agriculture involves hundreds of decisions throughout
                    every growing season. Farmers need to understand soil,
                    weather, crop health, irrigation, nutrients, pests and
                    market conditions — often at the same time.
                </p>

                <p>
                    GroWell AI aims to bring these different sources of
                    agricultural intelligence together into one accessible
                    platform.
                </p>

                <div className="info-highlight">
                    <strong>
                        Crop + Soil + Weather + Market + AI
                    </strong>

                    <span>
                        Turning agricultural information into
                        practical farming decisions.
                    </span>
                </div>

            </div>


            <div className="info-section">

                <h2>🤖 What GroWell AI Does</h2>

                <div className="info-grid">

                    <div className="info-card">
                        <span>🤖</span>
                        <h3>AI Agricultural Assistant</h3>
                        <p>
                            Provides agriculture-focused guidance
                            through natural language interaction.
                        </p>
                    </div>

                    <div className="info-card">
                        <span>🌿</span>
                        <h3>Crop Diagnosis</h3>
                        <p>
                            Helps analyze crop images and identify
                            possible diseases and plant health problems.
                        </p>
                    </div>

                    <div className="info-card">
                        <span>🌦️</span>
                        <h3>Weather Intelligence</h3>
                        <p>
                            Converts weather information into
                            agriculture-focused insights.
                        </p>
                    </div>

                    <div className="info-card">
                        <span>🧪</span>
                        <h3>Soil Intelligence</h3>
                        <p>
                            Helps interpret soil parameters and
                            generate agricultural recommendations.
                        </p>
                    </div>

                    <div className="info-card">
                        <span>📊</span>
                        <h3>Market Analytics</h3>
                        <p>
                            Helps farmers understand agricultural
                            price information and market trends.
                        </p>
                    </div>

                    <div className="info-card">
                        <span>📚</span>
                        <h3>Knowledge Library</h3>
                        <p>
                            Provides structured agricultural
                            information for farmers.
                        </p>
                    </div>

                </div>

            </div>


            <div className="info-section founder-section">

                <h2>👨‍🌾 Founder</h2>

                <div className="founder-card">

                    <div className="founder-avatar">
                        S
                    </div>

                    <div>
                        <h3>
                            Sampad Kumar Santra
                        </h3>

                        <span>
                            Founder — GroWell AI
                        </span>

                        <p>
                            GroWell AI was founded with the vision of
                            making modern agricultural intelligence
                            more accessible, understandable and useful
                            for farmers.
                        </p>
                    </div>

                </div>

            </div>


            <div className="info-section">

                <h2>🌍 Built for Farmers</h2>

                <p>
                    GroWell AI is being developed with a farmer-first
                    philosophy. The objective is not simply to provide
                    information, but to make complex agricultural
                    information easier to understand and act upon.
                </p>

                <p>
                    The platform is designed to evolve toward
                    personalized farming intelligence, location-aware
                    recommendations, crop monitoring and predictive
                    agricultural insights.
                </p>

            </div>


            <div className="info-bottom">

                <strong>
                    GroWell AI
                </strong>

                <span>
                    Cultivating Intelligence. Growing Possibilities.
                </span>

            </div>

        </div>
    );
}

export default About;