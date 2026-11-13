// This file contains TypeScript types and mock fallback data.
// The app uses MongoDB (via Mongoose) for all database operations.
// Mock data below is used as fallback when the DB has no data yet.

// Database Types
export type Database = {
  public: {
    Tables: {
      questions: {
        Row: Question
        Insert: Omit<Question, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<Question, "id" | "created_at" | "updated_at">>
      }
      categories: {
        Row: Category
        Insert: Omit<Category, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<Category, "id" | "created_at" | "updated_at">>
      }
      flashcard_sets: {
        Row: FlashcardSet
        Insert: Omit<FlashcardSet, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<FlashcardSet, "id" | "created_at" | "updated_at">>
      }
      flashcards: {
        Row: Flashcard
        Insert: Omit<Flashcard, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<Flashcard, "id" | "created_at" | "updated_at">>
      }
      learning_categories: {
        Row: LearningCategory
        Insert: Omit<LearningCategory, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<LearningCategory, "id" | "created_at" | "updated_at">>
      }
      learning_concepts: {
        Row: LearningConcept
        Insert: Omit<LearningConcept, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<LearningConcept, "id" | "created_at" | "updated_at">>
      }
      motivational_quotes: {
        Row: MotivationalQuote
        Insert: Omit<MotivationalQuote, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<MotivationalQuote, "id" | "created_at" | "updated_at">>
      }
      daily_tips: {
        Row: DailyTip
        Insert: Omit<DailyTip, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<DailyTip, "id" | "created_at" | "updated_at">>
      }
    }
  }
}

// Content Types
export interface Question {
  id: string
  category: string
  question: string
  answer: number
  difficulty_level: number
  hint?: string
  explanation?: string
  tags: string[]
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  title: string
  description: string
  icon: string
  difficulty: string
  timeEstimate: string
  color: string
  questions?: Question[]
  created_at: string
  updated_at: string
}

export interface FlashcardSet {
  id: string
  name: string
  description: string
  created_at: string
  updated_at: string
}

export interface Flashcard {
  id: string
  set_id: string
  front: string
  back: string
  order_index: number
  created_at: string
  updated_at: string
}

export interface LearningCategory {
  id: string
  title: string
  description: string
  color: string
  icon: string
  gradient: string
  border: string
  created_at: string
  updated_at: string
}

export interface LearningConcept {
  id: string
  category_id: string
  title: string
  difficulty: string
  time: string
  description: string
  content: string
  practice_exercises: any[]
  created_at: string
  updated_at: string
}

export interface MotivationalQuote {
  id: string
  quote: string
  author: string
  category: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface DailyTip {
  id: string
  tip: string
  category: string
  difficulty: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// Mock Data for fallback
export const mockQuestions: Question[] = [
  {
    id: "1",
    category: "add-sub",
    question: "25 + 37 = ?",
    answer: 62,
    difficulty_level: 1,
    hint: "Break it down: 25 + 30 + 7",
    explanation: "25 + 37 = 25 + 30 + 7 = 55 + 7 = 62",
    tags: ["addition", "two-digit"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    category: "mult-div",
    question: "12 × 15 = ?",
    answer: 180,
    difficulty_level: 2,
    hint: "Use the distributive property",
    explanation: "12 × 15 = 12 × (10 + 5) = 120 + 60 = 180",
    tags: ["multiplication", "two-digit"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    category: "squares",
    question: "23² = ?",
    answer: 529,
    difficulty_level: 3,
    hint: "Use the formula (a+b)² = a² + 2ab + b²",
    explanation: "23² = (20 + 3)² = 400 + 120 + 9 = 529",
    tags: ["squares", "two-digit"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const mockCategories: Category[] = [
  {
    id: "add-sub",
    title: "Addition & Subtraction",
    description: "Master quick mental addition and subtraction techniques",
    icon: "➕",
    difficulty: "Beginner",
    timeEstimate: "5-10 min",
    color: "bg-green-500",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "mult-div",
    title: "Multiplication & Division",
    description: "Learn efficient multiplication and division shortcuts",
    icon: "✖️",
    difficulty: "Intermediate",
    timeEstimate: "10-15 min",
    color: "bg-blue-500",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "squares",
    title: "Squares up to 300",
    description: "Calculate squares instantly using proven patterns",
    icon: "²",
    difficulty: "Advanced",
    timeEstimate: "15-20 min",
    color: "bg-purple-500",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cubes",
    title: "Cubes & Cube Roots",
    description: "Master cube calculations and root finding",
    icon: "³",
    difficulty: "Expert",
    timeEstimate: "20-25 min",
    color: "bg-red-500",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "close-100",
    title: "Close to 100",
    description: "Strategic number game to get as close to 100 as possible",
    icon: "🎯",
    difficulty: "Intermediate",
    timeEstimate: "10-15 min",
    color: "bg-indigo-500",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "table",
    title: "5×5 Table Drill",
    description: "Advanced table analysis and percentage calculations",
    icon: "📊",
    difficulty: "Expert",
    timeEstimate: "20-30 min",
    color: "bg-teal-500",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const mockFlashcardSets: FlashcardSet[] = [
  {
    id: "percent-fraction",
    name: "% ↔ Fraction",
    description: "Convert between percentages and fractions",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "decimal-percent-fraction",
    name: "Decimal ↔ % ↔ Fraction",
    description: "Three-way conversions between decimals, percentages, and fractions",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "increase-decrease",
    name: "Increase/Decrease",
    description: "Percentage increase and decrease calculations",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const mockFlashcards: Flashcard[] = [
  {
    id: "1",
    set_id: "percent-fraction",
    front: "25%",
    back: "1/4",
    order_index: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    set_id: "percent-fraction",
    front: "50%",
    back: "1/2",
    order_index: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    set_id: "decimal-percent-fraction",
    front: "0.5",
    back: "50% = 1/2",
    order_index: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const mockMotivationalQuotes: MotivationalQuote[] = [
  {
    id: "1",
    quote: "Speed is strategy practiced well.",
    author: "Rahul Sir",
    category: "motivation",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    quote: "You don't need talent. You need targets.",
    author: "Rahul Sir",
    category: "motivation",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    quote: "Math isn't hard. It's just untrained memory.",
    author: "Rahul Sir",
    category: "learning",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const mockDailyTips: DailyTip[] = [
  {
    id: "1",
    tip: "Practice mental math for 10 minutes daily to build speed and accuracy",
    category: "practice",
    difficulty: "beginner",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    tip: "Use the compensation method: add/subtract the same amount to both numbers",
    category: "technique",
    difficulty: "intermediate",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    tip: "Break large numbers into smaller, manageable parts for easier calculation",
    category: "strategy",
    difficulty: "beginner",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]
