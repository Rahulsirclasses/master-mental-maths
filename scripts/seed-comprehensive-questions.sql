-- Insert comprehensive sample questions for all categories
INSERT INTO questions (category, question, answer, difficulty_level, hint, explanation, tags) VALUES

-- Addition Questions
('addition', '25 + 37 = ?', 62, 2, 'Break it down: 25 + 30 + 7', '25 + 37 = 25 + 30 + 7 = 55 + 7 = 62', ARRAY['basic', 'two-digit']),
('addition', '89 + 156 = ?', 245, 3, 'Add hundreds, tens, then ones', '89 + 156 = (80 + 150) + (9 + 6) = 230 + 15 = 245', ARRAY['three-digit', 'carrying']),
('addition', '48 + 29 = ?', 77, 2, 'Round 29 to 30, then subtract 1', '48 + 29 = 48 + 30 - 1 = 78 - 1 = 77', ARRAY['rounding', 'two-digit']),
('addition', '123 + 456 = ?', 579, 3, 'Add column by column', '123 + 456 = (100+400) + (20+50) + (3+6) = 500 + 70 + 9 = 579', ARRAY['three-digit', 'basic']),
('addition', '67 + 88 = ?', 155, 3, 'Both numbers end in 7 and 8', '67 + 88 = 60 + 80 + 7 + 8 = 140 + 15 = 155', ARRAY['carrying', 'two-digit']),

-- Subtraction Questions
('subtraction', '100 - 47 = ?', 53, 3, 'Think: 100 - 50 + 3', '100 - 47 = 100 - 50 + 3 = 50 + 3 = 53', ARRAY['from-hundred', 'compensation']),
('subtraction', '85 - 29 = ?', 56, 3, 'Round 29 to 30, then add 1', '85 - 29 = 85 - 30 + 1 = 55 + 1 = 56', ARRAY['rounding', 'compensation']),
('subtraction', '234 - 156 = ?', 78, 3, 'Subtract column by column', '234 - 156 = (200-100) + (30-50) + (4-6) = 100 - 20 - 2 = 78', ARRAY['three-digit', 'borrowing']),
('subtraction', '92 - 38 = ?', 54, 2, 'Round 38 to 40, then add 2', '92 - 38 = 92 - 40 + 2 = 52 + 2 = 54', ARRAY['rounding', 'two-digit']),
('subtraction', '500 - 237 = ?', 263, 4, 'Subtract from 500', '500 - 237 = 500 - 200 - 37 = 300 - 37 = 263', ARRAY['from-hundred', 'three-digit']),

-- Multiplication Questions
('multiplication', '8 × 7 = ?', 56, 2, 'Think of it as 8 × 7 or 7 × 8', '8 × 7 = 56 (memorize multiplication tables)', ARRAY['tables', 'basic']),
('multiplication', '12 × 15 = ?', 180, 3, 'Break it down: 12 × 10 + 12 × 5', '12 × 15 = 12 × (10 + 5) = 120 + 60 = 180', ARRAY['distributive', 'two-digit']),
('multiplication', '25 × 4 = ?', 100, 2, '25 × 4 is a quarter of 100', '25 × 4 = 100 (25 is one quarter, so 25 × 4 = 100)', ARRAY['factoring', 'quarters']),
('multiplication', '9 × 13 = ?', 117, 3, 'Use 9 × 10 + 9 × 3', '9 × 13 = 9 × (10 + 3) = 90 + 27 = 117', ARRAY['distributive', 'two-digit']),
('multiplication', '6 × 8 = ?', 48, 2, 'Six eights', '6 × 8 = 48', ARRAY['tables', 'basic']),

-- Division Questions
('division', '144 ÷ 12 = ?', 12, 3, 'What times 12 equals 144?', '144 ÷ 12 = 12 because 12 × 12 = 144', ARRAY['tables', 'perfect-squares']),
('division', '96 ÷ 8 = ?', 12, 2, 'Think: 8 times what equals 96?', '96 ÷ 8 = 12 because 8 × 12 = 96', ARRAY['tables', 'basic']),
('division', '156 ÷ 12 = ?', 13, 3, 'How many 12s in 156?', '156 ÷ 12 = 13 because 12 × 13 = 156', ARRAY['tables', 'two-digit']),
('division', '84 ÷ 7 = ?', 12, 2, 'Seven times what equals 84?', '84 ÷ 7 = 12 because 7 × 12 = 84', ARRAY['tables', 'basic']),
('division', '225 ÷ 15 = ?', 15, 4, 'What times 15 equals 225?', '225 ÷ 15 = 15 because 15 × 15 = 225', ARRAY['perfect-squares', 'two-digit']),

