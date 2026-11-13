"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import {
  Plus,
  Edit,
  Trash2,
  Search,
  BarChart3,
  BookOpen,
  Target,
  AlertCircle,
  CheckCircle,
  X,
  Database,
  CreditCard,
  MessageSquare,
  Lightbulb,
  Eye,
  EyeOff,
} from "lucide-react"
import {
  type Question,
  type Category,
  type FlashcardSet,
  type Flashcard,
  type MotivationalQuote,
  type DailyTip,
} from "@/lib/mock-data"
// Server Actions
import { getAdminData, createQuote, createTip } from "@/actions/admin-actions"
import { createQuestion, updateQuestion, deleteQuestion } from "@/actions/question-actions"
import { createCategory, updateCategory, deleteCategory } from "@/actions/category-actions"
import { createFlashcardSet, createFlashcard } from "@/actions/flashcard-actions"

export function AdminPanel() {
  // Data states
  const [questions, setQuestions] = useState<Question[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([])
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [motivationalQuotes, setMotivationalQuotes] = useState<MotivationalQuote[]>([])
  const [dailyTips, setDailyTips] = useState<DailyTip[]>([])

  // UI states
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isDbConnected, setIsDbConnected] = useState(false)

  // Dialog states
  const [isAddingQuestion, setIsAddingQuestion] = useState(false)
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [isAddingFlashcardSet, setIsAddingFlashcardSet] = useState(false)
  const [isAddingFlashcard, setIsAddingFlashcard] = useState(false)
  const [isAddingQuote, setIsAddingQuote] = useState(false)
  const [isAddingTip, setIsAddingTip] = useState(false)

  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editingFlashcardSet, setEditingFlashcardSet] = useState<FlashcardSet | null>(null)
  const [editingFlashcard, setEditingFlashcard] = useState<Flashcard | null>(null)
  const [editingQuote, setEditingQuote] = useState<MotivationalQuote | null>(null)
  const [editingTip, setEditingTip] = useState<DailyTip | null>(null)

  // Filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [selectedFlashcardSet, setSelectedFlashcardSet] = useState<string>("all")

  // Form states
  const [questionForm, setQuestionForm] = useState({
    category: "",
    question: "",
    answer: "",
    difficulty_level: 1,
    hint: "",
    explanation: "",
    tags: "",
  })

  const [categoryForm, setCategoryForm] = useState({
    title: "",
    description: "",
    icon: "",
    difficulty: "Beginner",
    timeEstimate: "",
    color: "bg-blue-500",
  })

  const [flashcardSetForm, setFlashcardSetForm] = useState({
    name: "",
    description: "",
  })

  const [flashcardForm, setFlashcardForm] = useState({
    set_id: "",
    front: "",
    back: "",
    order_index: 1,
  })

  const [quoteForm, setQuoteForm] = useState({
    quote: "",
    author: "Rahul Sir",
    category: "motivation",
    is_active: true,
  })

  const [tipForm, setTipForm] = useState({
    tip: "",
    category: "practice",
    difficulty: "beginner",
    is_active: true,
  })

  // Load data on component mount
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await getAdminData()

      if (data.error) {
        setError(data.error)
      }

      setQuestions(data.questions as Question[])
      setCategories(data.categories as Category[])
      setFlashcardSets(data.flashcardSets as FlashcardSet[])
      setFlashcards(data.flashcards as Flashcard[])
      setMotivationalQuotes(data.motivationalQuotes as MotivationalQuote[])
      setDailyTips(data.dailyTips as DailyTip[])
      setIsDbConnected(!!data.isConnected)

    } catch (err) {
      console.warn("Error loading data:", err)
      setError("Failed to load data")
    } finally {
      setLoading(false)
    }
  }

  // CRUD Operations for Questions
  const handleAddQuestion = async () => {
    try {
      setError(null)
      if (!questionForm.question || !questionForm.answer || !questionForm.category) {
        setError("Please fill in all required fields")
        return
      }

      const newQuestionData = {
        category: questionForm.category,
        question: questionForm.question,
        answer: Number(questionForm.answer),
        difficulty_level: questionForm.difficulty_level,
        hint: questionForm.hint,
        explanation: questionForm.explanation,
        tags: questionForm.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      }

      const result = await createQuestion(newQuestionData)

      if (result.error) throw new Error(result.error)

      setQuestions([result.data as Question, ...questions])

      resetQuestionForm()
      setSuccess("Question added successfully!")
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError("Failed to add question")
    }
  }

  const handleEditQuestion = async () => {
    if (!editingQuestion) return

    try {
      setError(null)
      const updatedQuestionData = {
        category: questionForm.category,
        question: questionForm.question,
        answer: Number(questionForm.answer),
        difficulty_level: questionForm.difficulty_level,
        hint: questionForm.hint,
        explanation: questionForm.explanation,
        tags: questionForm.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      }

      const result = await updateQuestion(editingQuestion.id, updatedQuestionData)

      if (result.error) throw new Error(result.error)

      setQuestions(questions.map((q) => (q.id === editingQuestion.id ? (result.data as Question) : q)))
      resetQuestionForm()
      setSuccess("Question updated successfully!")
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError("Failed to update question")
    }
  }

  const handleDeleteQuestion = async (id: string) => {
    try {
      setError(null)
      const result = await deleteQuestion(id)

      if (result.error) throw new Error(result.error)

      setQuestions(questions.filter((q) => q.id !== id))
      setSuccess("Question deleted successfully!")
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError("Failed to delete question")
    }
  }

  // CRUD Operations for Categories
  const handleAddCategory = async () => {
    try {
      setError(null)
      if (!categoryForm.title || !categoryForm.description) {
        setError("Please fill in all required fields")
        return
      }

      const newCategoryData = {
        title: categoryForm.title,
        description: categoryForm.description,
        icon: categoryForm.icon,
        difficulty: categoryForm.difficulty,
        timeEstimate: categoryForm.timeEstimate,
        color: categoryForm.color,
      }

      const result = await createCategory(newCategoryData)

      if (result.error) throw new Error(result.error)

      setCategories([...categories, result.data as Category])
      resetCategoryForm()
      setSuccess("Category added successfully!")
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError("Failed to add category")
    }
  }

  const handleEditCategory = async () => {
    if (!editingCategory) return

    try {
      setError(null)
      const updatedCategoryData = {
        title: categoryForm.title,
        description: categoryForm.description,
        icon: categoryForm.icon,
        difficulty: categoryForm.difficulty,
        timeEstimate: categoryForm.timeEstimate,
        color: categoryForm.color,
      }

      const result = await updateCategory(editingCategory.id, updatedCategoryData)

      if (result.error) throw new Error(result.error)

      setCategories(categories.map((c) => (c.id === editingCategory.id ? (result.data as Category) : c)))
      resetCategoryForm()
      setSuccess("Category updated successfully!")
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError("Failed to update category")
    }
  }

  const handleDeleteCategory = async (id: string) => {
    try {
      setError(null)
      const result = await deleteCategory(id)

      if (result.error) throw new Error(result.error)

      setCategories(categories.filter((c) => c.id !== id))
      setSuccess("Category deleted successfully!")
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError("Failed to delete category")
    }
  }

  // CRUD Operations for Flashcard Sets
  const handleAddFlashcardSet = async () => {
    try {
      setError(null)
      if (!flashcardSetForm.name || !flashcardSetForm.description) {
        setError("Please fill in all required fields")
        return
      }

      const newSetData = {
        name: flashcardSetForm.name,
        description: flashcardSetForm.description,
      }

      const result = await createFlashcardSet(newSetData)
      if (result.error) throw new Error(result.error)

      setFlashcardSets([...flashcardSets, result.data as FlashcardSet])
      resetFlashcardSetForm()
      setSuccess("Flashcard set added successfully!")
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError("Failed to add flashcard set")
    }
  }

  // CRUD Operations for Flashcards
  const handleAddFlashcard = async () => {
    try {
      setError(null)
      if (!flashcardForm.set_id || !flashcardForm.front || !flashcardForm.back) {
        setError("Please fill in all required fields")
        return
      }

      const newFlashcardData = {
        set_id: flashcardForm.set_id,
        front: flashcardForm.front,
        back: flashcardForm.back,
        order_index: Number(flashcardForm.order_index),
      }

      const result = await createFlashcard(newFlashcardData)
      if (result.error) throw new Error(result.error)

      setFlashcards([...flashcards, result.data as Flashcard])
      resetFlashcardForm()
      setSuccess("Flashcard added successfully!")
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      console.error(err);
      setError("Failed to add flashcard")
    }
  }

  // CRUD Operations for Motivational Quotes
  const handleAddQuote = async () => {
    try {
      setError(null)
      if (!quoteForm.quote || !quoteForm.author) {
        setError("Please fill in all required fields")
        return
      }

      const newQuoteData = {
        quote: quoteForm.quote,
        author: quoteForm.author,
        category: quoteForm.category,
        is_active: quoteForm.is_active,
      }

      const result = await createQuote(newQuoteData)
      if (result.error) throw new Error(result.error)

      setMotivationalQuotes([result.data as MotivationalQuote, ...motivationalQuotes])
      resetQuoteForm()
      setSuccess("Quote added successfully!")
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError("Failed to add quote")
    }
  }

  // CRUD Operations for Daily Tips
  const handleAddTip = async () => {
    try {
      setError(null)
      if (!tipForm.tip) {
        setError("Please fill in all required fields")
        return
      }

      const newTipData = {
        tip: tipForm.tip,
        category: tipForm.category,
        difficulty: tipForm.difficulty,
        is_active: tipForm.is_active,
      }

      const result = await createTip(newTipData)
      if (result.error) throw new Error(result.error)

      setDailyTips([result.data as DailyTip, ...dailyTips])
      resetTipForm()
      setSuccess("Tip added successfully!")
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError("Failed to add tip")
    }
  }

  // Form reset functions
  const resetQuestionForm = () => {
    setQuestionForm({
      category: "",
      question: "",
      answer: "",
      difficulty_level: 1,
      hint: "",
      explanation: "",
      tags: "",
    })
    setEditingQuestion(null)
    setIsAddingQuestion(false)
  }

  const resetCategoryForm = () => {
    setCategoryForm({
      title: "",
      description: "",
      icon: "",
      difficulty: "Beginner",
      timeEstimate: "",
      color: "bg-blue-500",
    })
    setEditingCategory(null)
    setIsAddingCategory(false)
  }

  const resetFlashcardSetForm = () => {
    setFlashcardSetForm({
      name: "",
      description: "",
    })
    setEditingFlashcardSet(null)
    setIsAddingFlashcardSet(false)
  }

  const resetFlashcardForm = () => {
    setFlashcardForm({
      set_id: "",
      front: "",
      back: "",
      order_index: 1,
    })
    setEditingFlashcard(null)
    setIsAddingFlashcard(false)
  }

  const resetQuoteForm = () => {
    setQuoteForm({
      quote: "",
      author: "Rahul Sir",
      category: "motivation",
      is_active: true,
    })
    setEditingQuote(null)
    setIsAddingQuote(false)
  }

  const resetTipForm = () => {
    setTipForm({
      tip: "",
      category: "practice",
      difficulty: "beginner",
      is_active: true,
    })
    setEditingTip(null)
    setIsAddingTip(false)
  }

  // Utility functions
  const startEditQuestion = (question: Question) => {
    setEditingQuestion(question)
    setQuestionForm({
      category: question.category,
      question: question.question,
      answer: question.answer.toString(),
      difficulty_level: question.difficulty_level,
      hint: question.hint || "",
      explanation: question.explanation || "",
      tags: question.tags.join(", "),
    })
  }

  const startEditCategory = (category: Category) => {
    setEditingCategory(category)
    setCategoryForm({
      title: category.title,
      description: category.description,
      icon: category.icon,
      difficulty: category.difficulty,
      timeEstimate: category.timeEstimate,
      color: category.color,
    })
  }

  const getDifficultyColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-green-500"
      case 2:
        return "bg-blue-500"
      case 3:
        return "bg-yellow-500"
      case 4:
        return "bg-orange-500"
      case 5:
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getDifficultyLabel = (level: number) => {
    const labels = { 1: "Beginner", 2: "Easy", 3: "Medium", 4: "Hard", 5: "Expert" }
    return labels[level as keyof typeof labels] || "Unknown"
  }

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId)
    return category?.title || categoryId
  }

  const getFlashcardSetName = (setId: string) => {
    const set = flashcardSets.find((s) => s.id === setId)
    return set?.name || setId
  }

  // Filter functions
  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.answer.toString().includes(searchTerm.toLowerCase()) ||
      question.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || question.category === selectedCategory
    const matchesDifficulty =
      selectedDifficulty === "all" || question.difficulty_level.toString() === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const filteredFlashcards = flashcards.filter((flashcard) => {
    const matchesSearch =
      flashcard.front.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flashcard.back.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSet = selectedFlashcardSet === "all" || flashcard.set_id === selectedFlashcardSet

    return matchesSearch && matchesSet
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Speed Maths Admin Panel</h1>
            <p className="text-gray-400">Manage all content for the Speed Maths application</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isDbConnected ? "default" : "secondary"} className="gap-1">
              <Database className="h-3 w-3" />
              {isDbConnected ? "Database Connected" : "Local/Mock Mode"}
            </Badge>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <Alert className="mb-6 bg-red-900/50 border-red-500/50">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-200">{error}</AlertDescription>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 text-red-400 hover:text-red-300"
              onClick={() => setError(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 bg-green-900/50 border-green-500/50">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-200">{success}</AlertDescription>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 text-green-400 hover:text-green-300"
              onClick={() => setSuccess(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </Alert>
        )}

        <Tabs defaultValue="questions" className="space-y-6">
          <TabsList className="bg-gray-900 border-gray-700 grid w-full grid-cols-6">
            <TabsTrigger value="questions" className="data-[state=active]:bg-gray-800 text-gray-300">
              <BookOpen className="h-4 w-4 mr-2" />
              Questions ({questions.length})
            </TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-gray-800 text-gray-300">
              <Target className="h-4 w-4 mr-2" />
              Categories ({categories.length})
            </TabsTrigger>
            <TabsTrigger value="flashcards" className="data-[state=active]:bg-gray-800 text-gray-300">
              <CreditCard className="h-4 w-4 mr-2" />
              Flashcards ({flashcards.length})
            </TabsTrigger>
            <TabsTrigger value="quotes" className="data-[state=active]:bg-gray-800 text-gray-300">
              <MessageSquare className="h-4 w-4 mr-2" />
              Quotes ({motivationalQuotes.length})
            </TabsTrigger>
            <TabsTrigger value="tips" className="data-[state=active]:bg-gray-800 text-gray-300">
              <Lightbulb className="h-4 w-4 mr-2" />
              Tips ({dailyTips.length})
            </TabsTrigger>
            <TabsTrigger value="statistics" className="data-[state=active]:bg-gray-800 text-gray-300">
              <BarChart3 className="h-4 w-4 mr-2" />
              Statistics
            </TabsTrigger>
          </TabsList>

          {/* Questions Tab */}
          <TabsContent value="questions" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex-1 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-900 border-gray-700 text-white"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-40 bg-gray-900 border-gray-700 text-white">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="all" className="text-white">
                        All Categories
                      </SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id} className="text-white">
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger className="w-32 bg-gray-900 border-gray-700 text-white">
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="all" className="text-white">
                        All Levels
                      </SelectItem>
                      {[1, 2, 3, 4, 5].map((level) => (
                        <SelectItem key={level} value={level.toString()} className="text-white">
                          {getDifficultyLabel(level)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={() => setIsAddingQuestion(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </div>

            <div className="grid gap-4">
              {filteredQuestions.map((question) => (
                <Card key={question.id} className="bg-gray-900 border-gray-700">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg mb-2">{question.question}</CardTitle>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`${getDifficultyColor(question.difficulty_level)} text-white text-xs`}>
                            {getDifficultyLabel(question.difficulty_level)}
                          </Badge>
                          <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                            {getCategoryName(question.category)}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm">
                          <strong>Answer:</strong> {question.answer}
                        </p>
                        {question.hint && (
                          <p className="text-gray-400 text-sm mt-1">
                            <strong>Hint:</strong> {question.hint}
                          </p>
                        )}
                        {question.explanation && (
                          <p className="text-gray-400 text-sm mt-1">
                            <strong>Explanation:</strong> {question.explanation}
                          </p>
                        )}
                        {question.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {question.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startEditQuestion(question)}
                          className="text-gray-400 hover:text-white"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-gray-900 border-gray-700">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-white">Delete Question</AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-400">
                                Are you sure you want to delete this question? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-gray-600 text-gray-300">Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteQuestion(question.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}

              {filteredQuestions.length === 0 && (
                <Card className="bg-gray-900 border-gray-700">
                  <CardContent className="py-8 text-center">
                    <p className="text-gray-400">No questions found matching your criteria.</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Add/Edit Question Dialog */}
            <Dialog
              open={isAddingQuestion || editingQuestion !== null}
              onOpenChange={(open) => {
                if (!open) resetQuestionForm()
              }}
            >
              <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingQuestion ? "Edit Question" : "Add New Question"}</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    {editingQuestion
                      ? "Update the question details below."
                      : "Fill in the details for the new question."}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="question" className="text-white">
                      Question *
                    </Label>
                    <Textarea
                      id="question"
                      value={questionForm.question}
                      onChange={(e) => setQuestionForm({ ...questionForm, question: e.target.value })}
                      placeholder="Enter the question..."
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="answer" className="text-white">
                        Answer *
                      </Label>
                      <Input
                        id="answer"
                        type="number"
                        step="0.01"
                        value={questionForm.answer}
                        onChange={(e) => setQuestionForm({ ...questionForm, answer: e.target.value })}
                        placeholder="Enter the answer..."
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category" className="text-white">
                        Category *
                      </Label>
                      <Select
                        value={questionForm.category}
                        onValueChange={(value) => setQuestionForm({ ...questionForm, category: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id} className="text-white">
                              {category.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="difficulty" className="text-white">
                      Difficulty Level
                    </Label>
                    <Select
                      value={questionForm.difficulty_level.toString()}
                      onValueChange={(value) =>
                        setQuestionForm({ ...questionForm, difficulty_level: Number.parseInt(value) })
                      }
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <SelectItem key={level} value={level.toString()} className="text-white">
                            {getDifficultyLabel(level)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="hint" className="text-white">
                      Hint
                    </Label>
                    <Input
                      id="hint"
                      value={questionForm.hint}
                      onChange={(e) => setQuestionForm({ ...questionForm, hint: e.target.value })}
                      placeholder="Enter a hint (optional)..."
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="explanation" className="text-white">
                      Explanation
                    </Label>
                    <Textarea
                      id="explanation"
                      value={questionForm.explanation}
                      onChange={(e) => setQuestionForm({ ...questionForm, explanation: e.target.value })}
                      placeholder="Enter explanation (optional)..."
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tags" className="text-white">
                      Tags
                    </Label>
                    <Input
                      id="tags"
                      value={questionForm.tags}
                      onChange={(e) => setQuestionForm({ ...questionForm, tags: e.target.value })}
                      placeholder="Enter tags separated by commas..."
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={resetQuestionForm}
                    className="border-gray-600 text-gray-300 bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={editingQuestion ? handleEditQuestion : handleAddQuestion}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {editingQuestion ? "Update Question" : "Add Question"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Practice Categories</h2>
              <Button onClick={() => setIsAddingCategory(true)} className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <Card key={category.id} className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg ${category.color} flex items-center justify-center text-white text-lg`}
                        >
                          {category.icon}
                        </div>
                        <div>
                          <CardTitle className="text-white text-lg">{category.title}</CardTitle>
                          <CardDescription className="text-gray-400">{category.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startEditCategory(category)}
                          className="text-gray-400 hover:text-white"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-gray-900 border-gray-700">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-white">Delete Category</AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-400">
                                Are you sure you want to delete this category? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-gray-600 text-gray-300">Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteCategory(category.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <Badge variant="outline" className="border-gray-600 text-gray-300">
                        {category.difficulty}
                      </Badge>
                      <span className="text-gray-400">{category.timeEstimate}</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                      {questions.filter((q) => q.category === category.id).length} questions
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add/Edit Category Dialog */}
            <Dialog
              open={isAddingCategory || editingCategory !== null}
              onOpenChange={(open) => {
                if (!open) resetCategoryForm()
              }}
            >
              <DialogContent className="bg-gray-900 border-gray-700 text-white">
                <DialogHeader>
                  <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    {editingCategory
                      ? "Update the category details below."
                      : "Fill in the details for the new category."}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="categoryTitle" className="text-white">
                      Title *
                    </Label>
                    <Input
                      id="categoryTitle"
                      value={categoryForm.title}
                      onChange={(e) => setCategoryForm({ ...categoryForm, title: e.target.value })}
                      placeholder="Enter category title..."
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="categoryDescription" className="text-white">
                      Description *
                    </Label>
                    <Textarea
                      id="categoryDescription"
                      value={categoryForm.description}
                      onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                      placeholder="Enter category description..."
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="categoryIcon" className="text-white">
                        Icon
                      </Label>
                      <Input
                        id="categoryIcon"
                        value={categoryForm.icon}
                        onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                        placeholder="Enter emoji or icon..."
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="categoryDifficulty" className="text-white">
                        Difficulty
                      </Label>
                      <Select
                        value={categoryForm.difficulty}
                        onValueChange={(value) => setCategoryForm({ ...categoryForm, difficulty: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {["Beginner", "Intermediate", "Advanced", "Expert"].map((difficulty) => (
                            <SelectItem key={difficulty} value={difficulty} className="text-white">
                              {difficulty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="categoryTimeEstimate" className="text-white">
                        Time Estimate
                      </Label>
                      <Input
                        id="categoryTimeEstimate"
                        value={categoryForm.timeEstimate}
                        onChange={(e) => setCategoryForm({ ...categoryForm, timeEstimate: e.target.value })}
                        placeholder="e.g., 10-15 min"
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="categoryColor" className="text-white">
                        Color
                      </Label>
                      <Select
                        value={categoryForm.color}
                        onValueChange={(value) => setCategoryForm({ ...categoryForm, color: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {[
                            "bg-blue-500",
                            "bg-green-500",
                            "bg-purple-500",
                            "bg-red-500",
                            "bg-yellow-500",
                            "bg-pink-500",
                            "bg-indigo-500",
                            "bg-teal-500",
                            "bg-orange-500",
                            "bg-cyan-500",
                          ].map((color) => (
                            <SelectItem key={color} value={color} className="text-white">
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${color}`} />
                                {color.replace("bg-", "").replace("-500", "")}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={resetCategoryForm}
                    className="border-gray-600 text-gray-300 bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={editingCategory ? handleEditCategory : handleAddCategory}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {editingCategory ? "Update Category" : "Add Category"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Flashcards Tab */}
          <TabsContent value="flashcards" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Flashcard Management</h2>
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsAddingFlashcardSet(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Set
                </Button>
                <Button
                  onClick={() => setIsAddingFlashcard(true)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Card
                </Button>
              </div>
            </div>

            {/* Flashcard Sets */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Flashcard Sets</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {flashcardSets.map((set) => (
                  <Card key={set.id} className="bg-gray-900 border-gray-700">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-white text-lg">{set.name}</CardTitle>
                          <CardDescription className="text-gray-400">{set.description}</CardDescription>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400">
                        {flashcards.filter((card) => card.set_id === set.id).length} cards
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Flashcards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Flashcards</h3>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search flashcards..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-900 border-gray-700 text-white w-64"
                    />
                  </div>
                  <Select value={selectedFlashcardSet} onValueChange={setSelectedFlashcardSet}>
                    <SelectTrigger className="w-40 bg-gray-900 border-gray-700 text-white">
                      <SelectValue placeholder="Set" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="all" className="text-white">
                        All Sets
                      </SelectItem>
                      {flashcardSets.map((set) => (
                        <SelectItem key={set.id} value={set.id} className="text-white">
                          {set.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFlashcards.map((flashcard) => (
                  <Card key={flashcard.id} className="bg-gray-900 border-gray-700">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs mb-2">
                            {getFlashcardSetName(flashcard.set_id)}
                          </Badge>
                          <div className="space-y-2">
                            <div>
                              <p className="text-xs text-gray-500">Front:</p>
                              <p className="text-white font-medium">{flashcard.front}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Back:</p>
                              <p className="text-gray-300">{flashcard.back}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1 ml-2">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              {filteredFlashcards.length === 0 && (
                <Card className="bg-gray-900 border-gray-700">
                  <CardContent className="py-8 text-center">
                    <p className="text-gray-400">No flashcards found matching your criteria.</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Add Flashcard Set Dialog */}
            <Dialog
              open={isAddingFlashcardSet || editingFlashcardSet !== null}
              onOpenChange={(open) => {
                if (!open) resetFlashcardSetForm()
              }}
            >
              <DialogContent className="bg-gray-900 border-gray-700 text-white">
                <DialogHeader>
                  <DialogTitle>{editingFlashcardSet ? "Edit Flashcard Set" : "Add New Flashcard Set"}</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    {editingFlashcardSet
                      ? "Update the flashcard set details below."
                      : "Create a new flashcard set to organize your cards."}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="setName" className="text-white">
                      Name *
                    </Label>
                    <Input
                      id="setName"
                      value={flashcardSetForm.name}
                      onChange={(e) => setFlashcardSetForm({ ...flashcardSetForm, name: e.target.value })}
                      placeholder="Enter set name..."
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="setDescription" className="text-white">
                      Description *
                    </Label>
                    <Textarea
                      id="setDescription"
                      value={flashcardSetForm.description}
                      onChange={(e) => setFlashcardSetForm({ ...flashcardSetForm, description: e.target.value })}
                      placeholder="Enter set description..."
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={resetFlashcardSetForm}
                    className="border-gray-600 text-gray-300 bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddFlashcardSet} className="bg-purple-600 hover:bg-purple-700">
                    {editingFlashcardSet ? "Update Set" : "Add Set"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Add Flashcard Dialog */}
            <Dialog
              open={isAddingFlashcard || editingFlashcard !== null}
              onOpenChange={(open) => {
                if (!open) resetFlashcardForm()
              }}
            >
              <DialogContent className="bg-gray-900 border-gray-700 text-white">
                <DialogHeader>
                  <DialogTitle>{editingFlashcard ? "Edit Flashcard" : "Add New Flashcard"}</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    {editingFlashcard
                      ? "Update the flashcard details below."
                      : "Create a new flashcard with front and back content."}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="flashcardSet" className="text-white">
                      Flashcard Set *
                    </Label>
                    <Select
                      value={flashcardForm.set_id}
                      onValueChange={(value) => setFlashcardForm({ ...flashcardForm, set_id: value })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue placeholder="Select flashcard set" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        {flashcardSets.map((set) => (
                          <SelectItem key={set.id} value={set.id} className="text-white">
                            {set.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="flashcardFront" className="text-white">
                      Front *
                    </Label>
                    <Textarea
                      id="flashcardFront"
                      value={flashcardForm.front}
                      onChange={(e) => setFlashcardForm({ ...flashcardForm, front: e.target.value })}
                      placeholder="Enter front content..."
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="flashcardBack" className="text-white">
                      Back *
                    </Label>
                    <Textarea
                      id="flashcardBack"
                      value={flashcardForm.back}
                      onChange={(e) => setFlashcardForm({ ...flashcardForm, back: e.target.value })}
                      placeholder="Enter back content..."
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="flashcardOrder" className="text-white">
                      Order Index
                    </Label>
                    <Input
                      id="flashcardOrder"
                      type="number"
                      value={flashcardForm.order_index}
                      onChange={(e) =>
                        setFlashcardForm({ ...flashcardForm, order_index: Number.parseInt(e.target.value) || 1 })
                      }
                      placeholder="Enter order index..."
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={resetFlashcardForm}
                    className="border-gray-600 text-gray-300 bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddFlashcard} className="bg-green-600 hover:bg-green-700">
                    {editingFlashcard ? "Update Card" : "Add Card"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Quotes Tab */}
          <TabsContent value="quotes" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Motivational Quotes</h2>
              <Button onClick={() => setIsAddingQuote(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Quote
              </Button>
            </div>

            <div className="grid gap-4">
              {motivationalQuotes.map((quote) => (
                <Card key={quote.id} className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <blockquote className="text-lg italic text-white mb-2">"{quote.quote}"</blockquote>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                            {quote.author}
                          </Badge>
                          <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                            {quote.category}
                          </Badge>
                          <div className="flex items-center gap-1">
                            {quote.is_active ? (
                              <Eye className="h-3 w-3 text-green-400" />
                            ) : (
                              <EyeOff className="h-3 w-3 text-gray-500" />
                            )}
                            <span className="text-xs text-gray-400">{quote.is_active ? "Active" : "Inactive"}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}

              {motivationalQuotes.length === 0 && (
                <Card className="bg-gray-900 border-gray-700">
                  <CardContent className="py-8 text-center">
                    <p className="text-gray-400">No motivational quotes found.</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Add Quote Dialog */}
            <Dialog
              open={isAddingQuote || editingQuote !== null}
              onOpenChange={(open) => {
                if (!open) resetQuoteForm()
              }}
            >
              <DialogContent className="bg-gray-900 border-gray-700 text-white">
                <DialogHeader>
                  <DialogTitle>{editingQuote ? "Edit Quote" : "Add New Quote"}</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    {editingQuote ? "Update the quote details below." : "Add a new motivational quote."}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="quote" className="text-white">
                      Quote *
                    </Label>
                    <Textarea
                      id="quote"
                      value={quoteForm.quote}
                      onChange={(e) => setQuoteForm({ ...quoteForm, quote: e.target.value })}
                      placeholder="Enter the quote..."
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="author" className="text-white">
                        Author *
                      </Label>
                      <Input
                        id="author"
                        value={quoteForm.author}
                        onChange={(e) => setQuoteForm({ ...quoteForm, author: e.target.value })}
                        placeholder="Enter author name..."
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="quoteCategory" className="text-white">
                        Category
                      </Label>
                      <Select
                        value={quoteForm.category}
                        onValueChange={(value) => setQuoteForm({ ...quoteForm, category: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {["motivation", "learning", "success", "practice", "mindset"].map((category) => (
                            <SelectItem key={category} value={category} className="text-white">
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="quoteActive"
                      checked={quoteForm.is_active}
                      onCheckedChange={(checked) => setQuoteForm({ ...quoteForm, is_active: checked })}
                    />
                    <Label htmlFor="quoteActive" className="text-white">
                      Active (will be shown to users)
                    </Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={resetQuoteForm}
                    className="border-gray-600 text-gray-300 bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddQuote} className="bg-blue-600 hover:bg-blue-700">
                    {editingQuote ? "Update Quote" : "Add Quote"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Tips Tab */}
          <TabsContent value="tips" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Daily Tips</h2>
              <Button onClick={() => setIsAddingTip(true)} className="bg-yellow-600 hover:bg-yellow-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Tip
              </Button>
            </div>

            <div className="grid gap-4">
              {dailyTips.map((tip) => (
                <Card key={tip.id} className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-white mb-2">{tip.tip}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                            {tip.category}
                          </Badge>
                          <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                            {tip.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1">
                            {tip.is_active ? (
                              <Eye className="h-3 w-3 text-green-400" />
                            ) : (
                              <EyeOff className="h-3 w-3 text-gray-500" />
                            )}
                            <span className="text-xs text-gray-400">{tip.is_active ? "Active" : "Inactive"}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}

              {dailyTips.length === 0 && (
                <Card className="bg-gray-900 border-gray-700">
                  <CardContent className="py-8 text-center">
                    <p className="text-gray-400">No daily tips found.</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Add Tip Dialog */}
            <Dialog
              open={isAddingTip || editingTip !== null}
              onOpenChange={(open) => {
                if (!open) resetTipForm()
              }}
            >
              <DialogContent className="bg-gray-900 border-gray-700 text-white">
                <DialogHeader>
                  <DialogTitle>{editingTip ? "Edit Tip" : "Add New Tip"}</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    {editingTip ? "Update the tip details below." : "Add a new daily tip for users."}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="tip" className="text-white">
                      Tip *
                    </Label>
                    <Textarea
                      id="tip"
                      value={tipForm.tip}
                      onChange={(e) => setTipForm({ ...tipForm, tip: e.target.value })}
                      placeholder="Enter the tip..."
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tipCategory" className="text-white">
                        Category
                      </Label>
                      <Select
                        value={tipForm.category}
                        onValueChange={(value) => setTipForm({ ...tipForm, category: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {["practice", "technique", "strategy", "mindset", "preparation"].map((category) => (
                            <SelectItem key={category} value={category} className="text-white">
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="tipDifficulty" className="text-white">
                        Difficulty
                      </Label>
                      <Select
                        value={tipForm.difficulty}
                        onValueChange={(value) => setTipForm({ ...tipForm, difficulty: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {["beginner", "intermediate", "advanced"].map((difficulty) => (
                            <SelectItem key={difficulty} value={difficulty} className="text-white">
                              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="tipActive"
                      checked={tipForm.is_active}
                      onCheckedChange={(checked) => setTipForm({ ...tipForm, is_active: checked })}
                    />
                    <Label htmlFor="tipActive" className="text-white">
                      Active (will be shown to users)
                    </Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={resetTipForm}
                    className="border-gray-600 text-gray-300 bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddTip} className="bg-yellow-600 hover:bg-yellow-700">
                    {editingTip ? "Update Tip" : "Add Tip"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics" className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Content Statistics</h2>

            {/* Overview Stats */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-400">Total Questions</CardTitle>
                    <BookOpen className="h-4 w-4 text-blue-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{questions.length}</div>
                  <p className="text-xs text-gray-500 mt-1">Across {categories.length} categories</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-700">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-400">Flashcards</CardTitle>
                    <CreditCard className="h-4 w-4 text-green-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{flashcards.length}</div>
                  <p className="text-xs text-gray-500 mt-1">In {flashcardSets.length} sets</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-700">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-400">Active Quotes</CardTitle>
                    <MessageSquare className="h-4 w-4 text-purple-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {motivationalQuotes.filter((q) => q.is_active).length}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">of {motivationalQuotes.length} total quotes</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-700">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-400">Active Tips</CardTitle>
                    <Lightbulb className="h-4 w-4 text-yellow-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{dailyTips.filter((t) => t.is_active).length}</div>
                  <p className="text-xs text-gray-500 mt-1">of {dailyTips.length} total tips</p>
                </CardContent>
              </Card>
            </div>

            {/* Content Distribution */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Questions by Category */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Questions by Category</CardTitle>
                  <CardDescription className="text-gray-400">Distribution across practice categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categories.map((category) => {
                      const categoryQuestions = questions.filter((q) => q.category === category.id)
                      const percentage = questions.length > 0 ? (categoryQuestions.length / questions.length) * 100 : 0

                      return (
                        <div key={category.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${category.color}`} />
                              <span className="text-white text-sm">{category.title}</span>
                            </div>
                            <span className="text-gray-400 text-sm">
                              {categoryQuestions.length} ({percentage.toFixed(1)}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2">
                            <div className={`h-2 rounded-full ${category.color}`} style={{ width: `${percentage}%` }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Difficulty Distribution */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Question Difficulty</CardTitle>
                  <CardDescription className="text-gray-400">Breakdown by difficulty level</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((level) => {
                      const levelQuestions = questions.filter((q) => q.difficulty_level === level)
                      const percentage = questions.length > 0 ? (levelQuestions.length / questions.length) * 100 : 0
                      const color = getDifficultyColor(level)

                      return (
                        <div key={level} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${color}`} />
                              <span className="text-white text-sm">{getDifficultyLabel(level)}</span>
                            </div>
                            <span className="text-gray-400 text-sm">
                              {levelQuestions.length} ({percentage.toFixed(1)}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2">
                            <div className={`h-2 rounded-full ${color}`} style={{ width: `${percentage}%` }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Content Health */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Content Health</CardTitle>
                <CardDescription className="text-gray-400">Overview of content completeness</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {questions.filter((q) => q.explanation).length}
                    </div>
                    <p className="text-sm text-gray-400">Questions with explanations</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{questions.filter((q) => q.hint).length}</div>
                    <p className="text-sm text-gray-400">Questions with hints</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {motivationalQuotes.filter((q) => q.is_active).length}
                    </div>
                    <p className="text-sm text-gray-400">Active quotes</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">
                      {dailyTips.filter((t) => t.is_active).length}
                    </div>
                    <p className="text-sm text-gray-400">Active tips</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AdminPanel
