"use client"

import { useState } from "react"
import {
  BookOpen,
  Lightbulb,
  Play,
  GraduationCap,
  Brain,
  ChevronRight,
  Sparkles,
  Target,
  Clock,
  CheckCircle,
  X,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MotivationalQuote } from "@/components/motivational-quote"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

const learningCategories = [
  {
    id: "basic-operations",
    title: "Foundation Skills",
    description: "Master the fundamentals",
    color: "sky",
    icon: BookOpen,
    gradient: "from-sky-500/10 to-sky-600/10",
    border: "border-sky-500/20",
    concepts: [
      {
        id: "addition-subtraction",
        title: "Addition & Subtraction Tricks",
        difficulty: "Beginner",
        time: "5-10 min",
        description: "Learn quick mental addition and subtraction techniques",
        content: `
          <h3>Quick Addition Techniques</h3>
          <p>Break numbers into friendly components:</p>
          <ul>
            <li>To add 298 + 167, think: 298 + 2 = 300, then 300 + 167 = 467, finally 467 - 2 = 465</li>
            <li>For adding multiple numbers, group them into tens: 7 + 8 + 3 + 2 = (7 + 3) + (8 + 2) = 10 + 10 = 20</li>
          </ul>
          
          <h3>Subtraction Shortcuts</h3>
          <p>Use compensation method:</p>
          <ul>
            <li>To calculate 83 - 29, add 1 to both: 84 - 30 = 54</li>
            <li>For 1001 - 997, rewrite as 1001 - 1000 + 3 = 4</li>
          </ul>
        `,
        practice: [
          {
            question: "Use the compensation method to calculate: 93 - 38 = ?",
            hint: "Add 2 to both numbers to make 95 - 40, which is easier to calculate mentally.",
            answer: 55,
            explanation: "93 - 38 = (93 + 2) - (38 + 2) = 95 - 40 = 55",
          },
          {
            question: "Use the breaking down method to calculate: 567 + 285 = ?",
            hint: "Break down 285 into 300 - 15, then add 567 + 300 and subtract 15.",
            answer: 852,
            explanation: "567 + 285 = 567 + (300 - 15) = 867 - 15 = 852",
          },
          {
            question: "Use grouping to calculate: 25 + 47 + 15 + 13 = ?",
            hint: "Group 25 + 15 = 40 and 47 + 13 = 60, then add the results.",
            answer: 100,
            explanation: "25 + 47 + 15 + 13 = (25 + 15) + (47 + 13) = 40 + 60 = 100",
          },
        ],
      },
      {
        id: "multiplication-division",
        title: "Multiplication & Division Strategies",
        difficulty: "Beginner",
        time: "10-15 min",
        description: "Master efficient multiplication and division shortcuts",
        content: `
          <h3>Multiplication Tricks</h3>
          <ul>
            <li>Multiply by 5: multiply by 10, then divide by 2</li>
            <li>Multiply by 9: multiply by 10, then subtract the original number</li>
            <li>Multiply by 11: For two-digit numbers, add the digits and place between them (e.g., 43 × 11 = 4(4+3)3 = 473)</li>
          </ul>
          
          <h3>Division Shortcuts</h3>
          <ul>
            <li>Divide by 5: divide by 10, then multiply by 2</li>
            <li>Divide by 0.5: multiply by 2</li>
            <li>Divide by 25: divide by 100, then multiply by 4</li>
          </ul>
        `,
        practice: [
          {
            question: "Use the multiply by 5 trick: 86 × 5 = ?",
            hint: "Multiply by 10, then divide by 2.",
            answer: 430,
            explanation: "86 × 5 = (86 × 10) ÷ 2 = 860 ÷ 2 = 430",
          },
          {
            question: "Use the multiply by 9 trick: 64 × 9 = ?",
            hint: "Multiply by 10, then subtract the original number.",
            answer: 576,
            explanation: "64 × 9 = (64 × 10) - 64 = 640 - 64 = 576",
          },
          {
            question: "Use the multiply by 11 trick: 72 × 11 = ?",
            hint: "Add the digits (7+2=9) and place between the original digits.",
            answer: 792,
            explanation: "72 × 11 = 7(7+2)2 = 792",
          },
        ],
      },
    ],
  },
  {
    id: "percentage",
    title: "Percentage Mastery",
    description: "Real-world percentage skills",
    color: "purple",
    icon: Target,
    gradient: "from-purple-500/10 to-purple-600/10",
    border: "border-purple-500/20",
    concepts: [
      {
        id: "basic-percentage",
        title: "Basic Percentage Techniques",
        difficulty: "Intermediate",
        time: "10-15 min",
        description: "Learn fundamental percentage calculation methods",
        content: `
          <h3>Finding Percentages</h3>
          <p>To find X% of Y:</p>
          <ul>
            <li>Move the decimal point in X two places left, then multiply by Y</li>
            <li>Example: 25% of 80 = 0.25 × 80 = 20</li>
          </ul>
          
          <h3>Common Percentage Conversions</h3>
          <ul>
            <li>50% = 1/2</li>
            <li>25% = 1/4</li>
            <li>20% = 1/5</li>
            <li>10% = 1/10</li>
            <li>33.33% = 1/3</li>
            <li>66.67% = 2/3</li>
            <li>75% = 3/4</li>
          </ul>
        `,
        practice: [
          {
            question: "Calculate 35% of 240",
            hint: "Convert 35% to 0.35, then multiply by 240.",
            answer: 84,
            explanation: "35% of 240 = 0.35 × 240 = 84",
          },
          {
            question: "Convert 3/8 to a percentage",
            hint: "Divide 3 by 8, then multiply by 100.",
            answer: 37.5,
            explanation: "3/8 = 0.375 = 37.5%",
          },
          {
            question: "What is 12.5% as a fraction in simplest form?",
            hint: "12.5% = 12.5/100 = 1/8",
            answer: "1/8",
            explanation: "12.5% = 12.5/100 = 125/1000 = 1/8",
          },
        ],
      },
      {
        id: "percentage-change",
        title: "Percentage Change Calculations",
        difficulty: "Intermediate",
        time: "15-20 min",
        description: "Master increase, decrease, and successive changes",
        content: `
          <h3>Percentage Increase</h3>
          <p>To increase a number by X%:</p>
          <ul>
            <li>Multiply by (1 + X/100)</li>
            <li>Example: Increase 50 by 20% = 50 × 1.2 = 60</li>
          </ul>
          
          <h3>Percentage Decrease</h3>
          <p>To decrease a number by X%:</p>
          <ul>
            <li>Multiply by (1 - X/100)</li>
            <li>Example: Decrease 80 by 25% = 80 × 0.75 = 60</li>
          </ul>
          
          <h3>Successive Percentage Changes</h3>
          <p>For successive changes of X% and Y%:</p>
          <ul>
            <li>Multiply by (1 + X/100) × (1 + Y/100)</li>
            <li>Example: Increase by 10%, then by 20% = 1.1 × 1.2 = 1.32 (32% increase)</li>
          </ul>
        `,
        practice: [
          {
            question: "Increase 150 by 30%",
            hint: "Multiply 150 by (1 + 30/100) = 1.3",
            answer: 195,
            explanation: "150 × 1.3 = 195",
          },
          {
            question: "Decrease 200 by 15%",
            hint: "Multiply 200 by (1 - 15/100) = 0.85",
            answer: 170,
            explanation: "200 × 0.85 = 170",
          },
          {
            question: "A number is increased by 20%, then decreased by 20%. What is the overall percentage change?",
            hint: "Calculate (1 + 20/100) × (1 - 20/100) = 1.2 × 0.8",
            answer: -4,
            explanation: "1.2 × 0.8 = 0.96, which represents a 4% decrease",
          },
        ],
      },
      {
        id: "reverse-percentage",
        title: "Reverse Percentage Problems",
        difficulty: "Advanced",
        time: "15-20 min",
        description: "Find original values from percentage results",
        content: `
          <h3>Finding Original Value After Increase</h3>
          <p>If Y is X% more than the original value:</p>
          <ul>
            <li>Original value = Y ÷ (1 + X/100)</li>
            <li>Example: 120 is 20% more than what? 120 ÷ 1.2 = 100</li>
          </ul>
          
          <h3>Finding Original Value After Decrease</h3>
          <p>If Y is X% less than the original value:</p>
          <ul>
            <li>Original value = Y ÷ (1 - X/100)</li>
            <li>Example: 80 is 20% less than what? 80 ÷ 0.8 = 100</li>
          </ul>
        `,
        practice: [
          {
            question: "156 is 30% more than what number?",
            hint: "Divide 156 by (1 + 30/100) = 1.3",
            answer: 120,
            explanation: "156 ÷ 1.3 = 120",
          },
          {
            question: "85 is 15% less than what number?",
            hint: "Divide 85 by (1 - 15/100) = 0.85",
            answer: 100,
            explanation: "85 ÷ 0.85 = 100",
          },
          {
            question: "A shirt costs $63 after a 10% discount. What was the original price?",
            hint: "Divide $63 by (1 - 10/100) = 0.9",
            answer: 70,
            explanation: "$63 ÷ 0.9 = $70",
          },
        ],
      },
    ],
  },
  {
    id: "special-techniques",
    title: "Power Techniques",
    description: "Advanced calculation methods",
    color: "pink",
    icon: Brain,
    gradient: "from-pink-500/10 to-pink-600/10",
    border: "border-pink-500/20",
    concepts: [
      {
        id: "squares",
        title: "Squaring Numbers",
        difficulty: "Advanced",
        time: "20-25 min",
        description: "Calculate squares instantly using proven patterns",
        content: `
          <h3>Squaring Numbers Ending in 5</h3>
          <p>For numbers ending in 5:</p>
          <ul>
            <li>Take the tens digit, multiply by (tens digit + 1), then append 25</li>
            <li>Example: 35² = 3 × 4 = 12, append 25 = 1225</li>
          </ul>
          
          <h3>Squaring Numbers Close to 100</h3>
          <p>For numbers close to 100:</p>
          <ul>
            <li>If number is 100 + n: (100 + n)² = 10000 + 200n + n²</li>
            <li>Example: 103² = 10000 + 600 + 9 = 10609</li>
            <li>If number is 100 - n: (100 - n)² = 10000 - 200n + n²</li>
            <li>Example: 97² = 10000 - 600 + 9 = 9409</li>
          </ul>
        `,
        practice: [
          {
            question: "Calculate 65² using the ending-in-5 technique",
            hint: "For 65, the tens digit is 6. Calculate 6 × (6+1) = 6 × 7, then append 25.",
            answer: 4225,
            explanation: "65² = 6 × (6+1) = 6 × 7 = 42, append 25 = 4225",
          },
          {
            question: "Calculate 105² using the close-to-100 technique",
            hint: "105 = 100 + 5, so 105² = 10000 + 200(5) + 5²",
            answer: 11025,
            explanation: "105² = 10000 + 200(5) + 5² = 10000 + 1000 + 25 = 11025",
          },
          {
            question: "Calculate 98² using the close-to-100 technique",
            hint: "98 = 100 - 2, so 98² = 10000 - 200(2) + 2²",
            answer: 9604,
            explanation: "98² = 10000 - 200(2) + 2² = 10000 - 400 + 4 = 9604",
          },
        ],
      },
      {
        id: "table-drill",
        title: "5×5 Table Drill Techniques",
        difficulty: "Expert",
        time: "20-30 min",
        description: "Advanced table analysis and percentage calculations",
        content: `
    <h3>Quick Row and Column Sums</h3>
    <p>For a 5×5 table:</p>
    <ul>
      <li>Identify patterns in each row and column</li>
      <li>Look for pairs that sum to 10 or 100 for faster addition</li>
      <li>Practice finding percentages of row and column totals</li>
    </ul>
    
    <h3>Percentage Calculations in Tables</h3>
    <p>To find what percentage a cell is of its row total:</p>
    <ul>
      <li>Divide the cell value by the row total, then multiply by 100</li>
      <li>Example: If cell value is 15 and row total is 60, then 15 ÷ 60 × 100 = 25%</li>
    </ul>
  `,
        practice: [
          {
            question: "Calculate the sum of Row 1 in the table below:",
            hint: "Add all numbers in the first row: 12 + 18 + 24 + 16 + 20",
            answer: 90,
            explanation: "Row 1 sum = 12 + 18 + 24 + 16 + 20 = 90",
            tableData: [
              [12, 18, 24, 16, 20],
              [15, 22, 18, 25, 10],
              [30, 14, 16, 12, 28],
              [8, 26, 20, 18, 28],
              [25, 10, 22, 19, 24],
            ],
            highlightType: "row",
            highlightIndex: 0,
          },
          {
            question: "Calculate the sum of Column 3 in the table below:",
            hint: "Add all numbers in the third column: 24 + 18 + 16 + 20 + 22",
            answer: 100,
            explanation: "Column 3 sum = 24 + 18 + 16 + 20 + 22 = 100",
            tableData: [
              [12, 18, 24, 16, 20],
              [15, 22, 18, 25, 10],
              [30, 14, 16, 12, 28],
              [8, 26, 20, 18, 28],
              [25, 10, 22, 19, 24],
            ],
            highlightType: "column",
            highlightIndex: 2,
          },
          {
            question: "What percentage of Row 2's total is the value 25 (4th cell)?",
            hint: "First calculate Row 2 total: 15 + 22 + 18 + 25 + 10 = 90. Then: (25 ÷ 90) × 100",
            answer: 27.8,
            explanation: "Row 2 total = 90. Percentage = (25 ÷ 90) × 100 = 27.8%",
            tableData: [
              [12, 18, 24, 16, 20],
              [15, 22, 18, 25, 10],
              [30, 14, 16, 12, 28],
              [8, 26, 20, 18, 28],
              [25, 10, 22, 19, 24],
            ],
            highlightType: "cell",
            highlightRow: 1,
            highlightCol: 3,
          },
        ],
      },
    ],
  },
]

