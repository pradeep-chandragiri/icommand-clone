import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    photo: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
})

const userModel = mongoose.model.user || mongoose.model("user", userSchema)

export default userModel