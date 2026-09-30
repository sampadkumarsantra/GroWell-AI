import {
    Mic,
    Camera,
    SendHorizontal,
    Flower2,
    Brain,
    Lock
} from "lucide-react";

function ChatInput({
    message,
    setMessage,
    handleKeyDown,
    sendMessage,
    startVoiceInput,
    isListening,
    openImagePicker,
    handleImageUpload,
    fileInputRef,
    onOpenJourney,
    isPremium,
    deepMode,
    onToggleDeep,
    onUpgrade
}) {
    return (

        <div className="input-wrapper">

        <div className="chat-input">

            <button
                type="button"
                className="journey-input-btn"
                title="My Growth Journey"
                aria-label="Open my growth journey"
                onClick={onOpenJourney}
            >
                <Flower2 size={20} />
            </button>

            <input
                type="text"
                value={message}
                placeholder="Ask anything about your farm..."
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            <button
                type="button"
                title={
                    isPremium
                        ? "Deep Reasoning — works out what you actually need before answering"
                        : "Deep Reasoning — Premium feature"
                }
                aria-pressed={isPremium ? deepMode : false}
                className={
                    isPremium && deepMode
                        ? "deep-active"
                        : isPremium
                        ? ""
                        : "deep-locked"
                }
                onClick={() => {
                    if (isPremium) {
                        onToggleDeep();
                    } else {
                        onUpgrade();
                    }
                }}
            >
                {isPremium ? (
                    <Brain size={20} />
                ) : (
                    <Lock size={17} />
                )}
            </button>

            <button
                title={
                    isListening
                        ? "Stop Voice Input"
                        : "Voice Input"
                }
                className={
                    isListening
                        ? "mic-active"
                        : ""
                }
                onClick={startVoiceInput}
            >
                <Mic size={20} />
            </button>

            <button
                title="Upload Crop Image"
                onClick={openImagePicker}
            >
                <Camera size={20} />
            </button>

            <input
                type="file"
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={handleImageUpload}
            />

            <button
                title="Send"
                onClick={() => sendMessage()}
            >
                <SendHorizontal size={20} />
            </button>

        </div>

        {isPremium && (
            <p className="deep-status">
                {deepMode
                    ? "Deep Reasoning is on — the model will plan the problem, check what it does not know, then answer."
                    : "Deep Reasoning is off."}
            </p>
        )}

        </div>

    );
}

export default ChatInput;