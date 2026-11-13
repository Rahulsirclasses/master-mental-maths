-- Create categories table with all required columns
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create policy for categories (allow all operations for everyone)
CREATE POLICY "Categories are accessible by everyone" ON categories
  FOR ALL USING (true);

-- Insert all categories
INSERT INTO categories (id, name, description, icon, color) VALUES
  ('addition', 'Addition', 'Basic addition problems and mental math techniques', '➕', 'bg-green-500'),
  ('subtraction', 'Subtraction', 'Subtraction problems and mental calculation strategies', '➖', 'bg-red-500'),
  ('multiplication', 'Multiplication', 'Multiplication tables and advanced multiplication', '✖️', 'bg-blue-500'),
  ('division', 'Division', 'Division problems and mental division techniques', '➗', 'bg-purple-500'),
  ('mixed', 'Mixed Operations', 'Combined arithmetic operations with order of operations', '🔢', 'bg-orange-500'),
  ('fractions', 'Fractions', 'Fraction calculations, addition, subtraction, multiplication, division', '½', 'bg-pink-500'),
  ('decimals', 'Decimals', 'Decimal number operations and conversions', '0.5', 'bg-cyan-500'),
  ('percentages', 'Percentages', 'Percentage calculations and real-world applications', '%', 'bg-yellow-500'),
  ('close-100', 'Close to 100', 'Strategic number game to get as close to 100 as possible', '🎯', 'bg-indigo-500'),
  ('table', 'Multiplication Tables', 'Multiplication table drills and memorization', '📊', 'bg-teal-500'),
  ('mental-tricks', 'Mental Math Tricks', 'Advanced mental calculation techniques and shortcuts', '🧠', 'bg-violet-500'),
  ('word-problems', 'Word Problems', 'Real-world math problems requiring multiple steps', '📝', 'bg-emerald-500'),
  ('algebra-basics', 'Basic Algebra', 'Simple algebraic expressions and equations', '🔤', 'bg-rose-500'),
  ('geometry-basics', 'Basic Geometry', 'Area, perimeter, and basic geometric calculations', '📐', 'bg-amber-500'),
  ('time-money', 'Time & Money', 'Time calculations and money problems', '💰', 'bg-lime-500'),
  ('squares', 'Squares up to 300', 'Perfect squares and square calculations up to 300', '²', 'bg-slate-500'),
  ('cubes', 'Cubes & Cube Roots', 'Perfect cubes and cube root calculations', '³', 'bg-stone-500'),
  ('multiplication-close-100', 'Multiplication Close to 100', 'Multiplication tricks for numbers close to 100', '💯', 'bg-zinc-500'),
  ('increase-decrease', 'Increase/Decrease', 'Percentage increase and decrease calculations', '📈', 'bg-neutral-500'),
  ('successive-percentage', 'Successive % Change', 'Multiple percentage changes in sequence', '🔄', 'bg-gray-500'),
  ('reverse-change', 'Reverse Change', 'Working backwards from percentage changes', '↩️', 'bg-red-600'),
  ('5x5-table', '5x5 Table Drill', 'Advanced multiplication table practice', '🎯', 'bg-blue-600')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color;
