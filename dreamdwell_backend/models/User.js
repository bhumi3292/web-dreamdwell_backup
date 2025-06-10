const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: String,
    email: { type: String, unique: true },
    phoneNumber: String,
    role: { type: String, enum: ["Landlord", "Tenant"], required: true },
    password: String,
    profilePicture: String
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
