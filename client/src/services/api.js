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

export async function apiRequest(path, options = {}) {
    const target = normalizePath(path);

    const candidates = [];

    if (PRIMARY_BASE_URL) {
        candidates.push(PRIMARY_BASE_URL);
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
                options
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