
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env.local") });

// Minimal Schema Definition for Script (to avoid module loading issues)
const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        role: { type: String, enum: ["user", "admin"], default: "user" },
        status: { type: String, enum: ["pending", "approved", "disabled"], default: "pending" },
    },
    { strict: false } // Allow other fields
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("MONGODB_URI is not defined in .env.local");
    process.exit(1);
}

async function setAdmin(email) {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        const user = await User.findOne({ email });

        if (!user) {
            console.error(`User with email ${email} not found`);
            process.exit(1);
        }

        user.role = "admin";
        user.status = "approved";
        await user.save();

        console.log(`SUCCESS: User ${email} has been promoted to ADMIN and APPROVED.`);
    } catch (error) {
        console.error("Error setting admin:", error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

const email = process.argv[2];

if (!email) {
    console.error("Please provide an email address as an argument.");
    console.log("Usage: node scripts/set-admin.js <email>");
    process.exit(1);
}

setAdmin(email);
