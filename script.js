const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  addMessage("You", message);
  input.value = "";

  addMessage("Bot", "Typing...");

  try {
    const res = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await res.json();

    chatBox.lastChild.textContent = "Bot: " + data.reply;

  } catch (err) {
    chatBox.lastChild.textContent = "Bot: Error connecting to server.";
  }
}

function addMessage(sender, text) {
  const div = document.createElement("div");
  div.textContent = sender + ": " + text;
  chatBox.appendChild(div);
}
