
const mongoose = require("mongoose");
const { User } = require("../models/index"); // This might fail if models/index is TS. 
// Ah, models/index.ts is TS. I cannot import it in JS directly without compilation.
// I will redefine the schema in the JS script for verification purposes.

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/speed_maths_mastery";

async function checkUser() {
    await mongoose.connect(MONGODB_URI);

    // Define minimal schema matching the one in models/index.ts
    const UserSchema = new mongoose.Schema({
        email: { type: String, required: true, unique: true },
        password: { type: String },
        name: { type: String },
        role: { type: String, default: "user" },
        provider: { type: String, default: "credentials" },
    });

    // Use existing model if already compiled (unlikely in standalone script) or compile it
    const User = mongoose.models.User || mongoose.model("User", UserSchema);

    const user = await User.findOne({ email: "testsignup@example.com" });
    if (user) {
        console.log("User found:", user);
        console.log("Provider:", user.provider);
        await User.deleteOne({ email: "testsignup@example.com" }); // Cleanup
    } else {
        console.log("User NOT found.");
    }
    await mongoose.disconnect();
    process.exit(0);
}

checkUser().catch(console.error);
