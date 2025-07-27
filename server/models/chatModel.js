import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    role: { type: String, required: true },
    content: { type: String, required: true },
});

const chatSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Clerk user ID
    title: { type: String, default: "New Chat" },
    messages: [messageSchema],
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Chat", chatSchema);