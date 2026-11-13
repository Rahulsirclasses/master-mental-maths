-- Drop existing table if it exists to recreate with proper schema
DROP TABLE IF EXISTS questions CASCADE;

-- Create questions table with all required columns including tags array
CREATE TABLE questions (
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

-- Create indexes for better performance
CREATE INDEX idx_questions_category ON questions(category);
CREATE INDEX idx_questions_difficulty ON questions(difficulty_level);
CREATE INDEX idx_questions_tags ON questions USING GIN(tags);
CREATE INDEX idx_questions_created_at ON questions(created_at);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_questions_updated_at ON questions;
CREATE TRIGGER update_questions_updated_at
    BEFORE UPDATE ON questions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- Create policy for questions (allow all operations for everyone)
-- This is suitable for a demo/development environment
CREATE POLICY "Questions are accessible by everyone" ON questions
  FOR ALL USING (true);

-- Alternative: If you want to restrict to authenticated users only, use this instead:
-- CREATE POLICY "Questions are viewable by everyone" ON questions
--   FOR SELECT USING (true);
-- 
-- CREATE POLICY "Authenticated users can manage questions" ON questions
--   FOR ALL USING (auth.uid() IS NOT NULL);
