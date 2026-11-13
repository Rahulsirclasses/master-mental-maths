-- Fix RLS policies for categories table
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Categories are viewable by everyone" ON categories;
DROP POLICY IF EXISTS "Authenticated users can manage categories" ON categories;

CREATE POLICY "Categories are accessible by everyone" ON categories
  FOR ALL USING (true);
