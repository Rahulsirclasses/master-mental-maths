
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("MONGODB_URI is not defined");
    process.exit(1);
}

// Define strict schema to ensure fields are recognized
const UserSchema = new mongoose.Schema({
    email: String,
    role: String,
    status: String,
}, { strict: false });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function migrate() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB...");

        const users = await User.find({});
        console.log(`Found ${users.length} users.`);

        for (const user of users) {
            let needsSave = false;

            // Fix missing or invalid status
            if (!user.status) {
                if (user.role === 'admin') {
                    user.status = 'approved';
                    console.log(`Updating admin ${user.email}: Setting status to APPROVED`);
                } else {
                    user.status = 'pending';
                    console.log(`Updating user ${user.email}: Setting status to PENDING`);
                }
                needsSave = true;
            }

            // Fix missing role (default to user)
            if (!user.role) {
                user.role = 'user';
                needsSave = true;
            }

            if (needsSave) {
                await user.save();
                console.log(`Saved updates for ${user.email}`);
            } else {
                console.log(`User ${user.email} is already correct.`);
            }
        }

        console.log("Migration complete.");
    } catch (error) {
        console.error("Migration failed:", error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

migrate();
