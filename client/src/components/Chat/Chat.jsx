import { useEffect, useRef, useState } from "react";

import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import CropPreview from "./CropPreview";

const LANGUAGE_CODES = {
    English: "en-IN",
    Hindi: "hi-IN",
    Telugu: "te-IN",
    Tamil: "ta-IN",
    Kannada: "kn-IN",
    Malayalam: "ml-IN",
    Marathi: "mr-IN",
    Bengali: "bn-IN",
    Gujarati: "gu-IN",
    Punjabi: "pa-IN",
    Odia: "or-IN",
    Urdu: "ur-IN",
    Spanish: "es-ES",
    French: "fr-FR"
};


/* =====================================================
   GROWELL SETTINGS
===================================================== */

function getGrowellSettings() {

    const defaults = {
        language: "English",
        theme: "System",
        effort: "Balanced",
        profile: {}
    };

    try {

        const saved =
            localStorage.getItem("growell-settings");

        if (!saved) {
            return defaults;
        }

        const settings =
            JSON.parse(saved);

        return {

            language:
                settings.preferences?.language ||
                defaults.language,

            theme:
                settings.preferences?.theme ||
                defaults.theme,

            effort:
                settings.preferences?.effort ||
                defaults.effort,

            profile:
                settings.profile ||
                {}

        };

    } catch (error) {

        console.error(
            "SETTINGS READ ERROR:",
            error
        );

        return defaults;
    }
}


/* =====================================================
   CHAT
===================================================== */

