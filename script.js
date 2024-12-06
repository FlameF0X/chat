const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message");

function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.textContent = `You: ${message}`;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
        messageInput.value = '';

        // Send message to the backend via Localtunnel URL
        fetch('https://abc123.loca.lt/chat', {  // Replace with your actual Localtunnel URL
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            const replyElement = document.createElement("div");
            replyElement.classList.add("message");
            replyElement.textContent = `Bot: ${data.reply}`;
            chatBox.appendChild(replyElement);
            chatBox.scrollTop = chatBox.scrollHeight;
        });
    }
}
