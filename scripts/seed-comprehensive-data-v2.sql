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
  color = EXCLUDED.color,
  updated_at = NOW();

-- Insert sample questions
INSERT INTO questions (category, question, answer, difficulty_level, hint, explanation, tags) VALUES
  ('add-sub', '25 + 37 = ?', 62, 1, 'Break it down: 25 + 30 + 7', '25 + 37 = 25 + 30 + 7 = 55 + 7 = 62', ARRAY['addition', 'two-digit']),
  ('add-sub', '84 - 29 = ?', 55, 2, 'Use compensation: 84 - 30 + 1', '84 - 29 = 84 - 30 + 1 = 54 + 1 = 55', ARRAY['subtraction', 'compensation']),
  ('add-sub', '156 + 89 = ?', 245, 3, 'Round 89 to 90, then subtract 1', '156 + 89 = 156 + 90 - 1 = 246 - 1 = 245', ARRAY['addition', 'rounding']),
  ('add-sub', '73 + 48 = ?', 121, 2, 'Add 50, then subtract 2', '73 + 48 = 73 + 50 - 2 = 123 - 2 = 121', ARRAY['addition', 'compensation']),
  ('add-sub', '92 - 37 = ?', 55, 2, 'Subtract 40, then add 3', '92 - 37 = 92 - 40 + 3 = 52 + 3 = 55', ARRAY['subtraction', 'compensation']),
  
  ('mult-div', '12 × 15 = ?', 180, 2, 'Use distributive property', '12 × 15 = 12 × (10 + 5) = 120 + 60 = 180', ARRAY['multiplication', 'distributive']),
  ('mult-div', '144 ÷ 12 = ?', 12, 1, 'Think of multiplication tables', '144 ÷ 12 = 12 (since 12 × 12 = 144)', ARRAY['division', 'tables']),
  ('mult-div', '25 × 16 = ?', 400, 2, 'Use 25 × 4 = 100 pattern', '25 × 16 = 25 × 4 × 4 = 100 × 4 = 400', ARRAY['multiplication', 'pattern']),
  ('mult-div', '18 × 25 = ?', 450, 2, 'Use 25 × 4 = 100', '18 × 25 = 18 × 100 ÷ 4 = 1800 ÷ 4 = 450', ARRAY['multiplication', 'pattern']),
  ('mult-div', '168 ÷ 14 = ?', 12, 2, 'Break down 168 = 140 + 28', '168 ÷ 14 = (140 + 28) ÷ 14 = 10 + 2 = 12', ARRAY['division', 'breakdown']),
  
  ('squares', '23² = ?', 529, 3, 'Use (a+b)² formula', '23² = (20 + 3)² = 400 + 120 + 9 = 529', ARRAY['squares', 'formula']),
  ('squares', '35² = ?', 1225, 2, 'Numbers ending in 5 have a pattern', '35² = 3 × (3+1) = 3 × 4 = 12, append 25 = 1225', ARRAY['squares', 'pattern']),
  ('squares', '67² = ?', 4489, 4, 'Use (a-b)² formula with 70-3', '67² = (70-3)² = 4900 - 420 + 9 = 4489', ARRAY['squares', 'formula']),
  ('squares', '45² = ?', 2025, 2, 'Numbers ending in 5 pattern', '45² = 4 × (4+1) = 4 × 5 = 20, append 25 = 2025', ARRAY['squares', 'pattern']),
  ('squares', '19² = ?', 361, 3, 'Use (20-1)² formula', '19² = (20-1)² = 400 - 40 + 1 = 361', ARRAY['squares', 'formula']),
  
  ('cubes', '5³ = ?', 125, 1, 'Basic cube calculation', '5³ = 5 × 5 × 5 = 125', ARRAY['cubes', 'basic']),
  ('cubes', '12³ = ?', 1728, 3, 'Use (a+b)³ formula', '12³ = (10+2)³ = 1000 + 600 + 120 + 8 = 1728', ARRAY['cubes', 'formula']),
  ('cubes', '8³ = ?', 512, 1, 'Basic cube calculation', '8³ = 8 × 8 × 8 = 512', ARRAY['cubes', 'basic']),
  ('cubes', '∛216 = ?', 6, 2, 'Think of perfect cubes', '∛216 = 6 (since 6³ = 216)', ARRAY['cube-roots', 'perfect']),
  
  ('increase', 'Increase 100 by 25%', 125, 2, 'Add 25% of 100 to 100', '100 + (25% of 100) = 100 + 25 = 125', ARRAY['percentage', 'increase']),
  ('increase', 'Decrease 80 by 20%', 64, 2, 'Subtract 20% of 80 from 80', '80 - (20% of 80) = 80 - 16 = 64', ARRAY['percentage', 'decrease']),
  ('increase', 'Increase 150 by 40%', 210, 3, 'Calculate 40% of 150 and add', '150 + (40% of 150) = 150 + 60 = 210', ARRAY['percentage', 'increase']),
  ('increase', 'Decrease 200 by 15%', 170, 2, 'Calculate 15% of 200 and subtract', '200 - (15% of 200) = 200 - 30 = 170', ARRAY['percentage', 'decrease']),
  
  ('successive', 'Increase by 20%, then 10%', 132, 3, 'Apply changes sequentially', '100 × 1.2 × 1.1 = 132', ARRAY['percentage', 'successive']),
  ('successive', 'Decrease by 10%, then increase by 20%', 108, 3, 'Apply changes in order', '100 × 0.9 × 1.2 = 108', ARRAY['percentage', 'successive']),
  ('successive', 'Increase by 25%, then decrease by 20%', 100, 4, 'Net effect calculation', '100 × 1.25 × 0.8 = 100', ARRAY['percentage', 'successive']),
  
  ('reverse', 'After 25% increase, value is 125. Original?', 100, 3, 'Divide by 1.25', '125 ÷ 1.25 = 100', ARRAY['percentage', 'reverse']),
  ('reverse', 'After 20% decrease, value is 80. Original?', 100, 3, 'Divide by 0.8', '80 ÷ 0.8 = 100', ARRAY['percentage', 'reverse']),
  ('reverse', 'After 30% increase, value is 130. Original?', 100, 3, 'Divide by 1.3', '130 ÷ 1.3 = 100', ARRAY['percentage', 'reverse']),
  
  ('base', '98 × 97 = ?', 9506, 4, 'Use base 100 method', '(100-2)(100-3) = 10000 - 300 - 200 + 6 = 9506', ARRAY['multiplication', 'base']),
  ('base', '103 × 107 = ?', 11021, 4, 'Use base 100 method', '(100+3)(100+7) = 10000 + 700 + 300 + 21 = 11021', ARRAY['multiplication', 'base']),
  ('base', '96 × 94 = ?', 9024, 4, 'Use base 100 method', '(100-4)(100-6) = 10000 - 600 - 400 + 24 = 9024', ARRAY['multiplication', 'base']);

