-- Seed comprehensive data for Speed Maths Admin Panel

-- Insert practice categories
INSERT INTO categories (id, title, description, icon, difficulty, time_estimate, color) VALUES
  ('add-sub', 'Addition & Subtraction', 'Master quick mental addition and subtraction techniques', '➕', 'Beginner', '5-10 min', 'bg-green-500'),
  ('mult-div', 'Multiplication & Division', 'Learn efficient multiplication and division shortcuts', '✖️', 'Intermediate', '10-15 min', 'bg-blue-500'),
  ('squares', 'Squares up to 300', 'Calculate squares instantly using proven patterns', '²', 'Advanced', '15-20 min', 'bg-purple-500'),
  ('cubes', 'Cubes & Cube Roots', 'Master cube calculations and root finding', '³', 'Expert', '20-25 min', 'bg-red-500'),
  ('close-100', 'Close to 100', 'Strategic number game to get as close to 100 as possible', '🎯', 'Intermediate', '10-15 min', 'bg-indigo-500'),
  ('table', '5×5 Table Drill', 'Advanced table analysis and percentage calculations', '📊', 'Expert', '20-30 min', 'bg-teal-500'),
  ('increase', 'Percentage Increase/Decrease', 'Master percentage calculations and real-world applications', '%', 'Intermediate', '10-15 min', 'bg-yellow-500'),
  ('successive', 'Successive Changes', 'Handle multiple percentage changes in sequence', '🔄', 'Advanced', '15-20 min', 'bg-orange-500'),
  ('reverse', 'Reverse Changes', 'Work backwards from percentage results', '↩️', 'Advanced', '15-20 min', 'bg-pink-500'),
  ('base', 'Base 10/100', 'Multiplication tricks for numbers close to base values', '💯', 'Advanced', '15-20 min', 'bg-cyan-500')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  difficulty = EXCLUDED.difficulty,
  time_estimate = EXCLUDED.time_estimate,
  color = EXCLUDED.color;

-- Insert sample questions
INSERT INTO questions (category, question, answer, difficulty_level, hint, explanation, tags) VALUES
  ('add-sub', '25 + 37 = ?', 62, 1, 'Break it down: 25 + 30 + 7', '25 + 37 = 25 + 30 + 7 = 55 + 7 = 62', ARRAY['addition', 'two-digit']),
  ('add-sub', '84 - 29 = ?', 55, 2, 'Use compensation: 84 - 30 + 1', '84 - 29 = 84 - 30 + 1 = 54 + 1 = 55', ARRAY['subtraction', 'compensation']),
  ('mult-div', '12 × 15 = ?', 180, 2, 'Use distributive property', '12 × 15 = 12 × (10 + 5) = 120 + 60 = 180', ARRAY['multiplication', 'distributive']),
  ('mult-div', '144 ÷ 12 = ?', 12, 1, 'Think of multiplication tables', '144 ÷ 12 = 12 (since 12 × 12 = 144)', ARRAY['division', 'tables']),
  ('squares', '23² = ?', 529, 3, 'Use (a+b)² formula', '23² = (20 + 3)² = 400 + 120 + 9 = 529', ARRAY['squares', 'formula']),
  ('squares', '35² = ?', 1225, 2, 'Numbers ending in 5 have a pattern', '35² = 3 × (3+1) = 3 × 4 = 12, append 25 = 1225', ARRAY['squares', 'pattern']),
  ('cubes', '5³ = ?', 125, 1, 'Basic cube calculation', '5³ = 5 × 5 × 5 = 125', ARRAY['cubes', 'basic']),
  ('increase', 'Increase 100 by 25%', 125, 2, 'Add 25% of 100 to 100', '100 + (25% of 100) = 100 + 25 = 125', ARRAY['percentage', 'increase']),
  ('increase', 'Decrease 80 by 20%', 64, 2, 'Subtract 20% of 80 from 80', '80 - (20% of 80) = 80 - 16 = 64', ARRAY['percentage', 'decrease']),
  ('reverse', 'After 25% increase, value is 125. Original?', 100, 3, 'Divide by 1.25', '125 ÷ 1.25 = 100', ARRAY['percentage', 'reverse']);

