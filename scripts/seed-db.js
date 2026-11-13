
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/speed_maths_mastery';

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function seed() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected!');

        // Define a simple schema to insert data
        const CategorySchema = new mongoose.Schema({
            title: String,
            description: String,
            difficulty: String,
            color: String,
            created_at: { type: Date, default: Date.now },
            updated_at: { type: Date, default: Date.now }
        });

        // Models
        const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

        // Initial Data
        const categories = [
            {
                title: "Addition & Subtraction",
                description: "Master quick mental addition and subtraction techniques",
                difficulty: "Beginner",
                color: "bg-green-500",
            },
            {
                title: "Multiplication",
                description: "Learn efficient multiplication shortcuts",
                difficulty: "Intermediate",
                color: "bg-blue-500",
            }
        ];

        console.log('Seeding categories...');
        for (const cat of categories) {
            await Category.findOneAndUpdate(
                { title: cat.title },
                cat,
                { upsert: true, new: true }
            );
        }

        console.log('Seeding completed successfully!');
        console.log('Database "speed_maths_mastery" should now be visible in Compass.');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected');
    }
}

seed();
