import express from 'express';
import Chat from '../models/chatModel.js';
import verifyClerkToken from '../middleweares/verifyClerkToken.js';

const router = express.Router();

// Save a new chat
router.post("/save", verifyClerkToken, async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid 'messages'" });
  }

  try {
    const newChat = await Chat.create({
      userId: req.userId,
      messages,
    });

    res.status(201).json({ success: true, chat: newChat });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update existing chat
router.patch("/update/:id", verifyClerkToken, async (req, res) => {
  const { id } = req.params;
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid 'messages'" });
  }

  try {
    const updatedChat = await Chat.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { $push: { messages: { $each: messages } } },
      { new: true }
    );

    if (!updatedChat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    res.json({ success: true, chat: updatedChat });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get chat history
router.get("/history", verifyClerkToken, async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ success: true, chats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET chat by ID
router.get("/:id", verifyClerkToken, async (req, res) => {
    try {
        const chat = await Chat.findOne({
        _id: req.params.id,
        userId: req.userId,
        });
        if (!chat) return res.status(404).json({ error: "Chat not found" });
        res.json({ chat });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
