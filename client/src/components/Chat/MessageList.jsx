import ReactMarkdown from "react-markdown";
import WelcomeCard from "./WelcomeCard";
import DiagnosisCard from "./DiagnosisCard";
function MessageList({
    messages,
    isTyping,
    onSuggestionClick,
    messagesEndRef,
}) {

    return (

        <div className="messages">


            {messages.length === 0 && (

                <WelcomeCard
                    onSuggestionClick={onSuggestionClick}
                />

            )}



            {messages.map((msg, index) => (

                <div

                    key={index}

                    className={
                        msg.sender === "user"
                        ? "message-row user-row"
                        : "message-row bot-row"
                    }

                >


                    <div className="avatar">

                        {
                            msg.sender === "user"
                            ? "👨‍🌾"
                            : "🌿"
                        }

                    </div>



                    <div

                        className={
                            msg.sender === "user"
                            ? "user-message"
                            : "bot-message"
                        }

                    >

                        {
    msg.type === "diagnosis"

        ?

        <DiagnosisCard
            report={msg.report}
        />

        :

        msg.sender === "bot"

            ?

            <ReactMarkdown>
                {msg.text}
            </ReactMarkdown>

            :

            msg.text
}


                    </div>


                </div>


            ))}





            {isTyping && (

                <div className="message-row bot-row">


                    <div className="avatar">
                        🌿
                    </div>



                    <div className="typing-message">


                        <div className="typing-bubble">

                            <span></span>
                            <span></span>
                            <span></span>

                        </div>


                    </div>


                </div>

            )}




            <div ref={messagesEndRef}></div>


        </div>

    );

}


export default MessageList;