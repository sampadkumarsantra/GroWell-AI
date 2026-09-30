const PRIMARY_BASE_URL = (
    import.meta.env.VITE_API_URL || ""
).replace(/\/+$/, "");

const FALLBACK_BASES = [
    "http://localhost:3000",
    "http://localhost:5000"
];

export const API_BASE_URL =
    PRIMARY_BASE_URL || FALLBACK_BASES[0];

export default API_BASE_URL;

function normalizePath(path) {
    return path.startsWith("/") ? path : `/${path}`;
}

export function apiUrl(path) {
    return `${API_BASE_URL}${normalizePath(path)}`;
}

export function getToken() {
    return localStorage.getItem("growell_token");
}

/*
 * Every call carries the session token. The server reads the plan
 * from this identity to decide what the farmer is allowed to do, so
 * a request without it is treated as anonymous and gets free-tier
 * limits only.
 */
function withAuth(options = {}) {
    const token = getToken();

    if (!token) {
        return options;
    }

    return {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${token}`
        }
    };
}

export async function apiRequest(path, options = {}) {
    const target = normalizePath(path);
    const authorized = withAuth(options);

    const candidates = [];

    if (PRIMARY_BASE_URL) {
        candidates.push(PRIMARY_BASE_URL);
    }

    // In production the SPA and API are served from the same origin,
    // so relative requests work on any device (no localhost needed).
    if (import.meta.env.PROD && !PRIMARY_BASE_URL) {
        candidates.push("");
    }

    for (const base of FALLBACK_BASES) {
        if (!candidates.includes(base)) {
            candidates.push(base);
        }
    }

    let lastError = null;

    for (const base of candidates) {
        try {
            const response = await fetch(
                `${base}${target}`,
                authorized
            );
            return response;
        } catch (error) {
            lastError = error;
        }
    }

    throw (
        lastError ||
        new Error("GroWell AI server could not be reached.")
    );
}

/**
 * Reads a JSON body and, when the server reports a paid-only
 * feature or an exhausted quota, returns the payload instead of
 * throwing so the UI can open the upgrade sheet.
 */
export async function readJson(response) {
    try {
        return await response.json();
    } catch {
        return {};
    }
}
