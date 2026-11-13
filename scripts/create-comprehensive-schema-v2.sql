-- Create comprehensive schema for Speed Maths Admin Panel
-- This script creates all necessary tables with proper constraints

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (in correct order to handle dependencies)
DROP TABLE IF EXISTS learning_concepts CASCADE;
DROP TABLE IF EXISTS learning_categories CASCADE;
DROP TABLE IF EXISTS flashcards CASCADE;
DROP TABLE IF EXISTS flashcard_sets CASCADE;
DROP TABLE IF EXISTS daily_tips CASCADE;
DROP TABLE IF EXISTS motivational_quotes CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- Create categories table (practice categories)
CREATE TABLE categories (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT,
    difficulty TEXT NOT NULL,
    time_estimate TEXT,
    color TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create questions table
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer NUMERIC NOT NULL,
    difficulty_level INTEGER NOT NULL DEFAULT 1 CHECK (difficulty_level >= 1 AND difficulty_level <= 5),
    hint TEXT,
    explanation TEXT,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create flashcard_sets table
CREATE TABLE flashcard_sets (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create flashcards table
CREATE TABLE flashcards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    set_id TEXT NOT NULL REFERENCES flashcard_sets(id) ON DELETE CASCADE,
    front TEXT NOT NULL,
    back TEXT NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create learning_categories table
CREATE TABLE learning_categories (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    color TEXT NOT NULL,
    icon TEXT,
    gradient TEXT,
    border TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create learning_concepts table
CREATE TABLE learning_concepts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id TEXT NOT NULL REFERENCES learning_categories(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    time TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    practice_exercises JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create motivational_quotes table
CREATE TABLE motivational_quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote TEXT NOT NULL,
    author TEXT NOT NULL DEFAULT 'Rahul Sir',
    category TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create daily_tips table
CREATE TABLE daily_tips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tip TEXT NOT NULL,
    category TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_questions_category ON questions(category);
CREATE INDEX idx_questions_difficulty ON questions(difficulty_level);
CREATE INDEX idx_flashcards_set_id ON flashcards(set_id);
CREATE INDEX idx_flashcards_order ON flashcards(set_id, order_index);
CREATE INDEX idx_learning_concepts_category ON learning_concepts(category_id);
CREATE INDEX idx_motivational_quotes_active ON motivational_quotes(is_active);
CREATE INDEX idx_daily_tips_active ON daily_tips(is_active);

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcard_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE motivational_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_tips ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed for your security requirements)
CREATE POLICY "Categories are accessible by everyone" ON categories FOR ALL USING (true);
CREATE POLICY "Questions are accessible by everyone" ON questions FOR ALL USING (true);
CREATE POLICY "Flashcard sets are accessible by everyone" ON flashcard_sets FOR ALL USING (true);
CREATE POLICY "Flashcards are accessible by everyone" ON flashcards FOR ALL USING (true);
CREATE POLICY "Learning categories are accessible by everyone" ON learning_categories FOR ALL USING (true);
CREATE POLICY "Learning concepts are accessible by everyone" ON learning_concepts FOR ALL USING (true);
CREATE POLICY "Motivational quotes are accessible by everyone" ON motivational_quotes FOR ALL USING (true);
CREATE POLICY "Daily tips are accessible by everyone" ON daily_tips FOR ALL USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_questions_updated_at BEFORE UPDATE ON questions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_flashcard_sets_updated_at BEFORE UPDATE ON flashcard_sets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_flashcards_updated_at BEFORE UPDATE ON flashcards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_learning_categories_updated_at BEFORE UPDATE ON learning_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_learning_concepts_updated_at BEFORE UPDATE ON learning_concepts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_motivational_quotes_updated_at BEFORE UPDATE ON motivational_quotes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_daily_tips_updated_at BEFORE UPDATE ON daily_tips FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
