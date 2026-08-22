import {
    Mic,
    Camera,
    SendHorizontal
} from "lucide-react";

function ChatInput({
    message,
    setMessage,
    handleKeyDown,
    sendMessage,
    startVoiceInput,
    openImagePicker,
    handleImageUpload,
    fileInputRef
}) {
    return (

        <div className="chat-input">

            <input
                type="text"
                value={message}
                placeholder="Ask anything about your farm..."
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            <button
                title="Voice Input"
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

    );
}

export default ChatInput;