-- Insert flashcard sets
INSERT INTO flashcard_sets (id, name, description) VALUES
  ('percent-fraction', '% ↔ Fraction', 'Convert between percentages and fractions'),
  ('decimal-percent-fraction', 'Decimal ↔ % ↔ Fraction', 'Three-way conversions between decimals, percentages, and fractions'),
  ('increase-decrease', 'Increase/Decrease', 'Percentage increase and decrease calculations'),
  ('successive-change', 'Successive Change', 'Multiple percentage changes in sequence'),
  ('reverse-change', 'Reverse Change', 'Working backwards from percentage changes'),
  ('squares-cubes', 'Squares & Cubes', 'Perfect squares and cubes memorization'),
  ('multiplication-tricks', 'Multiplication Tricks', 'Quick multiplication techniques')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  updated_at = NOW();

-- Insert sample flashcards
INSERT INTO flashcards (set_id, front, back, order_index) VALUES
  -- Percentage to Fraction conversions
  ('percent-fraction', '25%', '1/4', 1),
  ('percent-fraction', '50%', '1/2', 2),
  ('percent-fraction', '75%', '3/4', 3),
  ('percent-fraction', '20%', '1/5', 4),
  ('percent-fraction', '33.33%', '1/3', 5),
  ('percent-fraction', '66.67%', '2/3', 6),
  ('percent-fraction', '10%', '1/10', 7),
  ('percent-fraction', '12.5%', '1/8', 8),
  ('percent-fraction', '37.5%', '3/8', 9),
  ('percent-fraction', '62.5%', '5/8', 10),
  
  -- Decimal conversions
  ('decimal-percent-fraction', '0.5', '50% = 1/2', 1),
  ('decimal-percent-fraction', '0.25', '25% = 1/4', 2),
  ('decimal-percent-fraction', '0.75', '75% = 3/4', 3),
  ('decimal-percent-fraction', '0.2', '20% = 1/5', 4),
  ('decimal-percent-fraction', '0.125', '12.5% = 1/8', 5),
  ('decimal-percent-fraction', '0.375', '37.5% = 3/8', 6),
  
  -- Increase/Decrease
  ('increase-decrease', 'Increase 100 by 25%', '125', 1),
  ('increase-decrease', 'Decrease 100 by 25%', '75', 2),
  ('increase-decrease', 'Increase 80 by 20%', '96', 3),
  ('increase-decrease', 'Decrease 80 by 20%', '64', 4),
  ('increase-decrease', 'Increase 150 by 40%', '210', 5),
  ('increase-decrease', 'Decrease 150 by 40%', '90', 6),
  
  -- Successive changes
  ('successive-change', 'Increase by 10%, then decrease by 10%', '99% of original (0.99×)', 1),
  ('successive-change', 'Increase by 20%, then decrease by 20%', '96% of original (0.96×)', 2),
  ('successive-change', 'Increase by 25%, then increase by 20%', '150% of original (1.5×)', 3),
  ('successive-change', 'Decrease by 10%, then decrease by 10%', '81% of original (0.81×)', 4),
  
  -- Reverse changes
  ('reverse-change', 'After 25% increase, value is 125. Original?', '100', 1),
  ('reverse-change', 'After 20% decrease, value is 80. Original?', '100', 2),
  ('reverse-change', 'After 50% increase, value is 150. Original?', '100', 3),
  ('reverse-change', 'After 30% decrease, value is 70. Original?', '100', 4),
  
  -- Squares and Cubes
  ('squares-cubes', '11²', '121', 1),
  ('squares-cubes', '12²', '144', 2),
  ('squares-cubes', '13²', '169', 3),
  ('squares-cubes', '14²', '196', 4),
  ('squares-cubes', '15²', '225', 5),
  ('squares-cubes', '5³', '125', 6),
  ('squares-cubes', '6³', '216', 7),
  ('squares-cubes', '7³', '343', 8),
  
  -- Multiplication tricks
  ('multiplication-tricks', '25 × 16', '400 (25 × 4 × 4)', 1),
  ('multiplication-tricks', '125 × 8', '1000 (125 × 8)', 2),
  ('multiplication-tricks', '11 × 23', '253 (2+3 between 2 and 3)', 3),
  ('multiplication-tricks', '99 × 47', '4653 (47 × 100 - 47)', 4);

