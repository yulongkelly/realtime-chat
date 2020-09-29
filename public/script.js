//client-side javascript
const socket = io("http://localhost:3000");
const messageContainer = document.getElementById("message");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("input");

const name = prompt("What is your name?");
appendMessage("You joined");
socket.emit("send-user", name);

socket.on("user-connection", (user) => {
  appendMessage(`${user} joined`);
});

socket.on("chat-message", (data) => {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on("user-disconnection", (user) => {
  appendMessage(`${user} leaves`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
