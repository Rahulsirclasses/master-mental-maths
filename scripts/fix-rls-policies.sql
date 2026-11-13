-- Fix RLS policies for questions table
DROP POLICY IF EXISTS "Questions are viewable by everyone" ON questions;
DROP POLICY IF EXISTS "Authenticated users can manage questions" ON questions;

-- Create permissive policy that allows all operations
CREATE POLICY "Questions are accessible by everyone" ON questions
  FOR ALL USING (true);

-- Also ensure categories table has proper policies
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON categories;
DROP POLICY IF EXISTS "Authenticated users can manage categories" ON categories;

CREATE POLICY "Categories are accessible by everyone" ON categories
  FOR ALL USING (true);
