
import { adaptUser } from "../lib/adapters/userAdapter";
import mongoose from "mongoose";

const mockUser = {
    _id: new mongoose.Types.ObjectId(),
    name: "Test User",
    email: "test@example.com",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    extraField: "should be ignored",
    password: "hashedpassword"
};

console.log("Mock User:", mockUser);

const adapted = adaptUser(mockUser);

console.log("Adapted User:", adapted);

if (!adapted) {
    throw new Error("Adapter returned null");
}

if (adapted.id && typeof adapted.id === 'string' && !('password' in adapted) && !('_id' in adapted)) {
    console.log("SUCCESS: Adapter works correctly.");
} else {
    console.error("FAILURE: Adapter failed checks.");
    if (!adapted.id) console.error("Missing id");
    if ('_id' in adapted) console.error("Exposed _id");
    // Password check is not strictly required by user prompts but good practice. 
    // Wait, the user prompt didn't say "remove password", just "ensure expected frontend fields". 
    // But typically we don't want password.
    // The adapter explicitly picks fields, so password should be gone.
}
