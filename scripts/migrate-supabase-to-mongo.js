const { createClient } = require('@supabase/supabase-js');
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Supabase config
// YOU MUST PROVIDE THESE TWO FROM YOUR SUPABASE DASHBOARD -> SETTINGS -> API
// Set them in the terminal before running, or paste them temporarily below:
const SUPABASE_URL = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL_HERE';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'YOUR_SUPABASE_SERVICE_KEY_HERE';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// MongoDB config
const MONGODB_URI = process.env.MONGODB_URI;

// Define Schemas that match the imported data structure
const categorySchema = new mongoose.Schema({}, { strict: false });
const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

const questionSchema = new mongoose.Schema({}, { strict: false });
const Question = mongoose.models.Question || mongoose.model('Question', questionSchema);

const flashcardSetSchema = new mongoose.Schema({}, { strict: false });
const FlashcardSet = mongoose.models.FlashcardSet || mongoose.model('FlashcardSet', flashcardSetSchema);

const flashcardSchema = new mongoose.Schema({}, { strict: false });
const Flashcard = mongoose.models.Flashcard || mongoose.model('Flashcard', flashcardSchema);

const quoteSchema = new mongoose.Schema({}, { strict: false });
const Quote = mongoose.models.MotivationalQuote || mongoose.model('MotivationalQuote', quoteSchema);

const tipSchema = new mongoose.Schema({}, { strict: false });
const Tip = mongoose.models.DailyTip || mongoose.model('DailyTip', tipSchema);

const userSchema = new mongoose.Schema({}, { strict: false });
const User = mongoose.models.User || mongoose.model('User', userSchema);

async function migrateData() {
    console.log('Starting migration...');

    if (!MONGODB_URI) {
        console.error('❌ MONGODB_URI is missing from .env.local');
        process.exit(1);
    }

    if (SUPABASE_URL.includes('YOUR_SUPABASE') || SUPABASE_SERVICE_KEY.includes('YOUR_SUPABASE')) {
        console.error('❌ You must insert your Supabase URL and Service Role Key at the top of this script.');
        process.exit(1);
    }

    try {
        // 1. Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // 2. Helper function to migrate a table to a collection
        async function migrateTable(tableName, Model, name) {
            console.log(`\nFetching ${name} from Supabase...`);
            const { data, error } = await supabase.from(tableName).select('*');

            if (error) {
                console.error(`❌ Error fetching ${tableName}:`, error.message);
                return;
            }

            if (!data || data.length === 0) {
                console.log(`⚠️ No data found in ${tableName}`);
                return;
            }

            console.log(`✅ Found ${data.length} records. Inserting into MongoDB...`);

            let insertedCount = 0;
            for (const item of data) {
                // Create a new record copying all fields. 
                // Note: We don't force _id = id because Supabase uses UUIDs (strings) and Mongo uses ObjectIds by default.
                // But we will save the original supabase "id" field just in case.
                try {
                    // check if exists first (optional but safer)
                    const exists = await Model.findOne({ id: item.id });
                    if (!exists) {
                        await Model.create(item);
                        insertedCount++;
                    }
                } catch (err) {
                    console.error(`Error inserting item ${item.id}:`, err.message);
                }
            }

            console.log(`✅ Migrated ${insertedCount} new ${name}`);
        }

        // 3. Migrate all tables
        await migrateTable('categories', Category, 'Categories');
        await migrateTable('questions', Question, 'Questions');
        await migrateTable('flashcard_sets', FlashcardSet, 'Flashcard Sets');
        await migrateTable('flashcards', Flashcard, 'Flashcards');
        await migrateTable('motivational_quotes', Quote, 'Motivational Quotes');
        await migrateTable('daily_tips', Tip, 'Daily Tips');
        await migrateTable('users', User, 'Users');

        console.log('\n🎉 MIGRATION COMPLETE!');

    } catch (err) {
        console.error('❌ Migration failed:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
    }
}

migrateData();
