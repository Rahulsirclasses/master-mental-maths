
import { User } from "../models/index";
import mongoose from "mongoose";
import connectToDatabase from "../lib/db";

async function checkUser() {
    await connectToDatabase();
    const user = await User.findOne({ email: "testsignup@example.com" });
    if (user) {
        console.log("User found:", user);
        console.log("Provider:", user.provider);
        await User.deleteOne({ email: "testsignup@example.com" }); // Cleanup
    } else {
        console.log("User NOT found.");
    }
    process.exit(0);
}

checkUser().catch(console.error);
