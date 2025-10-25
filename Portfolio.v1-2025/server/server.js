import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

const __dirname = path.resolve();
const messagesFile = path.join(__dirname, "messages.json");

function readMessages() {
  if (!fs.existsSync(messagesFile)) return [];
  const data = fs.readFileSync(messagesFile, "utf8");
  return data ? JSON.parse(data) : [];
}

// Helper to save messages
function saveMessages(messages) {
  fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
}

// Contact API
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please fill in all required fields." });
  }

  const messages = readMessages();

  const newMessage = {
    id: Date.now(),
    name,
    email,
    subject,
    message,
    date: new Date().toLocaleString(),
  };

  messages.push(newMessage);
  saveMessages(messages);

  console.log("📩 New message saved:", newMessage);
  res.status(200).json({ success: true, message: "Message saved successfully!" });
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