function Chat({ user }) {

    const [message, setMessage] =
        useState("");

    const [messages, setMessages] =
        useState([]);

    const [isTyping, setIsTyping] =
        useState(false);

    const [selectedImage, setSelectedImage] =
        useState(null);

    const [selectedFile, setSelectedFile] =
        useState(null);

    const [isAnalyzing, setIsAnalyzing] =
        useState(false);


    const messagesEndRef =
        useRef(null);

    const fileInputRef =
        useRef(null);


    /* =====================================================
       AUTO SCROLL
    ===================================================== */

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages, isTyping]);


    /* =====================================================
       SUGGESTIONS
    ===================================================== */

    function handleSuggestionClick(prompt) {

        setMessage(prompt);

    }


    /* =====================================================
       ENTER KEY
    ===================================================== */

    function handleKeyDown(event) {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    }


    /* =====================================================
       IMAGE PICKER
    ===================================================== */

    function openImagePicker() {

        fileInputRef.current?.click();

    }


    /* =====================================================
       IMAGE UPLOAD
    ===================================================== */

    function handleImageUpload(event) {

        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }

        setSelectedFile(file);

        setSelectedImage(
            URL.createObjectURL(file)
        );

    }


    /* =====================================================
       REMOVE IMAGE
    ===================================================== */

    function removeImage() {

        if (selectedImage) {

            URL.revokeObjectURL(
                selectedImage
            );

        }

        setSelectedImage(null);

        setSelectedFile(null);


        if (fileInputRef.current) {

            fileInputRef.current.value = "";

        }

    }


    /* =====================================================
       CROP DIAGNOSIS
    ===================================================== */

    async function analyzeCrop() {

        if (!selectedFile) {
            return;
        }

        setIsAnalyzing(true);


        const formData =
            new FormData();

        formData.append(
            "image",
            selectedFile
        );


        try {

            const response =
                await fetch(
                    "http://localhost:3000/api/diagnose",
                    {
                        method: "POST",
                        body: formData
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    data.error ||
                    "Crop diagnosis failed"
                );

            }


            console.log(
                "🌿 GroWell Vision:",
                data
            );


            /*
             * Keep the diagnosis as a normal
             * GroWell chat response.
             */

            const diagnosisMessage = `

🌱 **GroWell Vision Report**

**Crop:** ${data.crop || "Not identified"}

**Disease / Condition:** ${
                data.disease ||
                data.condition ||
                "No specific condition identified"
            }

**Confidence:** ${
                data.confidence ||
                "Not available"
            }

**Severity:** ${
                data.severity ||
                "Not available"
            }

${data.symptoms
    ? `**Visible Symptoms:**\n${data.symptoms}\n`
    : ""}

${data.cause
    ? `**Likely Cause:**\n${data.cause}\n`
    : ""}

${data.recommendation
    ? `**Recommendation:**\n${data.recommendation}`
    : ""}

            `.trim();


            setMessages((previous) => [

                ...previous,

                {
                    sender: "bot",
                    text: diagnosisMessage
                }

            ]);


        } catch (error) {

            console.error(
                "VISION ERROR:",
                error
            );


            setMessages((previous) => [

                ...previous,

                {
                    sender: "bot",
                    text:
                        "❌ Unable to analyze the crop image. Please check that the GroWell backend is running."
                }

            ]);

        } finally {

            setIsAnalyzing(false);

        }

    }


    /* =====================================================
       VOICE INPUT
    ===================================================== */

    function startVoiceInput() {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;


        if (!SpeechRecognition) {

            alert(
                "Speech Recognition is not supported in this browser."
            );

            return;

        }


        const recognition =
            new SpeechRecognition();


        const settings =
            getGrowellSettings();


        recognition.lang =
            LANGUAGE_CODES[
                settings.language
            ] || "en-IN";


        recognition.interimResults =
            false;

        recognition.maxAlternatives =
            1;


        recognition.onresult =
            (event) => {

                const transcript =
                    event.results[0][0]
                        .transcript;


                setMessage(
                    transcript
                );


                setTimeout(() => {

                    sendMessage(
                        transcript
                    );

                }, 100);

            };


        recognition.onerror =
            (event) => {

                console.error(
                    "VOICE ERROR:",
                    event.error
                );

            };


        recognition.start();

    }


    /* =====================================================
       SEND MESSAGE
    ===================================================== */

    async function sendMessage(
        customMessage = null
    ) {

        const userMessage =
            customMessage ?? message;


        if (
            !userMessage ||
            !userMessage.trim()
        ) {

            return;

        }


        const settings =
            getGrowellSettings();


        /* USER MESSAGE */

        setMessages((previous) => [

            ...previous,

            {
                sender: "user",
                text: userMessage
            }

        ]);


        setMessage("");

        setIsTyping(true);


        try {

            const response =
                await fetch(
                    "http://localhost:3000/api/chat",
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({

                                message:
                                    userMessage,

                                settings: {

                                    language:
                                        settings.language,

                                    effort:
                                        settings.effort,

                                    profile:
                                        settings.profile

                                }

                            })

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.reply ||
                    data.message ||
                    "Server error"
                );

            }


            const aiReply =
                data.reply ||
                "GroWell AI did not return a response.";


            setMessages((previous) => [

                ...previous,

                {
                    sender: "bot",
                    text: aiReply
                }

            ]);


        } catch (error) {

            console.error(
                "CHAT ERROR:",
                error
            );


            setMessages((previous) => [

                ...previous,

                {
                    sender: "bot",
                    text:
                        "❌ Unable to contact GroWell AI. Please make sure the backend is running on port 3000."
                }

            ]);

        } finally {

            setIsTyping(false);

        }

    }


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <div className="chat-container">

            <CropPreview

                image={selectedImage}

                onAnalyze={analyzeCrop}

                onRemove={removeImage}

                isAnalyzing={isAnalyzing}

            />


            <MessageList

                messages={messages}

                isTyping={isTyping}

                selectedImage={selectedImage}

                onSuggestionClick={
                    handleSuggestionClick
                }

                messagesEndRef={
                    messagesEndRef
                }

                /*
                 * IMPORTANT:
                 * Pass the logged-in farmer
                 * to MessageList.
                 */

                user={user}

            />


            <ChatInput

                message={message}

                setMessage={setMessage}

                handleKeyDown={handleKeyDown}

                sendMessage={sendMessage}

                startVoiceInput={
                    startVoiceInput
                }

                openImagePicker={
                    openImagePicker
                }

                handleImageUpload={
                    handleImageUpload
                }

                fileInputRef={
                    fileInputRef
                }

            />

        </div>

    );

}


export default Chat;