-- Mixed Operations
('mixed', '5 + 3 × 2 = ?', 11, 3, 'Remember order of operations (PEMDAS)', '5 + 3 × 2 = 5 + 6 = 11 (multiply first, then add)', ARRAY['order-operations', 'pemdas']),
('mixed', '(8 + 4) ÷ 3 = ?', 4, 2, 'Solve parentheses first', '(8 + 4) ÷ 3 = 12 ÷ 3 = 4', ARRAY['parentheses', 'order-operations']),
('mixed', '15 - 2 × 4 = ?', 7, 3, 'Multiply before subtract', '15 - 2 × 4 = 15 - 8 = 7', ARRAY['order-operations', 'pemdas']),
('mixed', '20 ÷ 4 + 6 = ?', 11, 2, 'Divide first, then add', '20 ÷ 4 + 6 = 5 + 6 = 11', ARRAY['order-operations', 'basic']),
('mixed', '3 × (7 - 2) = ?', 15, 3, 'Parentheses first, then multiply', '3 × (7 - 2) = 3 × 5 = 15', ARRAY['parentheses', 'order-operations']),

-- Fractions
('fractions', '1/2 + 1/4 = ?', 0.75, 3, 'Find common denominator', '1/2 + 1/4 = 2/4 + 1/4 = 3/4 = 0.75', ARRAY['addition', 'common-denominator']),
('fractions', '3/4 × 8 = ?', 6, 3, 'Multiply 8 by 3, then divide by 4', '3/4 × 8 = (3 × 8) ÷ 4 = 24 ÷ 4 = 6', ARRAY['multiplication', 'whole-number']),
('fractions', '2/3 + 1/6 = ?', 0.833, 4, 'Common denominator is 6', '2/3 + 1/6 = 4/6 + 1/6 = 5/6 ≈ 0.833', ARRAY['addition', 'common-denominator']),
('fractions', '5/8 - 1/4 = ?', 0.375, 3, 'Convert 1/4 to eighths', '5/8 - 1/4 = 5/8 - 2/8 = 3/8 = 0.375', ARRAY['subtraction', 'common-denominator']),
('fractions', '1/3 × 9 = ?', 3, 2, 'One third of 9', '1/3 × 9 = 9 ÷ 3 = 3', ARRAY['multiplication', 'whole-number']),

-- Decimals
('decimals', '2.5 + 1.75 = ?', 4.25, 2, 'Line up the decimal points', '2.5 + 1.75 = 2.50 + 1.75 = 4.25', ARRAY['addition', 'place-value']),
('decimals', '0.8 × 5 = ?', 4, 2, 'Think of 0.8 as 8/10', '0.8 × 5 = (8/10) × 5 = 40/10 = 4', ARRAY['multiplication', 'tenths']),
('decimals', '7.2 - 3.8 = ?', 3.4, 3, 'Line up decimal points', '7.2 - 3.8 = 3.4', ARRAY['subtraction', 'place-value']),
('decimals', '0.6 ÷ 3 = ?', 0.2, 3, 'Divide 6 tenths by 3', '0.6 ÷ 3 = 6/10 ÷ 3 = 2/10 = 0.2', ARRAY['division', 'tenths']),
('decimals', '1.25 × 4 = ?', 5, 2, 'One and a quarter times 4', '1.25 × 4 = 5', ARRAY['multiplication', 'quarters']),

-- Percentages
('percentages', '25% of 80 = ?', 20, 3, '25% = 1/4', '25% of 80 = 1/4 × 80 = 80 ÷ 4 = 20', ARRAY['quarters', 'of']),
('percentages', '50% of 150 = ?', 75, 2, '50% means half', '50% of 150 = 150 ÷ 2 = 75', ARRAY['half', 'of']),
('percentages', '10% of 240 = ?', 24, 2, '10% means divide by 10', '10% of 240 = 240 ÷ 10 = 24', ARRAY['tenths', 'of']),
('percentages', '75% of 60 = ?', 45, 3, '75% = 3/4', '75% of 60 = 3/4 × 60 = 180 ÷ 4 = 45', ARRAY['three-quarters', 'of']),
('percentages', '20% of 85 = ?', 17, 3, '20% = 1/5', '20% of 85 = 1/5 × 85 = 85 ÷ 5 = 17', ARRAY['fifths', 'of']),

