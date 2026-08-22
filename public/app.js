async function sendMessage() {

    const input = document.getElementById("userInput");
    const messages = document.getElementById("messages");

    const text = input.value.trim();

    if (!text) return;

    messages.innerHTML += `
        <div class="user">
            👨‍🌾 ${text}
        </div>
    `;

    input.value = "";

    try {

        const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        message: text
    })
});

console.log("HTTP Status:", response.status);

const data = await response.json();

console.log(data);

        messages.innerHTML += `
            <div class="bot">
                🌱 ${data.reply}
            </div>
        `;

    } catch (error) {

        messages.innerHTML += `
            <div class="bot">
                ❌ Unable to contact GroWell AI server.
            </div>
        `;

        console.error(error);

    }

    messages.scrollTop = messages.scrollHeight;

}