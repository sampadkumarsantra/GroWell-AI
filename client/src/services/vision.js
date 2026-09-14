const API_BASE =
    import.meta.env.VITE_API_URL || "";

async function analyzeCropImage(file) {

    const formData = new FormData();

    formData.append("image", file);

    const response = await fetch(
        `${API_BASE}/api/diagnose`,
        {
            method: "POST",
            body: formData
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Crop diagnosis failed"
        );
    }

    return data;
}

export default analyzeCropImage;
