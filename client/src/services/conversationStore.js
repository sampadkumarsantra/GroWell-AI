/* =====================================================
   GROWELL — CONVERSATION STORAGE
   ChatGPT-style persistent chat history (localStorage)
   ===================================================== */

const STORAGE_KEY = "growell_conversations_v1";

function generateId() {
    if (
        typeof crypto !== "undefined" &&
        typeof crypto.randomUUID === "function"
    ) {
        return crypto.randomUUID();
    }

    return `conv-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 10)}`;
}

export function loadConversations() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);

        if (!raw) {
            return [];
        }

        const parsed = JSON.parse(raw);

        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error(
            "CONVERSATION LOAD ERROR:",
            error
        );
        return [];
    }
}

export function saveConversations(conversations) {
    try {
        /* Only persist conversations that contain messages.
           An empty "new chat" vanishes on reload. */
        const nonEmpty = conversations.filter(
            (conversation) =>
                conversation.messages.length > 0
        );

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(nonEmpty)
        );
    } catch (error) {
        console.error(
            "CONVERSATION SAVE ERROR:",
            error
        );
    }
}

export function createConversation() {
    return {
        id: generateId(),
        title: "New chat",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: []
    };
}

export function buildTitle(text, max = 42) {
    const clean = (text || "")
        .trim()
        .replace(/\s+/g, " ");

    if (!clean) {
        return "New chat";
    }

    if (clean.length <= max) {
        return clean;
    }

    return `${clean.slice(0, max).trim()}…`;
}

export function formatConversationTime(iso) {
    try {
        const date = new Date(iso);
        const now = new Date();

        const isToday =
            date.toDateString() === now.toDateString();

        if (isToday) {
            return date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            });
        }

        return date.toLocaleDateString([], {
            day: "numeric",
            month: "short"
        });
    } catch {
        return "";
    }
}