export function LearningScreen() {
  const [selectedCategory, setSelectedCategory] = useState(learningCategories[0])
  const [selectedConcept, setSelectedConcept] = useState(selectedCategory.concepts[0])
  const [showPractice, setShowPractice] = useState(false)
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [isAnswerChecked, setIsAnswerChecked] = useState(false)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleCategoryChange = (categoryId: string) => {
    const category = learningCategories.find((cat) => cat.id === categoryId)
    if (category) {
      setSelectedCategory(category)
      setSelectedConcept(category.concepts[0])
      resetPractice()
    }
  }

  const handleConceptChange = (concept: any) => {
    setSelectedConcept(concept)
    resetPractice()
  }

  const resetPractice = () => {
    setShowPractice(false)
    setCurrentPracticeIndex(0)
    setUserAnswer("")
    setIsAnswerChecked(false)
    setIsAnswerCorrect(false)
    setShowHint(false)
    setShowExplanation(false)
  }

  const getPracticeLink = (conceptId: string) => {
    const practiceMap: Record<string, string> = {
      "addition-subtraction": "add-sub",
      "multiplication-division": "mult-div",
      squares: "squares",
      cubes: "cubes",
      "table-drill": "table",
      "basic-percentage": "increase",
      "percentage-change": "increase",
      "reverse-percentage": "reverse",
    }

    return practiceMap[conceptId] || "add-sub"
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
      case "Intermediate":
        return "text-amber-400 bg-amber-500/10 border-amber-500/30"
      case "Advanced":
        return "text-orange-400 bg-orange-500/10 border-orange-500/30"
      case "Expert":
        return "text-red-400 bg-red-500/10 border-red-500/30"
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/30"
    }
  }

  const handleCheckAnswer = () => {
    const currentPractice = selectedConcept.practice[currentPracticeIndex]

    // Handle both numeric and string answers
    let isCorrect = false
    if (typeof currentPractice.answer === "number") {
      const numericAnswer = Number.parseFloat(userAnswer)
      isCorrect = Math.abs(numericAnswer - currentPractice.answer) < 0.01
    } else {
      isCorrect = userAnswer.toLowerCase() === currentPractice.answer.toString().toLowerCase()
    }

    setIsAnswerChecked(true)
    setIsAnswerCorrect(isCorrect)
    if (isCorrect) {
      setShowExplanation(true)
    }
  }

  const handleNextPractice = () => {
    if (currentPracticeIndex < selectedConcept.practice.length - 1) {
      setCurrentPracticeIndex(currentPracticeIndex + 1)
      setUserAnswer("")
      setIsAnswerChecked(false)
      setIsAnswerCorrect(false)
      setShowHint(false)
      setShowExplanation(false)
    } else {
      // All practices completed
      setShowPractice(false)
    }
  }

  const currentPractice = selectedConcept.practice?.[currentPracticeIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-violet-500/5 to-transparent rounded-full"></div>
      </div>

      {/* Floating Math Symbols */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/6 text-7xl text-orange-500/10 animate-float-slow">∫</div>
        <div className="absolute top-3/4 right-1/6 text-5xl text-purple-500/10 animate-float-slow delay-500">∂</div>
        <div className="absolute top-1/2 left-1/12 text-6xl text-pink-500/10 animate-float-slow delay-1000">∇</div>
        <div className="absolute bottom-1/4 right-1/4 text-4xl text-sky-500/10 animate-float-slow delay-1500">∆</div>
        <div className="absolute top-1/6 right-1/3 text-5xl text-cyan-500/10 animate-float-slow delay-2000">Σ</div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-xl opacity-30 animate-pulse-slow"></div>
            <div className="relative inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 border border-orange-500/20 rounded-full backdrop-blur-sm">
              <GraduationCap className="h-5 w-5 text-orange-400 animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Learning Zone
              </span>
              <Brain className="h-5 w-5 text-red-400 animate-pulse delay-500" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              Master
            </span>
            <br />
            <span className="text-white drop-shadow-2xl">Every Concept</span>
          </h1>

          <div className="h-2 w-32 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full mx-auto mb-8 animate-pulse"></div>

          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Learn proven techniques and <span className="text-orange-400 font-semibold">master speed maths</span> with
            step-by-step guidance from Rahul Sir
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto mb-12">
            {[
              {
                value: "12",
                label: "Concepts",
                icon: BookOpen,
                color: "orange",
              },
              {
                value: "3",
                label: "Categories",
                icon: Target,
                color: "red",
              },
              {
                value: "50+",
                label: "Techniques",
                icon: Lightbulb,
                color: "pink",
              },
              {
                value: "∞",
                label: "Practice",
                icon: Brain,
                color: "purple",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 lg:p-6 hover:scale-105 transition-all duration-500 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className="relative text-center">
                  <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl bg-gradient-to-br from-gray-700/50 to-gray-800/50 border border-gray-600/50 flex items-center justify-center mb-3 lg:mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="h-5 w-5 lg:h-6 lg:w-6 text-orange-400" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-black text-orange-400 mb-1 lg:mb-2">{stat.value}</div>
                  <div className="text-xs text-gray-400 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full mb-6">
              <Target className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-400">Learning Categories</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Choose Your Focus</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Select a category to explore concepts and master speed maths techniques
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {learningCategories.map((category, index) => {
                const IconComponent = category.icon
                const isSelected = selectedCategory.id === category.id

                return (
                  <div
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`group relative cursor-pointer transition-all duration-500 ${
                      isSelected ? "scale-105 shadow-2xl shadow-orange-500/30" : "hover:scale-102 hover:shadow-xl"
                    }`}
                  >
                    {/* Background Card */}
                    <div
                      className={`relative overflow-hidden rounded-3xl border-2 transition-all duration-500 ${
                        isSelected
                          ? "border-orange-400 bg-gradient-to-br from-orange-500/30 to-orange-600/30"
                          : "border-gray-700/50 bg-gradient-to-br from-gray-900/80 to-gray-800/80 hover:border-gray-600"
                      }`}
                    >
                      {/* Animated Background Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-transparent to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Content */}
                      <div className="relative p-8 lg:p-10">
                        {/* Header */}
                        <div className="text-center mb-8">
                          <div className="relative inline-block mb-6">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                            <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500">
                              <IconComponent className="h-10 w-10 text-white" />
                            </div>
                          </div>

                          <h3
                            className={`text-2xl font-bold mb-3 ${isSelected ? "text-orange-400" : "text-white"} transition-colors duration-300`}
                          >
                            {category.title}
                          </h3>

                          <p className="text-gray-300 text-base leading-relaxed mb-4">{category.description}</p>

                          <Badge variant="outline" className="border-orange-500/30 text-orange-400 text-xs">
                            {category.concepts.length} concepts
                          </Badge>
                        </div>

                        {/* Selection Indicator */}
                        <div className="text-center">
                          <div
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                              isSelected
                                ? "border-orange-400 bg-orange-500/20 text-orange-400"
                                : "border-gray-600 bg-gray-800/50 text-gray-400 group-hover:border-gray-500"
                            }`}
                          >
                            {isSelected ? (
                              <>
                                <div className="h-2 w-2 rounded-full bg-orange-400 animate-pulse"></div>
                                <span className="text-sm font-medium">Selected</span>
                              </>
                            ) : (
                              <>
                                <div className="h-2 w-2 rounded-full bg-gray-500"></div>
                                <span className="text-sm font-medium">Click to Select</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Number Badge */}
                        <div className="absolute top-4 right-4">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 flex items-center justify-center">
                            <span className="text-sm font-bold text-orange-400">{index + 1}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Concepts Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500/10 to-purple-500/10 border border-sky-500/20 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-sky-400" />
              <span className="text-sm font-medium text-sky-400">{selectedCategory.title}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Learn the Concepts</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Master each concept with detailed explanations and practice exercises
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedCategory.concepts.map((concept, index) => (
                <div
                  key={concept.id}
                  onClick={() => handleConceptChange(concept)}
                  className={`group relative cursor-pointer transition-all duration-500 ${
                    selectedConcept.id === concept.id
                      ? "scale-105 shadow-2xl shadow-sky-500/30"
                      : "hover:scale-102 hover:shadow-xl"
                  }`}
                >
                  <div
                    className={`relative overflow-hidden rounded-3xl border-2 transition-all duration-500 ${
                      selectedConcept.id === concept.id
                        ? "border-sky-400 bg-gradient-to-br from-sky-500/30 to-sky-600/30"
                        : "border-gray-700/50 bg-gradient-to-br from-gray-900/80 to-gray-800/80 hover:border-gray-600"
                    }`}
                  >
                    {/* Animated Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Content */}
                    <div className="relative p-6 lg:p-8">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3
                            className={`text-xl font-bold mb-2 ${selectedConcept.id === concept.id ? "text-sky-400" : "text-white"} transition-colors duration-300`}
                          >
                            {concept.title}
                          </h3>
                          <p className="text-gray-300 text-sm leading-relaxed mb-4">{concept.description}</p>
                        </div>
                        <ChevronRight
                          className={`h-5 w-5 text-gray-500 group-hover:text-gray-300 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 ml-4 ${selectedConcept.id === concept.id ? "rotate-90" : ""}`}
                        />
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <Badge
                          variant="outline"
                          className={`text-xs font-semibold ${getDifficultyColor(concept.difficulty)}`}
                        >
                          {concept.difficulty}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {concept.time}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">
                        <Link href={`/practice/${getPracticeLink(concept.id)}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 border-gray-600 text-gray-300 hover:bg-gray-800 text-xs bg-transparent"
                          >
                            <Target className="h-3 w-3" />
                            Practice
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          className={`gap-2 text-xs ${selectedConcept.id === concept.id ? "bg-sky-600 hover:bg-sky-700" : "bg-gray-700 hover:bg-gray-600"}`}
                        >
                          <Play className="h-3 w-3" />
                          Learn
                        </Button>
                      </div>

                      {/* Number Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-sky-500/20 to-purple-500/20 border border-sky-500/30 flex items-center justify-center">
                          <span className="text-xs font-bold text-sky-400">{index + 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Display Section */}
        {!showPractice ? (
          <div className="mb-16">
            <Card className="max-w-6xl mx-auto bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-2xl">
              <CardHeader className="border-b border-gray-700/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-white text-2xl mb-2">{selectedConcept.title}</CardTitle>
                    <CardDescription className="text-gray-400 flex items-center gap-4">
                      <span>{selectedCategory.title}</span>
                      <Badge
                        variant="outline"
                        className={`text-xs font-semibold ${getDifficultyColor(selectedConcept.difficulty)}`}
                      >
                        {selectedConcept.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs">
                        <Clock className="h-3 w-3" />
                        {selectedConcept.time}
                      </div>
                    </CardDescription>
                  </div>
                  <div className="flex gap-3">
                    <Link href={`/practice/${getPracticeLink(selectedConcept.id)}`}>
                      <Button
                        variant="outline"
                        className="gap-2 border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        <Target className="h-4 w-4" />
                        Practice Now
                      </Button>
                    </Link>
                    <Button className="gap-2 bg-orange-600 hover:bg-orange-700">
                      <Play className="h-4 w-4" />
                      Watch Tutorial
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedConcept.content }}
                />
              </CardContent>
              <CardFooter className="border-t border-gray-700/50 flex justify-between">
                <div className="text-sm text-gray-400">
                  <span className="text-sky-400 font-medium">Pro Tip:</span> Practice makes perfect. Try the exercises
                  to reinforce your learning.
                </div>
                {selectedConcept.practice && selectedConcept.practice.length > 0 && (
                  <Button onClick={() => setShowPractice(true)} className="gap-2 bg-sky-600 hover:bg-sky-700">
                    <Sparkles className="h-4 w-4" />
                    Try Exercises
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        ) : (
          <div className="mb-16">
            <Card className="max-w-6xl mx-auto bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-2xl">
              <CardHeader className="border-b border-gray-700/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-white text-2xl mb-2">Practice Exercise</CardTitle>
                    <CardDescription className="text-gray-400">
                      {currentPracticeIndex + 1} of {selectedConcept.practice.length} exercises
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowPractice(false)}
                    className="gap-2 border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <BookOpen className="h-4 w-4" />
                    Back to Learning
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-8">
                  {/* Question */}
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-6 text-white">{currentPractice.question}</div>

                    <div className="max-w-md mx-auto">
                      <Input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Enter your answer"
                        className={`text-lg text-center bg-gray-900/50 border-gray-700 text-white ${
                          isAnswerChecked ? (isAnswerCorrect ? "border-green-500" : "border-red-500") : ""
                        }`}
                        disabled={isAnswerChecked && isAnswerCorrect}
                      />
                    </div>
                  </div>

                  {/* Feedback */}
                  {isAnswerChecked && (
                    <div className="flex items-center justify-center gap-2">
                      {isAnswerCorrect ? (
                        <div className="flex items-center gap-2 text-green-400">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">Correct!</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-400">
                          <X className="h-5 w-5" />
                          <span className="font-medium">Try again!</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Hint */}
                  {showHint && (
                    <Alert className="bg-gray-900/50 border-gray-700">
                      <Lightbulb className="h-4 w-4 text-sky-400" />
                      <AlertDescription className="text-gray-300 text-sm">{currentPractice.hint}</AlertDescription>
                    </Alert>
                  )}

                  {/* Explanation */}
                  {showExplanation && (
                    <div className="bg-sky-500/10 border border-sky-500/30 rounded-lg p-4">
                      <h4 className="text-sky-400 font-medium mb-2 flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        Explanation
                      </h4>
                      <p className="text-gray-300 text-sm">{currentPractice.explanation}</p>
                    </div>
                  )}

                  {/* Table Display for Table Drill */}
                  {currentPractice?.tableData && (
                    <div className="mb-8">
                      <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6">
                        <h4 className="text-sky-400 font-medium mb-4 text-center">5×5 Practice Table</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full max-w-md mx-auto">
                            <thead>
                              <tr>
                                <th className="w-12 h-8 text-xs text-gray-400"></th>
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <th key={i} className="w-12 h-8 text-xs text-gray-400 text-center">
                                    C{i + 1}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {currentPractice.tableData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                  <td className="w-12 h-12 text-xs text-gray-400 text-center font-medium">
                                    R{rowIndex + 1}
                                  </td>
                                  {row.map((cell, colIndex) => {
                                    let cellClass = "w-12 h-12 text-center text-sm font-medium border border-gray-600 "

                                    // Highlight logic
                                    if (
                                      currentPractice.highlightType === "row" &&
                                      rowIndex === currentPractice.highlightIndex
                                    ) {
                                      cellClass += "bg-sky-500/30 border-sky-400 text-sky-100"
                                    } else if (
                                      currentPractice.highlightType === "column" &&
                                      colIndex === currentPractice.highlightIndex
                                    ) {
                                      cellClass += "bg-purple-500/30 border-purple-400 text-purple-100"
                                    } else if (
                                      currentPractice.highlightType === "cell" &&
                                      rowIndex === currentPractice.highlightRow &&
                                      colIndex === currentPractice.highlightCol
                                    ) {
                                      cellClass += "bg-pink-500/30 border-pink-400 text-pink-100"
                                    } else {
                                      cellClass += "bg-gray-800/50 text-gray-300"
                                    }

                                    return (
                                      <td key={colIndex} className={cellClass}>
                                        {cell}
                                      </td>
                                    )
                                  })}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Legend */}
                        <div className="flex justify-center gap-4 mt-4 text-xs">
                          {currentPractice.highlightType === "row" && (
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-sky-500/30 border border-sky-400 rounded"></div>
                              <span className="text-sky-400">Highlighted Row</span>
                            </div>
                          )}
                          {currentPractice.highlightType === "column" && (
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-purple-500/30 border border-purple-400 rounded"></div>
                              <span className="text-purple-400">Highlighted Column</span>
                            </div>
                          )}
                          {currentPractice.highlightType === "cell" && (
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-pink-500/30 border border-pink-400 rounded"></div>
                              <span className="text-pink-400">Highlighted Cell</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-700/50 flex justify-between">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowHint(!showHint)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 text-xs"
                    disabled={isAnswerChecked && isAnswerCorrect}
                  >
                    {showHint ? "Hide Hint" : "Show Hint"}
                  </Button>

                  {isAnswerChecked && !isAnswerCorrect && (
                    <Button
                      variant="outline"
                      onClick={() => setShowExplanation(!showExplanation)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 text-xs"
                    >
                      {showExplanation ? "Hide Solution" : "Show Solution"}
                    </Button>
                  )}
                </div>

                <div className="flex gap-2">
                  {!isAnswerChecked ? (
                    <Button
                      onClick={handleCheckAnswer}
                      className="bg-sky-600 hover:bg-sky-700 text-xs"
                      disabled={!userAnswer}
                    >
                      Check Answer
                    </Button>
                  ) : (
                    <Button onClick={handleNextPractice} className="gap-2 bg-sky-600 hover:bg-sky-700 text-xs">
                      {currentPracticeIndex < selectedConcept.practice.length - 1 ? (
                        <>
                          <span>Next Exercise</span>
                          <ArrowRight className="h-3 w-3" />
                        </>
                      ) : (
                        <>
                          <span>Complete</span>
                          <CheckCircle className="h-3 w-3" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>

            {/* Progress Indicator */}
            <div className="max-w-6xl mx-auto mt-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-800 h-1 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-purple-500 rounded-full"
                    style={{ width: `${((currentPracticeIndex + 1) / selectedConcept.practice.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-400">
                  {currentPracticeIndex + 1}/{selectedConcept.practice.length}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Rahul Sir's Tips Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-full mb-6">
              <Lightbulb className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400">Rahul Sir's Wisdom</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Master's Tips</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Essential insights and motivational quotes from our founder
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                quote: "Speed is strategy practiced well.",
                context: "Focus on understanding patterns rather than memorizing formulas",
              },
              {
                quote: "You don't need talent. You need targets.",
                context: "Set specific goals and practice consistently to achieve mastery",
              },
              {
                quote: "Math isn't hard. It's just untrained memory.",
                context: "Regular practice builds the mental pathways for quick calculations",
              },
              {
                quote: "The secret to speed maths is pattern recognition.",
                context: "Learn to see the underlying patterns in numbers and operations",
              },
            ].map((tip, index) => (
              <Card
                key={index}
                className="group bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-xl hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500 hover:scale-105"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                        <Lightbulb className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <blockquote className="text-lg italic mb-3 text-yellow-400 leading-relaxed">
                        "{tip.quote}"
                      </blockquote>
                      <p className="text-sm text-gray-400 leading-relaxed">{tip.context}</p>
                      <div className="flex items-center justify-end mt-4 gap-2">
                        <div className="h-1 w-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></div>
                        <span className="text-xs text-gray-500 font-medium">Rahul Sir</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="max-w-3xl mx-auto">
          <MotivationalQuote />
        </div>
      </div>
    </div>
  )
}
