
import { apiRequest } from "./api";

export async function translateText(text, targetLanguage) {

    if (!text || targetLanguage === "en") {
        return text;
    }

    try {

        const response = await apiRequest(
            "/api/translate",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    text,
                    targetLanguage
                })
            }
        );

        if (!response.ok) {
            throw new Error(
                `Translation request failed: ${response.status}`
            );
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(
                data.message || "Translation failed"
            );
        }

        return data.translation || text;

    } catch (error) {

        console.error(
            "GroWell translation error:",
            error
        );

        return text;
    }
}

