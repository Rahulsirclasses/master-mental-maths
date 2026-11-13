"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Database,
  Database as DatabaseX,
  CheckCircle,
  XCircle,
  BarChart3,
  Users,
  BookOpen,
  MessageSquare,
  Lightbulb,
  Target,
} from "lucide-react"


// Server Actions
import {
  mockQuestions,
  mockCategories,
  mockFlashcardSets,
  mockFlashcards,
  mockMotivationalQuotes,
  mockDailyTips,
} from "@/lib/mock-data"

// Server Actions
import {
  getAdminData,
  createQuote as createQuoteAction,
  updateQuote as updateQuoteAction,
  deleteQuote as deleteQuoteAction,
  createTip as createTipAction,
  updateTip as updateTipAction,
  deleteTip as deleteTipAction
} from "@/actions/admin-actions"
import {
  createQuestion as createQuestionAction,
  updateQuestion as updateQuestionAction,
  deleteQuestion as deleteQuestionAction
} from "@/actions/question-actions"
import {
  createCategory as createCategoryAction,
  updateCategory as updateCategoryAction,
  deleteCategory as deleteCategoryAction
} from "@/actions/category-actions"
import {
  createFlashcardSet as createFlashcardSetAction,
  updateFlashcardSet as updateFlashcardSetAction,
  deleteFlashcardSet as deleteFlashcardSetAction,
  createFlashcard as createFlashcardAction,
  updateFlashcard as updateFlashcardAction,
  deleteFlashcard as deleteFlashcardAction
} from "@/actions/flashcard-actions"

// ... Types interfaces ... (keeping them for now, though they could be imported)
// Types
interface Category {
  id: string
  title: string
  description: string
  icon?: string
  difficulty: string
  time_estimate?: string
  color: string
  question_count?: number
}

// ... other interfaces ... (keeping as is for now to minimize diff, assuming they match)
interface Question {
  id: string
  category: string
  question: string
  answer: number
  difficulty_level: number
  hint?: string
  explanation?: string
  tags?: string[]
}

interface FlashcardSet {
  id: string
  name: string
  description: string
  card_count?: number
}

interface Flashcard {
  id: string
  set_id: string
  front: string
  back: string
  order_index: number
}

interface LearningCategory {
  id: string
  title: string
  description: string
  color: string
  icon?: string
  gradient?: string
  border?: string
  concept_count?: number
}

interface LearningConcept {
  id: string
  category_id: string
  title: string
  difficulty: string
  time: string
  description: string
  content: string
  practice_exercises?: any[]
}

interface MotivationalQuote {
  id: string
  quote: string
  author: string
  category: string
  is_active: boolean
}

interface DailyTip {
  id: string
  tip: string
  category: string
  difficulty: string
  is_active: boolean
}

