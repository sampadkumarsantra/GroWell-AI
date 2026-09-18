import { apiRequest } from "./api";

async function analyzeCropImage(file) {

    const formData = new FormData();

    formData.append("image", file);

    const response = await apiRequest(
        "/api/diagnose",
        {
            method: "POST",
            body: formData
        }
    );

    const data = await response.json();

    if (!response.ok) {
        const requestError = new Error(
            data.message || "Crop diagnosis failed"
        );
        requestError.status = response.status;
        throw requestError;
    }

    return data;
}

export default analyzeCropImage;