-- Insert learning categories
INSERT INTO learning_categories (id, title, description, color, icon, gradient, border) VALUES
  ('vedic-basics', 'Vedic Math Basics', 'Fundamental techniques from ancient Indian mathematics', 'bg-blue-50', '🕉️', 'from-blue-400 to-blue-600', 'border-blue-200'),
  ('mental-arithmetic', 'Mental Arithmetic', 'Core addition, subtraction, multiplication, and division techniques', 'bg-green-50', '🧮', 'from-green-400 to-green-600', 'border-green-200'),
  ('percentage-mastery', 'Percentage Mastery', 'Complete guide to percentage calculations and applications', 'bg-yellow-50', '📊', 'from-yellow-400 to-yellow-600', 'border-yellow-200'),
  ('advanced-techniques', 'Advanced Techniques', 'Complex calculations and professional-level shortcuts', 'bg-purple-50', '🎯', 'from-purple-400 to-purple-600', 'border-purple-200'),
  ('exam-strategies', 'Exam Strategies', 'Time-saving techniques for competitive exams', 'bg-red-50', '⏱️', 'from-red-400 to-red-600', 'border-red-200')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  color = EXCLUDED.color,
  icon = EXCLUDED.icon,
  gradient = EXCLUDED.gradient,
  border = EXCLUDED.border,
  updated_at = NOW();

