/* =====================================================
   GROWELL — CONVERSATION SIDEBAR
   ChatGPT-style recent-chats panel (light editorial)
   ===================================================== */

import {
    Plus,
    MessageSquare,
    Trash2,
    PanelLeftClose
} from "lucide-react";

import {
    formatConversationTime
} from "../../services/conversationStore";


function ConversationSidebar({
    conversations,
    activeId,
    onNewChat,
    onSelect,
    onDelete,
    open,
    onClose,
    userName
}) {

    const sorted = [...conversations].sort(
        (a, b) =>
            new Date(b.updatedAt) -
            new Date(a.updatedAt)
    );

    return (
        <aside
            className={
                `chat-sidebar${
                    open ? " open" : ""
                }`
            }
        >
            {/* ---- HEADER ---- */}

            <div className="chat-sidebar-header">
                <button
                    type="button"
                    className="new-chat-btn"
                    onClick={onNewChat}
                >
                    <Plus size={18} />
                    <span>New chat</span>
                </button>

                <button
                    type="button"
                    className="sidebar-close-btn"
                    onClick={onClose}
                    aria-label="Close history"
                >
                    <PanelLeftClose size={18} />
                </button>
            </div>


            {/* ---- LABEL ---- */}

            {sorted.length > 0 && (
                <div className="chat-sidebar-label">
                    Recent conversations
                </div>
            )}


            {/* ---- LIST ---- */}

            <div className="chat-conversation-list">
                {sorted.map((conversation) => (
                    <div
                        key={conversation.id}
                        className={
                            "chat-conv-item" +
                            (conversation.id === activeId
                                ? " active"
                                : "")
                        }
                        onClick={() =>
                            onSelect(conversation.id)
                        }
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                            if (
                                event.key === "Enter" ||
                                event.key === " "
                            ) {
                                onSelect(
                                    conversation.id
                                );
                            }
                        }}
                    >
                        <MessageSquare
                            size={16}
                            className="chat-conv-icon"
                        />

                        <div className="chat-conv-body">
                            <div className="chat-conv-title">
                                {conversation.title}
                            </div>

                            <div className="chat-conv-meta">
                                {
                                    conversation
                                        .messages
                                        .length
                                }{" "}
                                messages
                                {" · "}
                                {
                                    formatConversationTime(
                                        conversation.updatedAt
                                    )
                                }
                            </div>
                        </div>

                        <button
                            type="button"
                            className="chat-conv-delete"
                            title="Delete conversation"
                            onClick={(event) => {
                                event.stopPropagation();
                                onDelete(
                                    conversation.id
                                );
                            }}
                        >
                            <Trash2 size={15} />
                        </button>
                    </div>
                ))}
            </div>


            {/* ---- FOOTER ---- */}

            <div className="chat-sidebar-footer">
                {userName && (
                    <div className="chat-sidebar-user">
                        👨‍🌾 {userName}
                    </div>
                )}
                Conversations are saved on this device.
            </div>
        </aside>
    );
}

export default ConversationSidebar;