-- Close to 100
('close-100', 'Using 25, 3, 6, 4, make 100', 100, 3, 'Try: 25 × 4 = 100', '25 × 4 = 100, then 3 + 6 - 9 = 0, so 100 + 0 = 100', ARRAY['multiplication', 'strategy']),
('close-100', 'Using 50, 2, 8, 6, get close to 100', 98, 3, 'Try: 50 × 2 - 8 + 6', '50 × 2 - 8 + 6 = 100 - 8 + 6 = 98', ARRAY['close', 'operations']),
('close-100', 'Using 20, 5, 3, 2, make 100', 100, 4, 'Try: 20 × 5 = 100', '20 × 5 = 100, then 3 - 2 = 1, but we need exactly 100', ARRAY['multiplication', 'exact']),
('close-100', 'Using 12, 8, 4, 1, get close to 100', 97, 4, 'Try: 12 × 8 + 4 + 1', '12 × 8 + 4 + 1 = 96 + 4 + 1 = 101, or 12 × 8 - 4 + 1 = 93', ARRAY['close', 'operations']),
('close-100', 'Using 15, 6, 10, 2, make 100', 100, 3, 'Try: 15 × 6 + 10 = ?', '15 × 6 + 10 = 90 + 10 = 100', ARRAY['multiplication', 'addition']),

-- Multiplication Tables
('table', '7 × 8 = ?', 56, 2, 'Seven eights', '7 × 8 = 56', ARRAY['7-table', '8-table']),
('table', '9 × 6 = ?', 54, 2, 'Nine sixes', '9 × 6 = 54', ARRAY['9-table', '6-table']),
('table', '4 × 9 = ?', 36, 2, 'Four nines', '4 × 9 = 36', ARRAY['4-table', '9-table']),
('table', '8 × 8 = ?', 64, 2, 'Eight times eight', '8 × 8 = 64', ARRAY['8-table', 'squares']),
('table', '7 × 7 = ?', 49, 2, 'Seven squared', '7 × 7 = 49', ARRAY['7-table', 'squares']),

-- Mental Math Tricks
('mental-tricks', '37 × 11 = ?', 407, 4, 'For 11: separate digits and add middle', '37 × 11: 3_7 → 3(3+7)7 = 3(10)7 = 407', ARRAY['11-trick', 'pattern']),
('mental-tricks', '25 × 36 = ?', 900, 4, 'Use 25 × 4 = 100', '25 × 36 = 25 × 4 × 9 = 100 × 9 = 900', ARRAY['factoring', '25-trick']),
('mental-tricks', '99 × 23 = ?', 2277, 5, 'Use 100 × 23 - 23', '99 × 23 = (100 - 1) × 23 = 2300 - 23 = 2277', ARRAY['99-trick', 'compensation']),
('mental-tricks', '15² = ?', 225, 4, 'Use (10 + 5)²', '15² = (10 + 5)² = 100 + 100 + 25 = 225', ARRAY['squares', 'binomial']),
('mental-tricks', '125 × 8 = ?', 1000, 3, '125 × 8 = 1000', '125 × 8 = 1000 (memorize this pattern)', ARRAY['125-trick', 'pattern']),

