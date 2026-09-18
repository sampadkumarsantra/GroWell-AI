
import { useEffect, useMemo, useRef, useState } from "react";

import { History } from "lucide-react";

import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import CropPreview from "./CropPreview";
import ConversationSidebar
    from "./ConversationSidebar";

import "./Chat.css";
import "./ChatInput.css";

import { registerGrowthAction } from "../../services/growthTracker";
import { apiRequest } from "../../services/api";
import {
    loadConversations,
    saveConversations,
    createConversation,
    buildTitle
} from "../../services/conversationStore";

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
        const saved = localStorage.getItem("growell-settings");

        if (!saved) {
            return defaults;
        }

        const settings = JSON.parse(saved);

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
        console.error("SETTINGS READ ERROR:", error);
        return defaults;
    }
}

/* =====================================================
   GROWTH EVENT
   ===================================================== */

function notifyGrowthUpdated() {
    window.dispatchEvent(
        new Event("growell-growth-updated")
    );
}

/* =====================================================
   CHAT
   ===================================================== */

function Chat({ user, setActivePage }) {

    /* -------------------------------------------------
       CONVERSATION STATE
    ------------------------------------------------- */

    const [conversations, setConversations] =
        useState([]);

    const [
        activeConversationId,
        setActiveConversationId
    ] = useState(null);

    const [sidebarOpen, setSidebarOpen] =
        useState(false);

    /* -------------------------------------------------
       UI STATE
    ------------------------------------------------- */

    const [message, setMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [selectedImage, setSelectedImage] =
        useState(null);
    const [selectedFile, setSelectedFile] =
        useState(null);
    const [isAnalyzing, setIsAnalyzing] =
        useState(false);
    const [isListening, setIsListening] =
        useState(false);

    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const recognitionRef = useRef(null);

    /* -------------------------------------------------
       DERIVED: ACTIVE CONVERSATION + MESSAGES
    ------------------------------------------------- */

    const activeConversation = useMemo(
        () =>
            conversations.find(
                (conversation) =>
                    conversation.id ===
                    activeConversationId
            ) ||
            conversations[0] ||
            null,
        [conversations, activeConversationId]
    );

    const messages = useMemo(
        () => activeConversation?.messages || [],
        [activeConversation]
    );

    /* -------------------------------------------------
       LOAD ON MOUNT
    ------------------------------------------------- */

    useEffect(() => {
        const stored = loadConversations();

        if (stored.length === 0) {
            const first = createConversation();
            setConversations([first]);
            setActiveConversationId(first.id);
        } else {
            setConversations(stored);
            setActiveConversationId(
                (current) =>
                    current ?? stored[0].id
            );
        }
    }, []);

    /* -------------------------------------------------
       PERSIST ON CHANGE
    ------------------------------------------------- */

    useEffect(() => {
        if (conversations.length > 0) {
            saveConversations(conversations);
        }
    }, [conversations]);

    /* -------------------------------------------------
       AUTO SCROLL
    ------------------------------------------------- */

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages, isTyping]);

    /* -------------------------------------------------
       SUGGESTIONS
    ------------------------------------------------- */

    function handleSuggestionClick(prompt) {
        setMessage(prompt);
    }

    /* -------------------------------------------------
       ENTER KEY
    ------------------------------------------------- */

    function handleKeyDown(event) {
        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {
            event.preventDefault();
            sendMessage();
        }
    }

    /* -------------------------------------------------
       IMAGE PICKER
    ------------------------------------------------- */

    function openImagePicker() {
        fileInputRef.current?.click();
    }

    /* -------------------------------------------------
       IMAGE UPLOAD
    ------------------------------------------------- */

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

    /* -------------------------------------------------
       REMOVE IMAGE
    ------------------------------------------------- */

    function removeImage() {
        if (selectedImage) {
            URL.revokeObjectURL(selectedImage);
        }

        setSelectedImage(null);
        setSelectedFile(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    /* -------------------------------------------------
       CONVERSATION HELPERS
    ------------------------------------------------- */

    function appendMessage(
        entry,
        { title } = {}
    ) {
        const id = activeConversationId;

        setConversations((previous) =>
            previous.map((conversation) => {
                if (conversation.id !== id) {
                    return conversation;
                }

                const next = {
                    ...conversation,
                    messages: [
                        ...conversation.messages,
                        entry
                    ],
                    updatedAt:
                        new Date().toISOString()
                };

                if (
                    title &&
                    next.title === "New chat"
                ) {
                    next.title = title;
                }

                return next;
            })
        );
    }

    function handleNewChat() {
        const conversation =
            createConversation();

        setConversations((previous) => [
            conversation,
            ...previous
        ]);

        setActiveConversationId(conversation.id);
        setMessage("");
        removeImage();
        setSidebarOpen(false);
    }

    function handleSelectConversation(id) {
        setActiveConversationId(id);
        setMessage("");
        removeImage();
        setSidebarOpen(false);
    }

    function handleDeleteConversation(id) {
        const current = conversations;

        const next = current.filter(
            (conversation) =>
                conversation.id !== id
        );

        if (id === activeConversationId) {
            if (next.length === 0) {
                const fresh =
                    createConversation();

                setConversations([fresh]);
                setActiveConversationId(fresh.id);
            } else {
                setConversations(next);
                setActiveConversationId(
                    next[0].id
                );
            }
        } else {
            setConversations(next);
        }
    }

    /* -------------------------------------------------
       CROP DIAGNOSIS
    ------------------------------------------------- */

    async function analyzeCrop() {
        if (!selectedFile) {
            return;
        }

        setIsAnalyzing(true);

        const formData = new FormData();

        formData.append(
            "image",
            selectedFile
        );

        try {
            const response = await apiRequest(
                "/api/diagnose",
                {
                    method: "POST",
                    body: formData
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                const requestError = new Error(
                    data.message ||
                    data.error ||
                    "Crop diagnosis failed"
                );
                requestError.status = response.status;
                throw requestError;
            }

            console.log(
                "🌿 GroWell Vision:",
                data
            );

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

${
    data.symptoms
        ? `**Visible Symptoms:**\n${data.symptoms}\n`
        : ""
}

${
    data.cause
        ? `**Likely Cause:**\n${data.cause}\n`
        : ""
}

${
    data.recommendation
        ? `**Recommendation:**\n${data.recommendation}`
        : ""
}
            `.trim();

            appendMessage({
                sender: "bot",
                text: diagnosisMessage
            });

            registerGrowthAction(
                "crop disease diagnosis"
            );

            notifyGrowthUpdated();

        } catch (error) {
            console.error(
                "VISION ERROR:",
                error
            );

            if (error?.status === 429) {

                appendMessage({
                    sender: "bot",
                    text:
                        "⚠️ The crop diagnosis service has reached its request limit and is temporarily busy.\n\nPlease wait about a minute, then try the analysis again."
                });

            } else if (error?.status === 503) {

                appendMessage({
                    sender: "bot",
                    text:
                        "⚠️ Crop diagnosis is temporarily unavailable because the AI model is experiencing high demand.\n\nPlease wait a moment, then try the analysis again."
                });

            } else {

                const detail =
                    error?.message || "";

                const hiddenDetail =
                    !detail ||
                    detail === "Failed to fetch" ||
                    detail.includes(
                        "Unexpected token"
                    );

                appendMessage({
                    sender: "bot",
                    text:
                        "❌ Unable to analyze the crop image." +
                        (hiddenDetail
                            ? ""
                            : `\n\n${detail}`) +
                        "\n\nPlease check that the GroWell backend is reachable and the Gemini API key is configured."
                });

            }

        } finally {
            setIsAnalyzing(false);
        }
    }

    /* -------------------------------------------------
       VOICE INPUT
    ------------------------------------------------- */

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

        if (recognitionRef.current) {
            recognitionRef.current.stop();

            return;
        }

        const recognition =
            new SpeechRecognition();

        recognitionRef.current = recognition;

        const settings =
            getGrowellSettings();

        recognition.lang =
            LANGUAGE_CODES[
                settings.language
            ] || "en-IN";

        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            const transcript =
                event.results[0][0]
                    .transcript;

            setMessage(transcript);

            setTimeout(() => {
                sendMessage(transcript);
            }, 100);
        };

        recognition.onerror = (event) => {
            console.error(
                "VOICE ERROR:",
                event.error
            );

            setIsListening(false);
            recognitionRef.current = null;
        };

        recognition.onend = () => {
            setIsListening(false);
            recognitionRef.current = null;
        };

        recognition.start();
    }

    /* -------------------------------------------------
       SEND MESSAGE
    ------------------------------------------------- */

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

        const cleanMessage =
            userMessage.trim();

        const settings =
            getGrowellSettings();

        appendMessage(
            {
                sender: "user",
                text: cleanMessage
            },
            {
                title:
                    buildTitle(cleanMessage)
            }
        );

        setMessage("");
        setIsTyping(true);

        try {
            const response = await apiRequest(
                "/api/chat",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        message: cleanMessage,

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

            appendMessage({
                sender: "bot",
                text: aiReply
            });

            registerGrowthAction(
                cleanMessage
            );

            notifyGrowthUpdated();

        } catch (error) {
            console.error(
                "CHAT ERROR:",
                error
            );

            appendMessage({
                sender: "bot",
                text:
                    "❌ Unable to reach the GroWell AI server. Start the backend from the project root with `npm start`, then try again."
            });

        } finally {
            setIsTyping(false);
        }
    }

    /* -------------------------------------------------
       RENDER
    ------------------------------------------------- */

    return (
        <div className="chat-container">

            <ConversationSidebar
                conversations={conversations}
                activeId={activeConversationId}
                onNewChat={handleNewChat}
                onSelect={
                    handleSelectConversation
                }
                onDelete={
                    handleDeleteConversation
                }
                open={sidebarOpen}
                onClose={() =>
                    setSidebarOpen(false)
                }
                userName={user?.name}
            />

            <div className="chat-workspace">

                <button
                    type="button"
                    className="chat-history-toggle"
                    onClick={() =>
                        setSidebarOpen(true)
                    }
                    aria-label="Open chat history"
                >
                    <History size={18} />
                </button>

                <CropPreview
                    image={selectedImage}
                    onAnalyze={analyzeCrop}
                    onRemove={removeImage}
                    isAnalyzing={isAnalyzing}
                />

                <MessageList
                    messages={messages}
                    isTyping={isTyping}
                    onSuggestionClick={
                        handleSuggestionClick
                    }
                    messagesEndRef={
                        messagesEndRef
                    }
                />

                <ChatInput
                    message={message}
                    setMessage={setMessage}
                    handleKeyDown={handleKeyDown}
                    sendMessage={sendMessage}
                    startVoiceInput={
                        startVoiceInput
                    }
                    isListening={isListening}
                    openImagePicker={
                        openImagePicker
                    }
                    handleImageUpload={
                        handleImageUpload
                    }
                    fileInputRef={fileInputRef}
                    onOpenJourney={() => {
                        if (setActivePage) {
                            setActivePage("Journey");
                        }
                    }}
                />

            </div>
        </div>
    );
}

export default Chat;