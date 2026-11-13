-- Create comprehensive database schema for Speed Maths Admin Panel

-- Categories table (for practice categories)
CREATE TABLE IF NOT EXISTS categories (
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

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL REFERENCES categories(id),
  question TEXT NOT NULL,
  answer DECIMAL NOT NULL,
  difficulty_level INTEGER NOT NULL CHECK (difficulty_level >= 1 AND difficulty_level <= 5),
  hint TEXT,
  explanation TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Flashcard sets table
CREATE TABLE IF NOT EXISTS flashcard_sets (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Flashcards table
CREATE TABLE IF NOT EXISTS flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  set_id TEXT NOT NULL REFERENCES flashcard_sets(id) ON DELETE CASCADE,
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  order_index INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Learning categories table
CREATE TABLE IF NOT EXISTS learning_categories (
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

-- Learning concepts table
CREATE TABLE IF NOT EXISTS learning_concepts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id TEXT NOT NULL REFERENCES learning_categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  time TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  practice_exercises JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Motivational quotes table
CREATE TABLE IF NOT EXISTS motivational_quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Daily tips table
CREATE TABLE IF NOT EXISTS daily_tips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tip TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category);
CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_questions_tags ON questions USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_flashcards_set_id ON flashcards(set_id);
CREATE INDEX IF NOT EXISTS idx_flashcards_order ON flashcards(set_id, order_index);
CREATE INDEX IF NOT EXISTS idx_learning_concepts_category ON learning_concepts(category_id);
CREATE INDEX IF NOT EXISTS idx_motivational_quotes_active ON motivational_quotes(is_active);
CREATE INDEX IF NOT EXISTS idx_daily_tips_active ON daily_tips(is_active);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_questions_updated_at ON questions;
CREATE TRIGGER update_questions_updated_at
    BEFORE UPDATE ON questions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_flashcard_sets_updated_at ON flashcard_sets;
CREATE TRIGGER update_flashcard_sets_updated_at
    BEFORE UPDATE ON flashcard_sets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_flashcards_updated_at ON flashcards;
CREATE TRIGGER update_flashcards_updated_at
    BEFORE UPDATE ON flashcards
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_learning_categories_updated_at ON learning_categories;
CREATE TRIGGER update_learning_categories_updated_at
    BEFORE UPDATE ON learning_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_learning_concepts_updated_at ON learning_concepts;
CREATE TRIGGER update_learning_concepts_updated_at
    BEFORE UPDATE ON learning_concepts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_motivational_quotes_updated_at ON motivational_quotes;
CREATE TRIGGER update_motivational_quotes_updated_at
    BEFORE UPDATE ON motivational_quotes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_daily_tips_updated_at ON daily_tips;
CREATE TRIGGER update_daily_tips_updated_at
    BEFORE UPDATE ON daily_tips
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcard_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE motivational_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_tips ENABLE ROW LEVEL SECURITY;

-- Create policies for all tables (allow all operations for everyone - suitable for demo)
CREATE POLICY "Categories are accessible by everyone" ON categories FOR ALL USING (true);
CREATE POLICY "Questions are accessible by everyone" ON questions FOR ALL USING (true);
CREATE POLICY "Flashcard sets are accessible by everyone" ON flashcard_sets FOR ALL USING (true);
CREATE POLICY "Flashcards are accessible by everyone" ON flashcards FOR ALL USING (true);
CREATE POLICY "Learning categories are accessible by everyone" ON learning_categories FOR ALL USING (true);
CREATE POLICY "Learning concepts are accessible by everyone" ON learning_concepts FOR ALL USING (true);
CREATE POLICY "Motivational quotes are accessible by everyone" ON motivational_quotes FOR ALL USING (true);
CREATE POLICY "Daily tips are accessible by everyone" ON daily_tips FOR ALL USING (true);