-- Insert learning concepts
INSERT INTO learning_concepts (category_id, title, difficulty, time, description, content, practice_exercises) VALUES
  ('vedic-basics', 'Nikhilam Sutra', 'Beginner', '15 min', 'All from 9 and last from 10 - Master subtraction using this ancient technique', 
   'The Nikhilam Sutra is one of the most powerful Vedic math techniques for subtraction and multiplication. It means "All from 9 and last from 10". This technique is especially useful when dealing with numbers close to powers of 10.',
   '[{"question": "1000 - 357 = ?", "answer": "643", "hint": "Use Nikhilam: 9-3=6, 9-5=4, 10-7=3"}]'),
  
  ('mental-arithmetic', 'Compensation Method', 'Beginner', '10 min', 'Add and subtract the same amount to make calculations easier',
   'The compensation method involves adding or subtracting the same amount from both numbers to make mental calculation easier. For example, to calculate 47 + 29, you can think of it as 47 + 30 - 1 = 77 - 1 = 76.',
   '[{"question": "47 + 29 = ?", "answer": "76", "hint": "Add 1 to 29 to make 30, then subtract 1 from result"}]'),
   
  ('percentage-mastery', 'Quick Percentage Calculations', 'Intermediate', '20 min', 'Calculate percentages instantly without a calculator',
   'Learn to calculate common percentages quickly: 10% (divide by 10), 5% (half of 10%), 25% (quarter), 50% (half), 75% (three quarters). For other percentages, break them down into these basic components.',
   '[{"question": "What is 15% of 80?", "answer": "12", "hint": "15% = 10% + 5%. 10% of 80 = 8, 5% of 80 = 4, so 15% = 12"}]'),
   
  ('advanced-techniques', 'Base Method Multiplication', 'Advanced', '25 min', 'Multiply numbers close to 100 using the base method',
   'When multiplying numbers close to 100, use the base method. For numbers like 97 × 98, think of them as (100-3) × (100-2). The result is 100² - 100(3+2) + (3×2) = 10000 - 500 + 6 = 9506.',
   '[{"question": "97 × 98 = ?", "answer": "9506", "hint": "Use base 100: (100-3)(100-2) = 10000 - 500 + 6"}]'),
   
  ('exam-strategies', 'Time Management in Math', 'Intermediate', '15 min', 'Optimize your time during competitive exams',
   'In competitive exams, time is crucial. Learn to identify which problems to solve first, when to use approximation, and how to verify answers quickly. Always start with problems you are most confident about.',
   '[{"question": "Strategy: Which to solve first - easy 2-mark or difficult 4-mark?", "answer": "Easy 2-mark", "hint": "Secure easy marks first, then attempt difficult ones"}]');

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
  ('Your only limit is your mind. Train it well.', 'Rahul Sir', 'mindset', true),
  ('Mathematics is not about numbers, equations, or algorithms: it is about understanding.', 'Rahul Sir', 'learning', true),
  ('The best way to learn mathematics is to do mathematics.', 'Rahul Sir', 'practice', true),
  ('Confidence comes from preparation, preparation comes from practice.', 'Rahul Sir', 'success', true),
  ('Don''t just solve problems, understand the patterns behind them.', 'Rahul Sir', 'learning', true),
  ('Speed without accuracy is useless. Accuracy without speed is incomplete.', 'Rahul Sir', 'strategy', true);

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
  ('Time yourself regularly to track your improvement in speed', 'practice', 'intermediate', true),
  ('Master the art of approximation for quick estimates', 'technique', 'intermediate', true),
  ('Learn to calculate 15% quickly: it''s 10% + 5%', 'technique', 'beginner', true),
  ('For squares ending in 5: multiply the first digit by (first digit + 1), then append 25', 'technique', 'intermediate', true),
  ('Use the cross-multiplication method for fractions', 'technique', 'intermediate', true),
  ('Practice calculating compound interest mentally using successive percentages', 'technique', 'advanced', true);
