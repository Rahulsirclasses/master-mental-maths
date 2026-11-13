
import { POST } from "../app/api/auth/signup/route";
import { User } from "../models/index";
import mongoose from "mongoose";
import connectToDatabase from "../lib/db";

async function verifySignup() {
    await connectToDatabase();

    // Clean up previous test user if exists
    await User.deleteOne({ email: "testsignup@example.com" });

    const mockRequest = {
        json: async () => ({
            name: "Test Signup",
            email: "testsignup@example.com",
            password: "password123"
        })
    } as unknown as Request;

    const response = await POST(mockRequest);
    const status = response.status;
    const body = await response.json();

    console.log("Signup Response Status:", status);
    console.log("Signup Response Body:", body);

    if (status === 201 && body.success) {
        // Verify user was created in DB
        const user = await User.findOne({ email: "testsignup@example.com" });
        if (user && user.provider === "credentials") {
            console.log("SUCCESS: User created correctly in MongoDB.");
        } else {
            console.error("FAILURE: User not found or incorrect provider.");
        }
    } else {
        console.error("FAILURE: Signup API returned error.");
    }

    // Clean up
    await User.deleteOne({ email: "testsignup@example.com" });
    process.exit(0);
}

verifySignup().catch(console.error);