-- Insert flashcard sets
INSERT INTO flashcard_sets (id, name, description) VALUES
  ('percent-fraction', '% ↔ Fraction', 'Convert between percentages and fractions'),
  ('decimal-percent-fraction', 'Decimal ↔ % ↔ Fraction', 'Three-way conversions between decimals, percentages, and fractions'),
  ('increase-decrease', 'Increase/Decrease', 'Percentage increase and decrease calculations'),
  ('successive-change', 'Successive Change', 'Multiple percentage changes in sequence'),
  ('reverse-change', 'Reverse Change', 'Working backwards from percentage changes')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description;

-- Insert sample flashcards
INSERT INTO flashcards (set_id, front, back, order_index) VALUES
  ('percent-fraction', '25%', '1/4', 1),
  ('percent-fraction', '50%', '1/2', 2),
  ('percent-fraction', '75%', '3/4', 3),
  ('percent-fraction', '20%', '1/5', 4),
  ('percent-fraction', '33.33%', '1/3', 5),
  ('decimal-percent-fraction', '0.5', '50% = 1/2', 1),
  ('decimal-percent-fraction', '0.25', '25% = 1/4', 2),
  ('decimal-percent-fraction', '0.75', '75% = 3/4', 3),
  ('increase-decrease', 'Increase 100 by 25%', '125', 1),
  ('increase-decrease', 'Decrease 100 by 25%', '75', 2),
  ('increase-decrease', 'Increase 80 by 20%', '96', 3),
  ('successive-change', 'Increase by 10%, then decrease by 10%', '99% of original (0.99×)', 1),
  ('successive-change', 'Increase by 20%, then decrease by 20%', '96% of original (0.96×)', 2),
  ('reverse-change', 'After 25% increase, value is 125. Original?', '100', 1),
  ('reverse-change', 'After 20% decrease, value is 80. Original?', '100', 2);

-- Insert motivational quotes
INSERT INTO motivational_quotes (quote, author, category, is_active) VALUES
  ('Speed is strategy practiced well.', 'Rahul Sir', 'motivation', true),
  ('You don''t need talent. You need targets.', 'Rahul Sir', 'motivation', true),
  ('Math isn''t hard. It''s just untrained memory.', 'Rahul Sir', 'learning', true),
  ('The secret to speed maths is pattern recognition.', 'Rahul Sir', 'learning', true),
  ('Practice makes permanent, not perfect. Practice perfectly.', 'Rahul Sir', 'practice', true),
  ('Every expert was once a beginner. Every pro was once an amateur.', 'Rahul Sir', 'motivation', true),
  ('Success is the sum of small efforts repeated day in and day out.', 'Rahul Sir', 'success', true),
  ('The mind is like a muscle. The more you exercise it, the stronger it gets.', 'Rahul Sir', 'mindset', true),
  ('Speed comes from understanding, not memorization.', 'Rahul Sir', 'learning', true),
  ('Your only limit is your mind. Train it well.', 'Rahul Sir', 'mindset', true);

-- Insert daily tips
INSERT INTO daily_tips (tip, category, difficulty, is_active) VALUES
  ('Practice mental math for 10 minutes daily to build speed and accuracy', 'practice', 'beginner', true),
  ('Use the compensation method: add/subtract the same amount to both numbers', 'technique', 'intermediate', true),
  ('Break large numbers into smaller, manageable parts for easier calculation', 'strategy', 'beginner', true),
  ('Learn the multiplication tables up to 20 for faster mental calculations', 'preparation', 'beginner', true),
  ('Use the doubling and halving technique for multiplication', 'technique', 'intermediate', true),
  ('Practice with flashcards to memorize common percentage-fraction conversions', 'preparation', 'intermediate', true),
  ('Visualize numbers on a number line to understand relationships better', 'strategy', 'beginner', true),
  ('Use estimation to check if your mental calculations are reasonable', 'strategy', 'intermediate', true),
  ('Focus on accuracy first, then gradually increase your speed', 'mindset', 'beginner', true),
  ('Learn to recognize patterns in numbers to solve problems faster', 'technique', 'advanced', true),
  ('Practice the Vedic math techniques for lightning-fast calculations', 'technique', 'advanced', true),
  ('Use your fingers for quick calculations when needed - it''s not cheating!', 'strategy', 'beginner', true),
  ('Set daily goals for the number of problems you want to solve', 'mindset', 'beginner', true),
  ('Review your mistakes to understand where you went wrong', 'mindset', 'intermediate', true),
  ('Time yourself regularly to track your improvement in speed', 'practice', 'intermediate', true);