-- Word Problems
('word-problems', 'Sarah has 24 stickers. She gives away 8 and buys 15 more. How many does she have?', 31, 2, 'Start with 24, subtract 8, add 15', '24 - 8 + 15 = 16 + 15 = 31 stickers', ARRAY['addition', 'subtraction', 'real-world']),
('word-problems', 'A pizza is cut into 8 slices. If 3 people eat 2 slices each, how many slices are left?', 2, 3, 'Total eaten: 3 × 2 = 6', '8 - (3 × 2) = 8 - 6 = 2 slices left', ARRAY['multiplication', 'subtraction', 'sharing']),
('word-problems', 'Tom saves $5 each week. How much will he have after 12 weeks?', 60, 2, 'Multiply weekly savings by weeks', '$5 × 12 = $60', ARRAY['multiplication', 'money', 'time']),
('word-problems', 'A box contains 144 pencils. If they are packed in groups of 12, how many groups are there?', 12, 3, 'Divide total by group size', '144 ÷ 12 = 12 groups', ARRAY['division', 'grouping']),
('word-problems', 'Lisa reads 25 pages per day. How many pages will she read in a week?', 175, 2, 'Multiply daily pages by 7 days', '25 × 7 = 175 pages', ARRAY['multiplication', 'time']),

-- Basic Algebra
('algebra-basics', 'x + 5 = 12. What is x?', 7, 2, 'Subtract 5 from both sides', 'x + 5 = 12, so x = 12 - 5 = 7', ARRAY['solving', 'addition']),
('algebra-basics', '3x = 15. What is x?', 5, 2, 'Divide both sides by 3', '3x = 15, so x = 15 ÷ 3 = 5', ARRAY['solving', 'multiplication']),
('algebra-basics', 'x - 8 = 10. What is x?', 18, 2, 'Add 8 to both sides', 'x - 8 = 10, so x = 10 + 8 = 18', ARRAY['solving', 'subtraction']),
('algebra-basics', '2x + 3 = 11. What is x?', 4, 3, 'Subtract 3, then divide by 2', '2x + 3 = 11, so 2x = 8, so x = 4', ARRAY['solving', 'two-step']),
('algebra-basics', 'x/4 = 6. What is x?', 24, 2, 'Multiply both sides by 4', 'x/4 = 6, so x = 6 × 4 = 24', ARRAY['solving', 'division']),

-- Basic Geometry
('geometry-basics', 'Rectangle: length 8cm, width 5cm. What is the area?', 40, 2, 'Area = length × width', 'Area = 8 × 5 = 40 cm²', ARRAY['area', 'rectangle']),
('geometry-basics', 'Square with side 6cm. What is the perimeter?', 24, 2, 'Perimeter = 4 × side length', 'Perimeter = 4 × 6 = 24 cm', ARRAY['perimeter', 'square']),
('geometry-basics', 'Triangle: base 10cm, height 8cm. What is the area?', 40, 3, 'Area = (base × height) ÷ 2', 'Area = (10 × 8) ÷ 2 = 80 ÷ 2 = 40 cm²', ARRAY['area', 'triangle']),
('geometry-basics', 'Circle with radius 5cm. What is the diameter?', 10, 2, 'Diameter = 2 × radius', 'Diameter = 2 × 5 = 10 cm', ARRAY['diameter', 'circle']),
('geometry-basics', 'Rectangle: length 12cm, width 7cm. What is the perimeter?', 38, 2, 'Perimeter = 2 × (length + width)', 'Perimeter = 2 × (12 + 7) = 2 × 19 = 38 cm', ARRAY['perimeter', 'rectangle']),

-- Time & Money
('time-money', 'How many minutes in 2.5 hours?', 150, 2, '1 hour = 60 minutes', '2.5 × 60 = 150 minutes', ARRAY['time-conversion', 'decimals']),
('time-money', 'Buy 3 items at $4.50 each. Total cost?', 13.5, 2, 'Multiply price by quantity', '3 × $4.50 = $13.50', ARRAY['money', 'multiplication']),
('time-money', 'If it is 2:45 PM, what time will it be in 3 hours 30 minutes?', 6.25, 3, 'Add 3 hours 30 minutes to 2:45', '2:45 + 3:30 = 6:15 PM (6.25 in decimal)', ARRAY['time-addition', 'pm']),
('time-money', 'You have $50. You spend $12.75 and $8.50. How much is left?', 28.75, 3, 'Subtract both amounts from $50', '$50 - $12.75 - $8.50 = $28.75', ARRAY['money', 'subtraction']),
('time-money', 'A movie starts at 7:30 PM and lasts 2 hours 15 minutes. When does it end?', 9.75, 3, 'Add duration to start time', '7:30 + 2:15 = 9:45 PM (9.75 in decimal)', ARRAY['time-addition', 'duration'])

ON CONFLICT DO NOTHING;