export function ComprehensiveAdminPanel({ initialData }: { initialData?: any }) {
  // State for database connection
  const [isConnected, setIsConnected] = useState(initialData?.isConnected ?? false)
  const [isLoading, setIsLoading] = useState(!initialData)

  // State for all data types
  // Initialize with initialData if available, otherwise empty array
  const [categories, setCategories] = useState<Category[]>(
    initialData?.categories ?
      initialData.categories.map((cat: any) => ({
        ...cat,
        question_count: (initialData.questions || []).filter((q: any) => q.category === cat.id).length
      })) : []
  )
  const [questions, setQuestions] = useState<Question[]>(initialData?.questions || [])
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>(
    initialData?.flashcardSets ?
      initialData.flashcardSets.map((set: any) => ({
        ...set,
        card_count: (initialData.flashcards || []).filter((c: any) => c.set_id === set.id).length
      })) : []
  )
  const [flashcards, setFlashcards] = useState<Flashcard[]>(initialData?.flashcards || [])
  const [learningCategories, setLearningCategories] = useState<LearningCategory[]>([])
  const [learningConcepts, setLearningConcepts] = useState<LearningConcept[]>([])
  const [motivationalQuotes, setMotivationalQuotes] = useState<MotivationalQuote[]>(initialData?.motivationalQuotes || [])
  const [dailyTips, setDailyTips] = useState<DailyTip[]>(initialData?.dailyTips || [])

  // UI state
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("")
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null)

  // Form states
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)
  const [editingFlashcardSet, setEditingFlashcardSet] = useState<FlashcardSet | null>(null)
  const [editingFlashcard, setEditingFlashcard] = useState<Flashcard | null>(null)
  const [editingQuote, setEditingQuote] = useState<MotivationalQuote | null>(null)
  const [editingTip, setEditingTip] = useState<DailyTip | null>(null)

  // Mock data definitions... (keeping them for fallback)

  // ... (Mock data definitions omitted for brevity - assuming they are below this block) ...

  // Check database connection
  useEffect(() => {
    if (!initialData) {
      loadAllData()
    }
  }, [initialData])

  /* Removed checkConnection as loadAllData handles it */

  const loadAllData = async () => {
    try {
      setIsLoading(true)
      const data = await getAdminData()

      if (data.error) {
        console.warn("DB Error:", data.error)
        setIsConnected(false)
        // Fallback is handled inside getAdminData return or here if needed? 
        // getAdminData returns mocks on error, so we can use them.
      } else {
        setIsConnected(!!data.isConnected)
      }

      // Map data to local state
      // Categories: count logic needed?
      // The aggregated data from server might need counts if not provided directly.
      // But for now let's map what we have.

      const mappedCategories = (data.categories as any[]).map(cat => ({
        ...cat,
        question_count: (data.questions as any[]).filter((q: any) => q.category === cat.id).length // simplistic count
      }))
      setCategories(mappedCategories)

      setQuestions(data.questions as Question[])

      const mappedSets = (data.flashcardSets as any[]).map(set => ({
        ...set,
        card_count: (data.flashcards as any[]).filter((c: any) => c.set_id === set.id).length
      }))
      setFlashcardSets(mappedSets)

      setFlashcards(data.flashcards as Flashcard[])
      setMotivationalQuotes(data.motivationalQuotes as MotivationalQuote[])
      setDailyTips(data.dailyTips as DailyTip[])

    } catch (error) {
      console.error("Error loading data:", error)
      showNotification("error", "Failed to load data from database")
    } finally {
      setIsLoading(false)
    }
  }

  const loadMockData = () => {
    // Enhanced mock data that matches the main app structure
    const enhancedMockFlashcardSets: FlashcardSet[] = [
      {
        id: "percent-fraction",
        name: "% ↔ Fraction",
        description: "Convert between percentages and fractions",
        card_count: 20,
      },
      {
        id: "decimal-percent-fraction",
        name: "Decimal ↔ % ↔ Fraction",
        description: "Three-way conversions between decimals, percentages, and fractions",
        card_count: 15,
      },
      {
        id: "increase-decrease",
        name: "Increase/Decrease",
        description: "Percentage increase and decrease calculations",
        card_count: 12,
      },
      {
        id: "squares-cubes",
        name: "Squares & Cubes",
        description: "Perfect squares and cubes memorization",
        card_count: 25,
      },
      {
        id: "multiplication-tricks",
        name: "Multiplication Tricks",
        description: "Quick multiplication techniques and shortcuts",
        card_count: 18,
      },
      {
        id: "division-shortcuts",
        name: "Division Shortcuts",
        description: "Fast division methods and mental math tricks",
        card_count: 16,
      },
      {
        id: "number-patterns",
        name: "Number Patterns",
        description: "Recognize and use mathematical patterns",
        card_count: 14,
      },
    ]

    const enhancedMockFlashcards: Flashcard[] = [
      // % ↔ Fraction cards
      { id: "1", set_id: "percent-fraction", front: "25%", back: "1/4", order_index: 1 },
      { id: "2", set_id: "percent-fraction", front: "50%", back: "1/2", order_index: 2 },
      { id: "3", set_id: "percent-fraction", front: "75%", back: "3/4", order_index: 3 },
      { id: "4", set_id: "percent-fraction", front: "20%", back: "1/5", order_index: 4 },
      { id: "5", set_id: "percent-fraction", front: "40%", back: "2/5", order_index: 5 },
      { id: "6", set_id: "percent-fraction", front: "60%", back: "3/5", order_index: 6 },
      { id: "7", set_id: "percent-fraction", front: "80%", back: "4/5", order_index: 7 },
      { id: "8", set_id: "percent-fraction", front: "10%", back: "1/10", order_index: 8 },
      { id: "9", set_id: "percent-fraction", front: "30%", back: "3/10", order_index: 9 },
      { id: "10", set_id: "percent-fraction", front: "70%", back: "7/10", order_index: 10 },
      { id: "11", set_id: "percent-fraction", front: "90%", back: "9/10", order_index: 11 },
      { id: "12", set_id: "percent-fraction", front: "12.5%", back: "1/8", order_index: 12 },
      { id: "13", set_id: "percent-fraction", front: "37.5%", back: "3/8", order_index: 13 },
      { id: "14", set_id: "percent-fraction", front: "62.5%", back: "5/8", order_index: 14 },
      { id: "15", set_id: "percent-fraction", front: "87.5%", back: "7/8", order_index: 15 },
      { id: "16", set_id: "percent-fraction", front: "16.67%", back: "1/6", order_index: 16 },
      { id: "17", set_id: "percent-fraction", front: "33.33%", back: "1/3", order_index: 17 },
      { id: "18", set_id: "percent-fraction", front: "66.67%", back: "2/3", order_index: 18 },
      { id: "19", set_id: "percent-fraction", front: "83.33%", back: "5/6", order_index: 19 },
      { id: "20", set_id: "percent-fraction", front: "100%", back: "1/1", order_index: 20 },

      // Decimal ↔ % ↔ Fraction cards
      { id: "21", set_id: "decimal-percent-fraction", front: "0.25", back: "25% = 1/4", order_index: 1 },
      { id: "22", set_id: "decimal-percent-fraction", front: "0.5", back: "50% = 1/2", order_index: 2 },
      { id: "23", set_id: "decimal-percent-fraction", front: "0.75", back: "75% = 3/4", order_index: 3 },
      { id: "24", set_id: "decimal-percent-fraction", front: "0.2", back: "20% = 1/5", order_index: 4 },
      { id: "25", set_id: "decimal-percent-fraction", front: "0.4", back: "40% = 2/5", order_index: 5 },
      { id: "26", set_id: "decimal-percent-fraction", front: "0.6", back: "60% = 3/5", order_index: 6 },
      { id: "27", set_id: "decimal-percent-fraction", front: "0.8", back: "80% = 4/5", order_index: 7 },
      { id: "28", set_id: "decimal-percent-fraction", front: "0.1", back: "10% = 1/10", order_index: 8 },
      { id: "29", set_id: "decimal-percent-fraction", front: "0.3", back: "30% = 3/10", order_index: 9 },
      { id: "30", set_id: "decimal-percent-fraction", front: "0.7", back: "70% = 7/10", order_index: 10 },
      { id: "31", set_id: "decimal-percent-fraction", front: "0.9", back: "90% = 9/10", order_index: 11 },
      { id: "32", set_id: "decimal-percent-fraction", front: "0.125", back: "12.5% = 1/8", order_index: 12 },
      { id: "33", set_id: "decimal-percent-fraction", front: "0.375", back: "37.5% = 3/8", order_index: 13 },
      { id: "34", set_id: "decimal-percent-fraction", front: "0.625", back: "62.5% = 5/8", order_index: 14 },
      { id: "35", set_id: "decimal-percent-fraction", front: "0.875", back: "87.5% = 7/8", order_index: 15 },

      // Increase/Decrease cards
      { id: "36", set_id: "increase-decrease", front: "Increase 100 by 25%", back: "125", order_index: 1 },
      { id: "37", set_id: "increase-decrease", front: "Decrease 100 by 25%", back: "75", order_index: 2 },
      { id: "38", set_id: "increase-decrease", front: "Increase 80 by 50%", back: "120", order_index: 3 },
      { id: "39", set_id: "increase-decrease", front: "Decrease 80 by 50%", back: "40", order_index: 4 },
      { id: "40", set_id: "increase-decrease", front: "Increase 200 by 10%", back: "220", order_index: 5 },
      { id: "41", set_id: "increase-decrease", front: "Decrease 200 by 10%", back: "180", order_index: 6 },
      { id: "42", set_id: "increase-decrease", front: "Increase 50 by 20%", back: "60", order_index: 7 },
      { id: "43", set_id: "increase-decrease", front: "Decrease 50 by 20%", back: "40", order_index: 8 },
      { id: "44", set_id: "increase-decrease", front: "Increase 150 by 40%", back: "210", order_index: 9 },
      { id: "45", set_id: "increase-decrease", front: "Decrease 150 by 40%", back: "90", order_index: 10 },
      { id: "46", set_id: "increase-decrease", front: "Increase 300 by 15%", back: "345", order_index: 11 },
      { id: "47", set_id: "increase-decrease", front: "Decrease 300 by 15%", back: "255", order_index: 12 },

      // Squares & Cubes cards
      { id: "48", set_id: "squares-cubes", front: "11²", back: "121", order_index: 1 },
      { id: "49", set_id: "squares-cubes", front: "12²", back: "144", order_index: 2 },
      { id: "50", set_id: "squares-cubes", front: "13²", back: "169", order_index: 3 },
      { id: "51", set_id: "squares-cubes", front: "14²", back: "196", order_index: 4 },
      { id: "52", set_id: "squares-cubes", front: "15²", back: "225", order_index: 5 },
      { id: "53", set_id: "squares-cubes", front: "16²", back: "256", order_index: 6 },
      { id: "54", set_id: "squares-cubes", front: "17²", back: "289", order_index: 7 },
      { id: "55", set_id: "squares-cubes", front: "18²", back: "324", order_index: 8 },
      { id: "56", set_id: "squares-cubes", front: "19²", back: "361", order_index: 9 },
      { id: "57", set_id: "squares-cubes", front: "20²", back: "400", order_index: 10 },
      { id: "58", set_id: "squares-cubes", front: "21²", back: "441", order_index: 11 },
      { id: "59", set_id: "squares-cubes", front: "22²", back: "484", order_index: 12 },
      { id: "60", set_id: "squares-cubes", front: "23²", back: "529", order_index: 13 },
      { id: "61", set_id: "squares-cubes", front: "24²", back: "576", order_index: 14 },
      { id: "62", set_id: "squares-cubes", front: "25²", back: "625", order_index: 15 },
      { id: "63", set_id: "squares-cubes", front: "2³", back: "8", order_index: 16 },
      { id: "64", set_id: "squares-cubes", front: "3³", back: "27", order_index: 17 },
      { id: "65", set_id: "squares-cubes", front: "4³", back: "64", order_index: 18 },
      { id: "66", set_id: "squares-cubes", front: "5³", back: "125", order_index: 19 },
      { id: "67", set_id: "squares-cubes", front: "6³", back: "216", order_index: 20 },
      { id: "68", set_id: "squares-cubes", front: "7³", back: "343", order_index: 21 },
      { id: "69", set_id: "squares-cubes", front: "8³", back: "512", order_index: 22 },
      { id: "70", set_id: "squares-cubes", front: "9³", back: "729", order_index: 23 },
      { id: "71", set_id: "squares-cubes", front: "10³", back: "1000", order_index: 24 },
      { id: "72", set_id: "squares-cubes", front: "11³", back: "1331", order_index: 25 },

      // Multiplication Tricks cards
      {
        id: "73",
        set_id: "multiplication-tricks",
        front: "11 × 23",
        back: "253 (11 × any 2-digit: separate digits, add middle)",
        order_index: 1,
      },
      { id: "74", set_id: "multiplication-tricks", front: "11 × 45", back: "495", order_index: 2 },
      { id: "75", set_id: "multiplication-tricks", front: "11 × 67", back: "737", order_index: 3 },
      { id: "76", set_id: "multiplication-tricks", front: "25 × 24", back: "600 (25 × 4n = 100n)", order_index: 4 },
      { id: "77", set_id: "multiplication-tricks", front: "25 × 36", back: "900", order_index: 5 },
      { id: "78", set_id: "multiplication-tricks", front: "25 × 48", back: "1200", order_index: 6 },
      {
        id: "79",
        set_id: "multiplication-tricks",
        front: "9 × 67",
        back: "603 (9 × n: subtract 1 from tens, subtract from 10 for units)",
        order_index: 7,
      },
      { id: "80", set_id: "multiplication-tricks", front: "9 × 84", back: "756", order_index: 8 },
      { id: "81", set_id: "multiplication-tricks", front: "9 × 93", back: "837", order_index: 9 },
      {
        id: "82",
        set_id: "multiplication-tricks",
        front: "15 × 24",
        back: "360 (15 × even: half × 3 × 10)",
        order_index: 10,
      },
      { id: "83", set_id: "multiplication-tricks", front: "15 × 36", back: "540", order_index: 11 },
      { id: "84", set_id: "multiplication-tricks", front: "15 × 48", back: "720", order_index: 12 },
      { id: "85", set_id: "multiplication-tricks", front: "125 × 8", back: "1000 (125 × 8n = 1000n)", order_index: 13 },
      { id: "86", set_id: "multiplication-tricks", front: "125 × 16", back: "2000", order_index: 14 },
      { id: "87", set_id: "multiplication-tricks", front: "125 × 24", back: "3000", order_index: 15 },
      {
        id: "88",
        set_id: "multiplication-tricks",
        front: "37 × 3",
        back: "111 (37 × 3n gives repdigits)",
        order_index: 16,
      },
      { id: "89", set_id: "multiplication-tricks", front: "37 × 6", back: "222", order_index: 17 },
      { id: "90", set_id: "multiplication-tricks", front: "37 × 9", back: "333", order_index: 18 },

      // Division Shortcuts cards
      { id: "91", set_id: "division-shortcuts", front: "144 ÷ 12", back: "12 (÷12: think ÷4 then ÷3)", order_index: 1 },
      { id: "92", set_id: "division-shortcuts", front: "168 ÷ 12", back: "14", order_index: 2 },
      { id: "93", set_id: "division-shortcuts", front: "192 ÷ 12", back: "16", order_index: 3 },
      { id: "94", set_id: "division-shortcuts", front: "225 ÷ 15", back: "15 (÷15: think ÷3 then ÷5)", order_index: 4 },
      { id: "95", set_id: "division-shortcuts", front: "270 ÷ 15", back: "18", order_index: 5 },
      { id: "96", set_id: "division-shortcuts", front: "315 ÷ 15", back: "21", order_index: 6 },
      { id: "97", set_id: "division-shortcuts", front: "350 ÷ 25", back: "14 (÷25: ×4 then ÷100)", order_index: 7 },
      { id: "98", set_id: "division-shortcuts", front: "425 ÷ 25", back: "17", order_index: 8 },
      { id: "99", set_id: "division-shortcuts", front: "575 ÷ 25", back: "23", order_index: 9 },
      {
        id: "100",
        set_id: "division-shortcuts",
        front: "432 ÷ 18",
        back: "24 (÷18: think ÷2 then ÷9)",
        order_index: 10,
      },
      { id: "101", set_id: "division-shortcuts", front: "504 ÷ 18", back: "28", order_index: 11 },
      { id: "102", set_id: "division-shortcuts", front: "612 ÷ 18", back: "34", order_index: 12 },
      {
        id: "103",
        set_id: "division-shortcuts",
        front: "1000 ÷ 125",
        back: "8 (÷125: ×8 then ÷1000)",
        order_index: 13,
      },
      { id: "104", set_id: "division-shortcuts", front: "1250 ÷ 125", back: "10", order_index: 14 },
      { id: "105", set_id: "division-shortcuts", front: "1875 ÷ 125", back: "15", order_index: 15 },
      { id: "106", set_id: "division-shortcuts", front: "2000 ÷ 125", back: "16", order_index: 16 },

      // Number Patterns cards
      { id: "107", set_id: "number-patterns", front: "1, 4, 9, 16, ?", back: "25 (Perfect squares)", order_index: 1 },
      { id: "108", set_id: "number-patterns", front: "1, 8, 27, 64, ?", back: "125 (Perfect cubes)", order_index: 2 },
      { id: "109", set_id: "number-patterns", front: "2, 6, 12, 20, ?", back: "30 (n(n+1))", order_index: 3 },
      {
        id: "110",
        set_id: "number-patterns",
        front: "1, 3, 6, 10, ?",
        back: "15 (Triangular numbers)",
        order_index: 4,
      },
      { id: "111", set_id: "number-patterns", front: "1, 1, 2, 3, 5, ?", back: "8 (Fibonacci)", order_index: 5 },
      { id: "112", set_id: "number-patterns", front: "2, 4, 8, 16, ?", back: "32 (Powers of 2)", order_index: 6 },
      { id: "113", set_id: "number-patterns", front: "3, 9, 27, 81, ?", back: "243 (Powers of 3)", order_index: 7 },
      { id: "114", set_id: "number-patterns", front: "1, 4, 7, 10, ?", back: "13 (Arithmetic: +3)", order_index: 8 },
      { id: "115", set_id: "number-patterns", front: "2, 6, 18, 54, ?", back: "162 (Geometric: ×3)", order_index: 9 },
      { id: "116", set_id: "number-patterns", front: "5, 10, 20, 40, ?", back: "80 (Geometric: ×2)", order_index: 10 },
      {
        id: "117",
        set_id: "number-patterns",
        front: "1, 5, 14, 30, ?",
        back: "55 (Tetrahedral numbers)",
        order_index: 11,
      },
      { id: "118", set_id: "number-patterns", front: "0, 1, 4, 9, 16, ?", back: "25 (n²)", order_index: 12 },
      {
        id: "119",
        set_id: "number-patterns",
        front: "1, 2, 4, 7, 11, ?",
        back: "16 (Add consecutive integers)",
        order_index: 13,
      },
      {
        id: "120",
        set_id: "number-patterns",
        front: "100, 81, 64, 49, ?",
        back: "36 (Descending squares)",
        order_index: 14,
      },
    ]

    setCategories(mockCategories)
    setQuestions(mockQuestions)
    setFlashcardSets(enhancedMockFlashcardSets)
    setFlashcards(enhancedMockFlashcards)
    setMotivationalQuotes(mockMotivationalQuotes)
    setDailyTips(mockDailyTips)
  }

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  // Category operations
  // Category operations
  const saveCategory = async (category: Omit<Category, "id"> & { id?: string }) => {
    try {
      let result;
      if (category.id && category.id !== "") {
        // Update existing category
        const formData = new FormData();
        formData.append("title", category.title);
        formData.append("description", category.description);
        formData.append("difficulty", category.difficulty);
        formData.append("color", category.color);
        // Add other fields if necessary

        result = await updateCategoryAction(category.id, formData);
      } else {
        // Create new category
        const formData = new FormData();
        formData.append("title", category.title);
        formData.append("description", category.description);
        formData.append("difficulty", category.difficulty);
        formData.append("color", category.color);

        result = await createCategoryAction(formData);
      }

      if (result.error) {
        throw new Error(result.error);
      }

      await loadAllData();
      setEditingCategory(null);
      showNotification("success", `Category ${category.id ? "updated" : "created"} successfully`);
    } catch (error) {
      console.error("Error saving category:", error);
      showNotification("error", "Failed to save category");
    }
  }

  const deleteCategory = async (id: string) => {
    try {
      const result = await deleteCategoryAction(id);

      if (result.error) {
        throw new Error(result.error);
      }

      await loadAllData();
      showNotification("success", "Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
      showNotification("error", "Failed to delete category");
    }
  }

  // Question operations
  // Question operations
  const saveQuestion = async (question: Omit<Question, "id"> & { id?: string }) => {
    try {
      let result;
      if (question.id && question.id !== "") {
        // Update
        const formData = new FormData();
        formData.append("question", question.question);
        formData.append("answer", question.answer.toString());
        formData.append("category", question.category);
        formData.append("difficulty_level", question.difficulty_level.toString());
        if (question.hint) formData.append("hint", question.hint);
        if (question.explanation) formData.append("explanation", question.explanation);

        result = await updateQuestionAction(question.id, formData);
      } else {
        // Create
        const formData = new FormData();
        formData.append("question", question.question);
        formData.append("answer", question.answer.toString());
        formData.append("category", question.category);
        formData.append("difficulty_level", question.difficulty_level.toString());
        if (question.hint) formData.append("hint", question.hint);
        if (question.explanation) formData.append("explanation", question.explanation);

        result = await createQuestionAction(formData);
      }

      if (result.error) {
        throw new Error(result.error);
      }

      await loadAllData();
      setEditingQuestion(null);
      showNotification("success", `Question ${question.id ? "updated" : "created"} successfully`);
    } catch (error) {
      console.error("Error saving question:", error);
      showNotification("error", "Failed to save question");
    }
  }

  const deleteQuestion = async (id: string) => {
    try {
      const result = await deleteQuestionAction(id);

      if (result.error) {
        throw new Error(result.error);
      }

      await loadAllData();
      showNotification("success", "Question deleted successfully");
    } catch (error) {
      console.error("Error deleting question:", error);
      showNotification("error", "Failed to save question");
    }
  }

  // Flashcard Set operations
  // Flashcard Set operations
  const saveFlashcardSet = async (set: Omit<FlashcardSet, "id"> & { id?: string }) => {
    try {
      let result;
      if (set.id && set.id !== "") {
        // Update
        const formData = new FormData();
        formData.append("name", set.name);
        formData.append("description", set.description);

        result = await updateFlashcardSetAction(set.id, formData);
      } else {
        // Create
        const formData = new FormData();
        formData.append("name", set.name);
        formData.append("description", set.description);

        result = await createFlashcardSetAction(formData);
      }

      if (result.error) {
        throw new Error(result.error);
      }

      await loadAllData();
      setEditingFlashcardSet(null);
      showNotification("success", `Flashcard set ${set.id ? "updated" : "created"} successfully`);
    } catch (error) {
      console.error("Error saving flashcard set:", error);
      showNotification("error", "Failed to save flashcard set");
    }
  }

  const deleteFlashcardSet = async (id: string) => {
    try {
      const result = await deleteFlashcardSetAction(id);

      if (result.error) {
        throw new Error(result.error);
      }

      await loadAllData();
      showNotification("success", "Flashcard set deleted successfully");
    } catch (error) {
      console.error("Error deleting flashcard set:", error);
      showNotification("error", "Failed to save flashcard set");
    }
  }

  // Flashcard operations
  // Flashcard operations
  const saveFlashcard = async (flashcard: Omit<Flashcard, "id"> & { id?: string }) => {
    try {
      // Validate that the set_id exists
      if (!flashcard.set_id) {
        showNotification("error", "Please select a flashcard set");
        return;
      }

      // Check if the flashcard set exists
      const setExists = flashcardSets.some((set) => set.id === flashcard.set_id);
      if (!setExists) {
        showNotification("error", "Selected flashcard set does not exist");
        return;
      }

      let result;
      if (flashcard.id && flashcard.id !== "") {
        // Update
        const formData = new FormData();
        formData.append("set_id", flashcard.set_id);
        formData.append("front", flashcard.front);
        formData.append("back", flashcard.back);
        if (flashcard.order_index) formData.append("order_index", flashcard.order_index.toString());

        result = await updateFlashcardAction(flashcard.id, formData);
      } else {
        // Create
        const formData = new FormData();
        formData.append("set_id", flashcard.set_id);
        formData.append("front", flashcard.front);
        formData.append("back", flashcard.back);
        // Default order_index if not present? Backend handles it or we pass 0/next

        result = await createFlashcardAction(formData);
      }

      if (result.error) {
        throw new Error(result.error);
      }

      await loadAllData();
      setEditingFlashcard(null);
      showNotification("success", `Flashcard ${flashcard.id ? "updated" : "created"} successfully`);
    } catch (error) {
      console.error("Error saving flashcard:", error);
      showNotification("error", "Failed to save flashcard. Please ensure the flashcard set exists.");
    }
  }

  const deleteFlashcard = async (id: string) => {
    try {
      const result = await deleteFlashcardAction(id);

      if (result.error) {
        throw new Error(result.error);
      }

      await loadAllData();
      showNotification("success", "Flashcard deleted successfully");
    } catch (error) {
      console.error("Error deleting flashcard:", error);
      showNotification("error", "Failed to save flashcard");
    }
  }

  // Quote operations
  // Quote operations
  const saveQuote = async (quote: Omit<MotivationalQuote, "id"> & { id?: string }) => {
    try {
      let result;
      if (quote.id && quote.id !== "") {
        // Update
        const formData = new FormData();
        formData.append("quote", quote.quote);
        formData.append("author", quote.author);
        formData.append("category", quote.category);
        if (quote.is_active !== undefined) formData.append("is_active", quote.is_active.toString());

        result = await updateQuoteAction(quote.id, formData);
      } else {
        // Create
        const formData = new FormData();
        formData.append("quote", quote.quote);
        formData.append("author", quote.author);
        formData.append("category", quote.category);
        // Default is_active?

        result = await createQuoteAction(formData);
      }

      if (result.error) {
        throw new Error(result.error);
      }

      await loadAllData();
      setEditingQuote(null);
      showNotification("success", `Quote ${quote.id ? "updated" : "created"} successfully`);
    } catch (error) {
      console.error("Error saving quote:", error);
      showNotification("error", "Failed to save quote");
    }
  }

  const deleteQuote = async (id: string) => {
    try {
      const result = await deleteQuoteAction(id);

      if (result.error) {
        throw new Error(result.error);
      }

      await loadAllData();
      showNotification("success", "Quote deleted successfully");
    } catch (error) {
      console.error("Error deleting quote:", error);
      showNotification("error", "Failed to delete quote");
    }
  }

  // Tip operations
  // Tip operations
  const saveTip = async (tip: Omit<DailyTip, "id"> & { id?: string }) => {
    try {
      let result;
      if (tip.id && tip.id !== "") {
        // Update
        const formData = new FormData();
        formData.append("tip", tip.tip);
        formData.append("category", tip.category);
        formData.append("difficulty", tip.difficulty);
        if (tip.is_active !== undefined) formData.append("is_active", tip.is_active.toString());

        result = await updateTipAction(tip.id, formData);
      } else {
        // Create
        const formData = new FormData();
        formData.append("tip", tip.tip);
        formData.append("category", tip.category);
        formData.append("difficulty", tip.difficulty);

        result = await createTipAction(formData);
      }

      if (result.error) {
        throw new Error(result.error);
      }

      await loadAllData();
      setEditingTip(null);
      showNotification("success", `Tip ${tip.id ? "updated" : "created"} successfully`);
    } catch (error) {
      console.error("Error saving tip:", error);
      showNotification("error", "Failed to delete tip");
    }
  }

  const deleteTip = async (id: string) => {
    try {
      const result = await deleteTipAction(id);

      if (result.error) {
        throw new Error(result.error);
      }

      await loadAllData();
      showNotification("success", "Tip deleted successfully");
    } catch (error) {
      console.error("Error deleting tip:", error);
      showNotification("error", "Failed to delete tip");
    }
  }

  // Filter functions
  const filteredQuestions = questions.filter(
    (q) =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === "" || filterCategory === "all" || q.category === filterCategory),
  )

  const filteredFlashcards = flashcards.filter(
    (c) =>
      c.front.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.back.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredQuotes = motivationalQuotes.filter(
    (q) =>
      q.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.author.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredTips = dailyTips.filter((t) => t.tip.toLowerCase().includes(searchTerm.toLowerCase()))

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Speed Maths Admin Panel</h1>
          <p className="text-gray-600 mt-1">Manage all content for the Speed Maths application</p>
        </div>

        {/* Connection Status */}
        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <Database className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-600 font-medium">Connected to Database</span>
            </>
          ) : (
            <>
              <DatabaseX className="h-5 w-5 text-orange-600" />
              <span className="text-sm text-orange-600 font-medium">Offline Mode (Mock Data)</span>
            </>
          )}
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div
          className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${notification.type === "success"
            ? "bg-green-50 text-green-800 border border-green-200"
            : "bg-red-50 text-red-800 border border-red-200"
            }`}
        >
          {notification.type === "success" ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
          {notification.message}
        </div>
      )}

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="questions" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Questions
          </TabsTrigger>
          <TabsTrigger value="flashcards" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Flashcards
          </TabsTrigger>
          <TabsTrigger value="quotes" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Quotes
          </TabsTrigger>
          <TabsTrigger value="tips" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Tips
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{categories.length}</div>
                <p className="text-xs text-muted-foreground">Practice categories available</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{questions.length}</div>
                <p className="text-xs text-muted-foreground">Practice questions created</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Flashcard Sets</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{flashcardSets.length}</div>
                <p className="text-xs text-muted-foreground">{flashcards.length} total flashcards</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Motivational Quotes</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{motivationalQuotes.length}</div>
                <p className="text-xs text-muted-foreground">
                  {motivationalQuotes.filter((q) => q.is_active).length} active quotes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Daily Tips</CardTitle>
                <Lightbulb className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dailyTips.length}</div>
                <p className="text-xs text-muted-foreground">
                  {dailyTips.filter((t) => t.is_active).length} active tips
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Database Status</CardTitle>
                {isConnected ? (
                  <Database className="h-4 w-4 text-green-600" />
                ) : (
                  <DatabaseX className="h-4 w-4 text-orange-600" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isConnected ? "Online" : "Offline"}</div>
                <p className="text-xs text-muted-foreground">
                  {isConnected ? "Connected to Supabase" : "Using mock data"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Content Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Content Distribution</CardTitle>
              <CardDescription>Overview of content across different categories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                    <span className="font-medium">{category.title}</span>
                    <Badge variant="secondary">{category.difficulty}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{category.question_count || 0} questions</span>
                    <Progress value={(category.question_count || 0) * 10} className="w-20" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Practice Categories</h2>
              <p className="text-muted-foreground">Manage practice categories and their settings</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  onClick={() =>
                    setEditingCategory({
                      title: "",
                      description: "",
                      difficulty: "",
                      color: "bg-blue-500",
                    } as Category)
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingCategory?.id ? "Edit Category" : "Add New Category"}</DialogTitle>
                  <DialogDescription>Create or modify a practice category with its details.</DialogDescription>
                </DialogHeader>
                <CategoryForm
                  category={editingCategory}
                  onSave={saveCategory}
                  onCancel={() => setEditingCategory(null)}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card key={category.id} className="relative">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" onClick={() => setEditingCategory(category)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Category</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{category.title}"? This will also delete all associated
                              questions.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteCategory(category.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Difficulty:</span>
                      <Badge variant="outline">{category.difficulty}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Time Estimate:</span>
                      <span>{category.time_estimate || "Not set"}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Questions:</span>
                      <span className="font-medium">{category.question_count || 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Questions Tab */}
        <TabsContent value="questions" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Practice Questions</h2>
              <p className="text-muted-foreground">Manage questions for all practice categories</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  onClick={() =>
                    setEditingQuestion({
                      category: "",
                      question: "",
                      answer: 0,
                      difficulty_level: 1,
                    } as Question)
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>{editingQuestion?.id ? "Edit Question" : "Add New Question"}</DialogTitle>
                  <DialogDescription>
                    Create or modify a practice question with hints and explanations.
                  </DialogDescription>
                </DialogHeader>
                <QuestionForm
                  question={editingQuestion}
                  categories={categories}
                  onSave={saveQuestion}
                  onCancel={() => setEditingQuestion(null)}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {filteredQuestions.map((question) => (
              <Card key={question.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">
                          {categories.find((c) => c.id === question.category)?.title || question.category}
                        </Badge>
                        <Badge variant="secondary">Level {question.difficulty_level}</Badge>
                        {question.tags &&
                          question.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{question.question}</h3>
                      <p className="text-green-600 font-medium mb-2">Answer: {question.answer}</p>
                      {question.hint && (
                        <p className="text-sm text-muted-foreground mb-1">
                          <strong>Hint:</strong> {question.hint}
                        </p>
                      )}
                      {question.explanation && (
                        <p className="text-sm text-muted-foreground">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 ml-4">
                      <Button variant="ghost" size="sm" onClick={() => setEditingQuestion(question)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Question</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this question? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteQuestion(question.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Flashcards Tab */}
        <TabsContent value="flashcards" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Flashcards Management</h2>
              <p className="text-muted-foreground">Manage flashcard sets and individual cards</p>
            </div>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => setEditingFlashcardSet({ name: "", description: "" } as FlashcardSet)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Set
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingFlashcardSet?.id ? "Edit Flashcard Set" : "Add New Flashcard Set"}
                    </DialogTitle>
                  </DialogHeader>
                  <FlashcardSetForm
                    flashcardSet={editingFlashcardSet}
                    onSave={saveFlashcardSet}
                    onCancel={() => setEditingFlashcardSet(null)}
                  />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    onClick={() =>
                      setEditingFlashcard({ set_id: "", front: "", back: "", order_index: 1 } as Flashcard)
                    }
                    disabled={flashcardSets.length === 0}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Card
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingFlashcard?.id ? "Edit Flashcard" : "Add New Flashcard"}</DialogTitle>
                    {flashcardSets.length === 0 && (
                      <DialogDescription className="text-red-600">
                        Please create a flashcard set first before adding cards.
                      </DialogDescription>
                    )}
                  </DialogHeader>
                  <FlashcardForm
                    flashcard={editingFlashcard}
                    flashcardSets={flashcardSets}
                    onSave={saveFlashcard}
                    onCancel={() => setEditingFlashcard(null)}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Flashcard Sets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {flashcardSets.map((set) => (
              <Card key={set.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{set.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" onClick={() => setEditingFlashcardSet(set)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Flashcard Set</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{set.name}"? This will also delete all cards in this set.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteFlashcardSet(set.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <CardDescription>{set.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {set.card_count || flashcards.filter((c) => c.set_id === set.id).length} cards
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search Flashcards */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search flashcards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Flashcards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFlashcards.map((flashcard) => (
              <Card key={flashcard.id} className="relative">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="outline">
                      {flashcardSets.find((s) => s.id === flashcard.set_id)?.name || flashcard.set_id}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" onClick={() => setEditingFlashcard(flashcard)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Flashcard</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this flashcard?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteFlashcard(flashcard.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Front:</p>
                      <p className="font-semibold">{flashcard.front}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Back:</p>
                      <p className="text-green-600 font-medium">{flashcard.back}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Quotes Tab */}
        <TabsContent value="quotes" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Motivational Quotes</h2>
              <p className="text-muted-foreground">Manage inspirational quotes from Rahul Sir</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  onClick={() =>
                    setEditingQuote({
                      quote: "",
                      author: "Rahul Sir",
                      category: "motivation",
                      is_active: true,
                    } as MotivationalQuote)
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Quote
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>{editingQuote?.id ? "Edit Quote" : "Add New Quote"}</DialogTitle>
                </DialogHeader>
                <QuoteForm quote={editingQuote} onSave={saveQuote} onCancel={() => setEditingQuote(null)} />
              </DialogContent>
            </Dialog>
          </div>

          {/* Search Quotes */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search quotes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Quotes List */}
          <div className="space-y-4">
            {filteredQuotes.map((quote) => (
              <Card key={quote.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant={quote.is_active ? "default" : "secondary"}>
                          {quote.is_active ? "Active" : "Inactive"}
                        </Badge>
                        <Badge variant="outline">{quote.category}</Badge>
                      </div>
                      <blockquote className="text-lg font-medium mb-2 italic">"{quote.quote}"</blockquote>
                      <p className="text-sm text-muted-foreground">— {quote.author}</p>
                    </div>
                    <div className="flex items-center gap-1 ml-4">
                      <Button variant="ghost" size="sm" onClick={() => setEditingQuote(quote)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Quote</AlertDialogTitle>
                            <AlertDialogDescription>Are you sure you want to delete this quote?</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteQuote(quote.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tips Tab */}
        <TabsContent value="tips" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Daily Tips</h2>
              <p className="text-muted-foreground">Manage daily tips and learning strategies</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  onClick={() =>
                    setEditingTip({
                      tip: "",
                      category: "practice",
                      difficulty: "beginner",
                      is_active: true,
                    } as DailyTip)
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tip
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>{editingTip?.id ? "Edit Tip" : "Add New Tip"}</DialogTitle>
                </DialogHeader>
                <TipForm tip={editingTip} onSave={saveTip} onCancel={() => setEditingTip(null)} />
              </DialogContent>
            </Dialog>
          </div>

          {/* Search Tips */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search tips..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Tips List */}
          <div className="space-y-4">
            {filteredTips.map((tip) => (
              <Card key={tip.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant={tip.is_active ? "default" : "secondary"}>
                          {tip.is_active ? "Active" : "Inactive"}
                        </Badge>
                        <Badge variant="outline">{tip.category}</Badge>
                        <Badge variant="outline">{tip.difficulty}</Badge>
                      </div>
                      <p className="text-base">{tip.tip}</p>
                    </div>
                    <div className="flex items-center gap-1 ml-4">
                      <Button variant="ghost" size="sm" onClick={() => setEditingTip(tip)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Tip</AlertDialogTitle>
                            <AlertDialogDescription>Are you sure you want to delete this tip?</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteTip(tip.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Dialogs */}
      {editingCategory && (
        <Dialog open={!!editingCategory} onOpenChange={() => setEditingCategory(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingCategory.id ? "Edit Category" : "Add New Category"}</DialogTitle>
              <DialogDescription>Create or modify a practice category with its details.</DialogDescription>
            </DialogHeader>
            <CategoryForm category={editingCategory} onSave={saveCategory} onCancel={() => setEditingCategory(null)} />
          </DialogContent>
        </Dialog>
      )}

      {editingQuestion && (
        <Dialog open={!!editingQuestion} onOpenChange={() => setEditingQuestion(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingQuestion.id ? "Edit Question" : "Add New Question"}</DialogTitle>
              <DialogDescription>Create or modify a practice question with hints and explanations.</DialogDescription>
            </DialogHeader>
            <QuestionForm
              question={editingQuestion}
              categories={categories}
              onSave={saveQuestion}
              onCancel={() => setEditingQuestion(null)}
            />
          </DialogContent>
        </Dialog>
      )}

      {editingFlashcardSet && (
        <Dialog open={!!editingFlashcardSet} onOpenChange={() => setEditingFlashcardSet(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingFlashcardSet.id ? "Edit Flashcard Set" : "Add New Flashcard Set"}</DialogTitle>
            </DialogHeader>
            <FlashcardSetForm
              flashcardSet={editingFlashcardSet}
              onSave={saveFlashcardSet}
              onCancel={() => setEditingFlashcardSet(null)}
            />
          </DialogContent>
        </Dialog>
      )}

      {editingFlashcard && (
        <Dialog open={!!editingFlashcard} onOpenChange={() => setEditingFlashcard(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingFlashcard.id ? "Edit Flashcard" : "Add New Flashcard"}</DialogTitle>
            </DialogHeader>
            <FlashcardForm
              flashcard={editingFlashcard}
              flashcardSets={flashcardSets}
              onSave={saveFlashcard}
              onCancel={() => setEditingFlashcard(null)}
            />
          </DialogContent>
        </Dialog>
      )}

      {editingQuote && (
        <Dialog open={!!editingQuote} onOpenChange={() => setEditingQuote(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingQuote.id ? "Edit Quote" : "Add New Quote"}</DialogTitle>
            </DialogHeader>
            <QuoteForm quote={editingQuote} onSave={saveQuote} onCancel={() => setEditingQuote(null)} />
          </DialogContent>
        </Dialog>
      )}

      {editingTip && (
        <Dialog open={!!editingTip} onOpenChange={() => setEditingTip(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingTip.id ? "Edit Tip" : "Add New Tip"}</DialogTitle>
            </DialogHeader>
            <TipForm tip={editingTip} onSave={saveTip} onCancel={() => setEditingTip(null)} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

// Form Components
function CategoryForm({
  category,
  onSave,
  onCancel,
}: {
  category: Category | null
  onSave: (category: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    title: category?.title || "",
    description: category?.description || "",
    icon: category?.icon || "",
    difficulty: category?.difficulty || "Beginner",
    time_estimate: category?.time_estimate || "",
    color: category?.color || "bg-blue-500",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="icon">Icon</Label>
          <Input
            id="icon"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            placeholder="e.g., ➕"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Category title"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Category description"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select
            value={formData.difficulty}
            onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
              <SelectItem value="Expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="time_estimate">Time Estimate</Label>
          <Input
            id="time_estimate"
            value={formData.time_estimate}
            onChange={(e) => setFormData({ ...formData, time_estimate: e.target.value })}
            placeholder="e.g., 5-10 min"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="color">Color</Label>
        <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bg-red-500">Red</SelectItem>
            <SelectItem value="bg-blue-500">Blue</SelectItem>
            <SelectItem value="bg-green-500">Green</SelectItem>
            <SelectItem value="bg-yellow-500">Yellow</SelectItem>
            <SelectItem value="bg-purple-500">Purple</SelectItem>
            <SelectItem value="bg-pink-500">Pink</SelectItem>
            <SelectItem value="bg-indigo-500">Indigo</SelectItem>
            <SelectItem value="bg-teal-500">Teal</SelectItem>
            <SelectItem value="bg-orange-500">Orange</SelectItem>
            <SelectItem value="bg-cyan-500">Cyan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{category?.id ? "Update" : "Create"} Category</Button>
      </DialogFooter>
    </form>
  )
}

function QuestionForm({
  question,
  categories,
  onSave,
  onCancel,
}: {
  question: Question | null
  categories: Category[]
  onSave: (question: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    id: question?.id || "",
    category: question?.category || "",
    question: question?.question || "",
    answer: question?.answer || 0,
    difficulty_level: question?.difficulty_level || 1,
    hint: question?.hint || "",
    explanation: question?.explanation || "",
    tags: question?.tags?.join(", ") || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const questionData = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    }
    onSave(questionData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="difficulty_level">Difficulty Level</Label>
          <Select
            value={formData.difficulty_level.toString()}
            onValueChange={(value) => setFormData({ ...formData, difficulty_level: Number.parseInt(value) })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Level 1 (Easiest)</SelectItem>
              <SelectItem value="2">Level 2</SelectItem>
              <SelectItem value="3">Level 3</SelectItem>
              <SelectItem value="4">Level 4</SelectItem>
              <SelectItem value="5">Level 5 (Hardest)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="question">Question</Label>
        <Input
          id="question"
          value={formData.question}
          onChange={(e) => setFormData({ ...formData, question: e.target.value })}
          placeholder="Enter the question"
          required
        />
      </div>

      <div>
        <Label htmlFor="answer">Answer</Label>
        <Input
          id="answer"
          type="number"
          step="any"
          value={formData.answer}
          onChange={(e) => setFormData({ ...formData, answer: Number.parseFloat(e.target.value) || 0 })}
          placeholder="Enter the answer"
          required
        />
      </div>

      <div>
        <Label htmlFor="hint">Hint (Optional)</Label>
        <Input
          id="hint"
          value={formData.hint}
          onChange={(e) => setFormData({ ...formData, hint: e.target.value })}
          placeholder="Provide a helpful hint"
        />
      </div>

      <div>
        <Label htmlFor="explanation">Explanation (Optional)</Label>
        <Textarea
          id="explanation"
          value={formData.explanation}
          onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
          placeholder="Explain how to solve this problem"
        />
      </div>

      <div>
        <Label htmlFor="tags">Tags (Optional)</Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="Enter tags separated by commas"
        />
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{question?.id ? "Update" : "Create"} Question</Button>
      </DialogFooter>
    </form>
  )
}

function FlashcardSetForm({
  flashcardSet,
  onSave,
  onCancel,
}: {
  flashcardSet: FlashcardSet | null
  onSave: (set: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: flashcardSet?.name || "",
    description: flashcardSet?.description || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Set Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Flashcard set name"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe what this flashcard set covers"
          required
        />
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{flashcardSet?.id ? "Update" : "Create"} Set</Button>
      </DialogFooter>
    </form>
  )
}

function FlashcardForm({
  flashcard,
  flashcardSets,
  onSave,
  onCancel,
}: {
  flashcard: Flashcard | null
  flashcardSets: FlashcardSet[]
  onSave: (flashcard: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    id: flashcard?.id || "",
    set_id: flashcard?.set_id || "",
    front: flashcard?.front || "",
    back: flashcard?.back || "",
    order_index: flashcard?.order_index || 1,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate that a flashcard set is selected
    if (!formData.set_id) {
      alert("Please select a flashcard set")
      return
    }

    // Validate that the selected set exists
    const setExists = flashcardSets.some((set) => set.id === formData.set_id)
    if (!setExists) {
      alert("Selected flashcard set does not exist")
      return
    }

    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="set_id">Flashcard Set *</Label>
          <Select value={formData.set_id} onValueChange={(value) => setFormData({ ...formData, set_id: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select flashcard set" />
            </SelectTrigger>
            <SelectContent>
              {flashcardSets.length === 0 ? (
                <SelectItem value="no-sets" disabled>
                  No flashcard sets available
                </SelectItem>
              ) : (
                flashcardSets.map((set) => (
                  <SelectItem key={set.id} value={set.id}>
                    {set.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          {flashcardSets.length === 0 && (
            <p className="text-sm text-red-600 mt-1">Please create a flashcard set first</p>
          )}
        </div>
        <div>
          <Label htmlFor="order_index">Order</Label>
          <Input
            id="order_index"
            type="number"
            value={formData.order_index}
            onChange={(e) => setFormData({ ...formData, order_index: Number.parseInt(e.target.value) || 1 })}
            min="1"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="front">Front Side *</Label>
        <Input
          id="front"
          value={formData.front}
          onChange={(e) => setFormData({ ...formData, front: e.target.value })}
          placeholder="Question or prompt"
          required
        />
      </div>

      <div>
        <Label htmlFor="back">Back Side *</Label>
        <Input
          id="back"
          value={formData.back}
          onChange={(e) => setFormData({ ...formData, back: e.target.value })}
          placeholder="Answer or explanation"
          required
        />
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={flashcardSets.length === 0}>
          {flashcard?.id ? "Update" : "Create"} Flashcard
        </Button>
      </DialogFooter>
    </form>
  )
}

function QuoteForm({
  quote,
  onSave,
  onCancel,
}: {
  quote: MotivationalQuote | null
  onSave: (quote: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    id: quote?.id || "",
    quote: quote?.quote || "",
    author: quote?.author || "Rahul Sir",
    category: quote?.category || "motivation",
    is_active: quote?.is_active ?? true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="quote">Quote</Label>
        <Textarea
          id="quote"
          value={formData.quote}
          onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
          placeholder="Enter the motivational quote"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            placeholder="Quote author"
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="motivation">Motivation</SelectItem>
              <SelectItem value="learning">Learning</SelectItem>
              <SelectItem value="practice">Practice</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="mindset">Mindset</SelectItem>
              <SelectItem value="strategy">Strategy</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="is_active"
          checked={formData.is_active}
          onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
        />
        <Label htmlFor="is_active">Active</Label>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{quote?.id ? "Update" : "Create"} Quote</Button>
      </DialogFooter>
    </form>
  )
}

function TipForm({
  tip,
  onSave,
  onCancel,
}: {
  tip: DailyTip | null
  onSave: (tip: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    id: tip?.id || "",
    tip: tip?.tip || "",
    category: tip?.category || "practice",
    difficulty: tip?.difficulty || "beginner",
    is_active: tip?.is_active ?? true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="tip">Tip</Label>
        <Textarea
          id="tip"
          value={formData.tip}
          onChange={(e) => setFormData({ ...formData, tip: e.target.value })}
          placeholder="Enter the daily tip"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="practice">Practice</SelectItem>
              <SelectItem value="technique">Technique</SelectItem>
              <SelectItem value="strategy">Strategy</SelectItem>
              <SelectItem value="preparation">Preparation</SelectItem>
              <SelectItem value="mindset">Mindset</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select
            value={formData.difficulty}
            onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="is_active"
          checked={formData.is_active}
          onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
        />
        <Label htmlFor="is_active">Active</Label>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{tip?.id ? "Update" : "Create"} Tip</Button>
      </DialogFooter>
    </form>
  )
}
