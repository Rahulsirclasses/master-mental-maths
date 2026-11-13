
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/speed_maths_mastery';

async function verify() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected!');

        // Define schema to read data
        const CategorySchema = new mongoose.Schema({
            title: String
        });
        const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

        const count = await Category.countDocuments();
        console.log(`Found ${count} categories.`);

        if (count > 0) {
            const cats = await Category.find({});
            console.log('Categories:', cats.map(c => c.title));
        } else {
            console.log('No categories found. Seed might have failed.');
        }

    } catch (error) {
        console.error('Error verifying database:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected');
    }
}

verify();
