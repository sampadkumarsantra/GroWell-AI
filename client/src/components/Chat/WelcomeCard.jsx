import {
    Sprout,
    CloudSun,
    Microscope,
    FlaskConical
} from "lucide-react";

import "./WelcomeCard.css";


function WelcomeCard({ onSuggestionClick = () => {} }) {


    const suggestions = [

        {
            title:"Crop Doctor",
            description:"Detect crop problems and diseases",
            icon:Microscope,
            prompt:"Diagnose my crop problem"
        },

        {
            title:"Weather Intelligence",
            description:"Get weather-based farming advice",
            icon:CloudSun,
            prompt:"Give me weather advice for farming"
        },

        {
            title:"Soil Health",
            description:"Understand soil nutrients",
            icon:Sprout,
            prompt:"Analyze my soil health"
        },

        {
            title:"Fertilizer Advisor",
            description:"Find suitable fertilizer plans",
            icon:FlaskConical,
            prompt:"Recommend fertilizer for my crop"
        }

    ];


    return (

        <div className="welcome-wrapper">


            <div className="welcome-card">


                <div className="welcome-logo">
                    🌿
                </div>


                <h1>
                    Welcome to GroWell AI
                </h1>


                <p>
                    Your intelligent farming companion.
                    <br/>
                    Ask questions, diagnose crops, and improve productivity.
                </p>



                <div className="suggestion-grid">


                    {
                        suggestions.map((item)=>{


                            const Icon=item.icon;


                            return (

                                <button

                                    key={item.title}

                                    className="suggestion-card"

                                    onClick={()=>
                                        onSuggestionClick(item.prompt)
                                    }

                                >


                                    <div className="suggestion-icon">

                                        <Icon size={28}/>

                                    </div>


                                    <div>

                                        <h3>
                                            {item.title}
                                        </h3>


                                        <span>
                                            {item.description}
                                        </span>

                                    </div>


                                </button>

                            );


                        })
                    }


                </div>


            </div>


        </div>

    );

}


export default WelcomeCard;