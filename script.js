const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Connect to WebSocket server
const socket = new WebSocket('wss://echo.websocket.org');

// Display incoming messages
socket.onmessage = (event) => {
  const messageElement = document.createElement('p');
  messageElement.textContent = event.data;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
};

// Send message
sendBtn.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message) {
    socket.send(message);
    messageInput.value = '';
  }
});

// Handle connection errors
socket.onerror = (error) => {
  console.error('WebSocket error:', error);
  const errorElement = document.createElement('p');
  errorElement.textContent = "Connection error. Please try again.";
  chatBox.appendChild(errorElement);
};

