-- Insert sample questions for Addition
INSERT INTO questions (category, question, answer, difficulty_level, hint, explanation) VALUES
  ('addition', '25 + 37 = ?', 62, 2, 'Break it down: 25 + 30 + 7', '25 + 37 = 25 + 30 + 7 = 55 + 7 = 62'),
  ('addition', '89 + 156 = ?', 245, 3, 'Add hundreds, tens, then ones', '89 + 156 = (80 + 150) + (9 + 6) = 230 + 15 = 245'),
  ('addition', '12 + 8 = ?', 20, 1, 'Count up from 12', '12 + 8: Start at 12 and count up 8 more to get 20'),
  ('addition', '347 + 298 = ?', 645, 4, 'Round 298 to 300, then subtract 2', '347 + 298 = 347 + 300 - 2 = 647 - 2 = 645'),
  ('addition', '1,234 + 5,678 = ?', 6912, 5, 'Add column by column from right to left', '1,234 + 5,678 = 6,912 (carry over when sum > 9)'),

-- Insert sample questions for Subtraction
  ('subtraction', '100 - 47 = ?', 53, 3, 'Think: 100 - 50 + 3', '100 - 47 = 100 - 50 + 3 = 50 + 3 = 53'),
  ('subtraction', '85 - 29 = ?', 56, 3, 'Round 29 to 30, then add 1', '85 - 29 = 85 - 30 + 1 = 55 + 1 = 56'),
  ('subtraction', '20 - 7 = ?', 13, 1, 'Count down from 20', '20 - 7: Start at 20 and count down 7 to get 13'),
  ('subtraction', '500 - 237 = ?', 263, 4, 'Break it down: 500 - 200 - 37', '500 - 237 = 500 - 200 - 37 = 300 - 37 = 263'),
  ('subtraction', '1,000 - 456 = ?', 544, 4, 'Think of it as 1,000 - 400 - 56', '1,000 - 456 = 1,000 - 400 - 56 = 600 - 56 = 544'),

-- Insert sample questions for Multiplication
  ('multiplication', '8 × 7 = ?', 56, 2, 'Think of it as 8 × 7 or 7 × 8', '8 × 7 = 56 (memorize multiplication tables)'),
  ('multiplication', '12 × 15 = ?', 180, 3, 'Break it down: 12 × 10 + 12 × 5', '12 × 15 = 12 × (10 + 5) = 120 + 60 = 180'),
  ('multiplication', '6 × 4 = ?', 24, 1, 'Count by 6s four times', '6 × 4 = 6 + 6 + 6 + 6 = 24'),
  ('multiplication', '25 × 16 = ?', 400, 4, 'Use (25 × 4) × 4 = 100 × 4', '25 × 16 = 25 × (4 × 4) = (25 × 4) × 4 = 100 × 4 = 400'),
  ('multiplication', '37 × 23 = ?', 851, 5, 'Use distributive property', '37 × 23 = 37 × (20 + 3) = 740 + 111 = 851'),

-- Insert sample questions for Division
  ('division', '144 ÷ 12 = ?', 12, 3, 'What times 12 equals 144?', '144 ÷ 12 = 12 because 12 × 12 = 144'),
  ('division', '96 ÷ 8 = ?', 12, 2, 'Think: 8 times what equals 96?', '96 ÷ 8 = 12 because 8 × 12 = 96'),
  ('division', '24 ÷ 6 = ?', 4, 1, 'How many 6s are in 24?', '24 ÷ 6 = 4 because 6 × 4 = 24'),
  ('division', '225 ÷ 15 = ?', 15, 4, 'Break down: 225 = 15 × ?', '225 ÷ 15 = 15 because 15 × 15 = 225'),
  ('division', '1,728 ÷ 12 = ?', 144, 5, 'Use long division or factor method', '1,728 ÷ 12 = 144 (12 × 144 = 1,728)'),

-- Insert sample questions for Mixed Operations
  ('mixed', '5 + 3 × 2 = ?', 11, 3, 'Remember order of operations (PEMDAS)', '5 + 3 × 2 = 5 + 6 = 11 (multiply first, then add)'),
  ('mixed', '(8 + 4) ÷ 3 = ?', 4, 2, 'Solve parentheses first', '(8 + 4) ÷ 3 = 12 ÷ 3 = 4'),
  ('mixed', '20 - 3 × 4 = ?', 8, 3, 'Multiply before subtracting', '20 - 3 × 4 = 20 - 12 = 8'),
  ('mixed', '2 × (6 + 4) - 5 = ?', 15, 4, 'Parentheses, then multiply, then subtract', '2 × (6 + 4) - 5 = 2 × 10 - 5 = 20 - 5 = 15'),

-- Insert sample questions for Fractions
  ('fractions', '1/2 + 1/4 = ?', 0.75, 3, 'Find common denominator', '1/2 + 1/4 = 2/4 + 1/4 = 3/4 = 0.75'),
  ('fractions', '3/4 - 1/2 = ?', 0.25, 3, 'Convert to same denominator', '3/4 - 1/2 = 3/4 - 2/4 = 1/4 = 0.25'),
  ('fractions', '1/3 × 2 = ?', 0.67, 2, 'Multiply numerator by 2', '1/3 × 2 = 2/3 ≈ 0.67'),
  ('fractions', '2/3 ÷ 1/2 = ?', 1.33, 4, 'Multiply by reciprocal', '2/3 ÷ 1/2 = 2/3 × 2/1 = 4/3 ≈ 1.33'),

-- Insert sample questions for Decimals
  ('decimals', '0.5 + 0.25 = ?', 0.75, 2, 'Line up decimal points', '0.5 + 0.25 = 0.75'),
  ('decimals', '1.2 × 3 = ?', 3.6, 2, 'Multiply normally, count decimal places', '1.2 × 3 = 3.6'),
  ('decimals', '4.8 ÷ 2 = ?', 2.4, 2, 'Divide normally', '4.8 ÷ 2 = 2.4'),
  ('decimals', '0.75 - 0.3 = ?', 0.45, 3, 'Convert to same decimal places', '0.75 - 0.30 = 0.45'),

-- Insert sample questions for Percentages
  ('percentages', '50% of 80 = ?', 40, 2, '50% means half', '50% of 80 = 0.5 × 80 = 40'),
  ('percentages', '25% of 200 = ?', 50, 2, '25% means one quarter', '25% of 200 = 0.25 × 200 = 50'),
  ('percentages', '10% of 150 = ?', 15, 1, 'Move decimal point one place left', '10% of 150 = 15'),
  ('percentages', '75% of 120 = ?', 90, 3, '75% = 3/4', '75% of 120 = 0.75 × 120 = 90');
