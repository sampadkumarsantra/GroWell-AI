import { useState, useRef, useEffect } from "react";

function Chat() {

    const [message, setMessage] = useState("");

    const [isTyping, setIsTyping] = useState(false);

    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "🌱 Hello! I am GroWell AI.\n\nEvery soil has a story.\nLet's discover what your farm is trying to tell you."
        }
    ]);

    const messagesEndRef = useRef(null);

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages, isTyping]);

    async function sendMessage() {

        if (!message.trim()) return;

        const userMessage = message;

        setMessages(prev => [
            ...prev,
            {
                sender: "user",
                text: userMessage
            }
        ]);

        setMessage("");

        setIsTyping(true);

        try {

            const response = await fetch("http://localhost:5000/api/chat", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: userMessage
                })

            });

            const data = await response.json();

            setIsTyping(false);

            if (!response.ok) {

                throw new Error(data.reply || "Server Error");

            }

            setMessages(prev => [
                ...prev,
                {
                    sender: "bot",
                    text: data.reply
                }
            ]);

        }

        catch (error) {

            console.error(error);

            setIsTyping(false);

            setMessages(prev => [
                ...prev,
                {
                    sender: "bot",
                    text: "❌ Unable to contact GroWell AI."
                }
            ]);

        }

    }

    function handleKeyDown(e) {

        if (e.key === "Enter") {

            sendMessage();

        }

    }

    return (

        <div className="chat-container">

            <div className="chat-header">

                <h1>GroWell AI</h1>

                <p>Where intelligence meets the soil.</p>

            </div>

            <div className="messages">

                {messages.map((msg, index) => (

                    <div
                        key={index}
                        className={
                            msg.sender === "user"
                                ? "user-message"
                                : "bot-message"
                        }
                    >

                        {msg.text}

                    </div>

                ))}

                {isTyping && (

                    <div className="typing-message">

                        <div className="typing-bubble">

                            <span></span>

                            <span></span>

                            <span></span>

                        </div>

                    </div>

                )}

                <div ref={messagesEndRef}></div>

            </div>

            <div className="chat-input">

                <input

                    type="text"

                    value={message}

                    onChange={(e) => setMessage(e.target.value)}

                    onKeyDown={handleKeyDown}

                    placeholder="What would you like to grow today?"

                />

                <button title="Voice Input">

                    🎤

                </button>

                <button title="Upload Crop Image">

                    📷

                </button>

                <button

                    title="Send Message"

                    onClick={sendMessage}

                >

                    ➤

                </button>

            </div>

        </div>

    );

}

export default Chat;