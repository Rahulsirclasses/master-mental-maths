"use client"

import Link from "next/link"
import React, { useState, useEffect } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ArrowLeft, Clock, Lightbulb, Target, Check, RefreshCw, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { MotivationalQuote } from "@/components/motivational-quote"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Table drill functions
const generateTable = () => {
  const table = []
  for (let i = 0; i < 5; i++) {
    const row = []
    for (let j = 0; j < 5; j++) {
      row.push(Math.floor(Math.random() * 99) + 1)
    }
    table.push(row)
  }
  return table
}

const calculateRowSums = (table: number[][]) => {
  return table.map((row) => row.reduce((sum, num) => sum + num, 0))
}

const calculateColumnSums = (table: number[][]) => {
  const columnSums = Array(5).fill(0)
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      columnSums[j] += table[i][j]
    }
  }
  return columnSums
}

const calculateRowPercentages = (table: number[][], rowSums: number[]) => {
  return table.map((row, i) => row.map((cell) => ((cell / rowSums[i]) * 100).toFixed(1)))
}

const calculateColumnPercentages = (table: number[][], columnSums: number[]) => {
  const percentages = []
  for (let i = 0; i < 5; i++) {
    const rowPercentages = []
    for (let j = 0; j < 5; j++) {
      rowPercentages.push(((table[i][j] / columnSums[j]) * 100).toFixed(1))
    }
    percentages.push(rowPercentages)
  }
  return percentages
}

const createInitialTableData = () => {
  const initialTable = generateTable()
  const initialRowSums = calculateRowSums(initialTable)
  const initialColumnSums = calculateColumnSums(initialTable)
  const initialRowPercentages = calculateRowPercentages(initialTable, initialRowSums)
  const initialColumnPercentages = calculateColumnPercentages(initialTable, initialColumnSums)

  return {
    table: initialTable,
    rowSums: initialRowSums,
    columnSums: initialColumnSums,
    rowPercentages: initialRowPercentages,
    columnPercentages: initialColumnPercentages,
  }
}

type DrillType = "row-sum" | "column-sum" | "row-percentage" | "column-percentage"

// Define exercise generators for each category with expanded question sets
const exerciseGenerators = {
  "add-sub": {
    title: "Addition & Subtraction",
    icon: "➕",
    generate: () => {
      const operation = Math.random() > 0.5 ? "+" : "-"
      const difficultyLevel = Math.ceil(Math.random() * 5) // Increased to 5 levels
      let a, b

      if (operation === "+") {
        switch (difficultyLevel) {
          case 1: // Basic 2-digit
            a = Math.floor(Math.random() * 90) + 10
            b = Math.floor(Math.random() * 90) + 10
            break
          case 2: // 3-digit
            a = Math.floor(Math.random() * 900) + 100
            b = Math.floor(Math.random() * 900) + 100
            break
          case 3: // 4-digit
            a = Math.floor(Math.random() * 9000) + 1000
            b = Math.floor(Math.random() * 9000) + 1000
            break
          case 4: // Decimals
            a = Math.round((Math.random() * 1000 + 100) * 10) / 10
            b = Math.round((Math.random() * 1000 + 100) * 10) / 10
            break
          case 5: // Large numbers
            a = Math.floor(Math.random() * 90000) + 10000
            b = Math.floor(Math.random() * 90000) + 10000
            break
        }
        return {
          question: `${a} ${operation} ${b} = ?`,
          answer: Math.round((a + b) * 10) / 10,
        }
      } else {
        switch (difficultyLevel) {
          case 1: // Basic 2-digit
            a = Math.floor(Math.random() * 90) + 10
            b = Math.floor(Math.random() * a)
            break
          case 2: // 3-digit
            a = Math.floor(Math.random() * 900) + 100
            b = Math.floor(Math.random() * a)
            break
          case 3: // 4-digit
            a = Math.floor(Math.random() * 9000) + 1000
            b = Math.floor(Math.random() * a)
            break
          case 4: // Decimals
            a = Math.round((Math.random() * 1000 + 100) * 10) / 10
            b = Math.round(Math.random() * a * 10) / 10
            break
          case 5: // Large numbers
            a = Math.floor(Math.random() * 90000) + 10000
            b = Math.floor(Math.random() * a)
            break
        }
        return {
          question: `${a} ${operation} ${b} = ?`,
          answer: Math.round((a - b) * 10) / 10,
        }
      }
    },
  },
  "mult-div": {
    title: "Multiplication & Division",
    icon: "✖️",
    generate: () => {
      const operation = Math.random() > 0.5 ? "×" : "÷"
      const difficultyLevel = Math.ceil(Math.random() * 5)
      let a, b

      if (operation === "×") {
        switch (difficultyLevel) {
          case 1: // Single digit × single digit
            a = Math.floor(Math.random() * 9) + 1
            b = Math.floor(Math.random() * 9) + 1
            break
          case 2: // Two digit × single digit
            a = Math.floor(Math.random() * 90) + 10
            b = Math.floor(Math.random() * 9) + 1
            break
          case 3: // Two digit × two digit
            a = Math.floor(Math.random() * 90) + 10
            b = Math.floor(Math.random() * 90) + 10
            break
          case 4: // Three digit × two digit
            a = Math.floor(Math.random() * 900) + 100
            b = Math.floor(Math.random() * 90) + 10
            break
          case 5: // Decimals
            a = Math.round((Math.random() * 100 + 10) * 10) / 10
            b = Math.round((Math.random() * 100 + 10) * 10) / 10
            break
        }
        return {
          question: `${a} ${operation} ${b} = ?`,
          answer: Math.round(a * b * 100) / 100,
        }
      } else {
        switch (difficultyLevel) {
          case 1: // Basic division
            b = Math.floor(Math.random() * 9) + 2
            a = b * (Math.floor(Math.random() * 20) + 5)
            break
          case 2: // Two digit divisor
            b = Math.floor(Math.random() * 20) + 5
            a = b * (Math.floor(Math.random() * 50) + 10)
            break
          case 3: // Three digit dividend
            b = Math.floor(Math.random() * 20) + 5
            a = b * (Math.floor(Math.random() * 100) + 10)
            break
          case 4: // With remainder
            b = Math.floor(Math.random() * 20) + 5
            a = b * (Math.floor(Math.random() * 50) + 10) + Math.floor(b / 2)
            break
          case 5: // Decimals
            b = Math.floor(Math.random() * 20) + 5
            a = Math.round(b * (Math.random() * 50 + 10) * 10) / 10
            break
        }
        return {
          question: `${a} ${operation} ${b} = ?`,
          answer: Math.round((a / b) * 100) / 100,
        }
      }
    },
  },
  squares: {
    title: "Squares up to 300",
    icon: "²",
    generate: () => {
      const difficultyLevel = Math.ceil(Math.random() * 4)
      let num

      switch (difficultyLevel) {
        case 1: // Basic squares (11-20)
          num = Math.floor(Math.random() * 10) + 11
          break
        case 2: // Medium squares (21-50)
          num = Math.floor(Math.random() * 30) + 21
          break
        case 3: // Advanced squares (51-100)
          num = Math.floor(Math.random() * 50) + 51
          break
        case 4: // Expert squares (101-300)
          num = Math.floor(Math.random() * 200) + 101
          break
      }

      // Sometimes ask for square roots instead
      if (Math.random() > 0.7) {
        const square = num * num
        return {
          question: `√${square} = ?`,
          answer: num,
        }
      }

      return {
        question: `${num}² = ?`,
        answer: num * num,
      }
    },
  },
  cubes: {
    title: "Cubes & Cube Roots",
    icon: "³",
    generate: () => {
      const difficultyLevel = Math.ceil(Math.random() * 3)
      let num

      switch (difficultyLevel) {
        case 1: // Basic cubes (2-10)
          num = Math.floor(Math.random() * 9) + 2
          break
        case 2: // Medium cubes (11-20)
          num = Math.floor(Math.random() * 10) + 11
          break
        case 3: // Advanced cubes (21-30)
          num = Math.floor(Math.random() * 10) + 21
          break
      }

      if (Math.random() > 0.5) {
        return {
          question: `${num}³ = ?`,
          answer: num * num * num,
        }
      } else {
        const cube = num * num * num
        return {
          question: `∛${cube} = ?`,
          answer: num,
        }
      }
    },
  },
  base: {
    title: "Base 10/100 Tricks",
    icon: "🔟",
    generate: () => {
      const operation = Math.random() > 0.5 ? "×" : "÷"
      const difficultyLevel = Math.ceil(Math.random() * 4)
      let a, base

      switch (difficultyLevel) {
        case 1: // Basic ×10, ÷10
          base = 10
          a = Math.floor(Math.random() * 100) + 10
          break
        case 2: // ×100, ÷100
          base = 100
          a = Math.floor(Math.random() * 1000) + 100
          break
        case 3: // ×1000, ÷1000
          base = 1000
          a = Math.floor(Math.random() * 10000) + 1000
          break
        case 4: // Decimals with base 10/100
          base = Math.random() > 0.5 ? 10 : 100
          a = Math.round((Math.random() * 1000 + 100) * 10) / 10
          break
      }

      return {
        question: `${a} ${operation} ${base} = ?`,
        answer: operation === "×" ? a * base : Math.round((a / base) * 1000) / 1000,
      }
    },
  },
  increase: {
    title: "% Increase/Decrease",
    icon: "📊",
    generate: () => {
      const isIncrease = Math.random() > 0.5
      const difficultyLevel = Math.ceil(Math.random() * 4)
      let percentage, base

      switch (difficultyLevel) {
        case 1: // Basic percentages (10%, 20%, 25%, 50%)
          percentage = [10, 20, 25, 50][Math.floor(Math.random() * 4)]
          base = Math.floor(Math.random() * 200) + 50
          break
        case 2: // Common percentages (15%, 30%, 40%, 60%, 75%)
          percentage = [15, 30, 40, 60, 75][Math.floor(Math.random() * 5)]
          base = Math.floor(Math.random() * 500) + 100
          break
        case 3: // Advanced percentages (12%, 18%, 35%, 45%, 65%, 80%)
          percentage = [12, 18, 35, 45, 65, 80][Math.floor(Math.random() * 6)]
          base = Math.floor(Math.random() * 1000) + 200
          break
        case 4: // Complex percentages (17%, 23%, 37%, 42%, 67%, 83%)
          percentage = [17, 23, 37, 42, 67, 83][Math.floor(Math.random() * 6)]
          base = Math.floor(Math.random() * 2000) + 500
          break
      }

      const result = isIncrease ? base + (base * percentage) / 100 : base - (base * percentage) / 100

      return {
        question: `${isIncrease ? "Increase" : "Decrease"} ${base} by ${percentage}% = ?`,
        answer: Math.round(result * 100) / 100,
      }
    },
  },
  successive: {
    title: "Successive % Changes",
    icon: "📈",
    generate: () => {
      const difficultyLevel = Math.ceil(Math.random() * 4)
      let percentage1,
        percentage2,
        base = 100
      let isIncrease1, isIncrease2

      switch (difficultyLevel) {
        case 1: // Basic successive changes
          percentage1 = [10, 20, 25][Math.floor(Math.random() * 3)]
          percentage2 = [10, 20, 25][Math.floor(Math.random() * 3)]
          isIncrease1 = Math.random() > 0.5
          isIncrease2 = Math.random() > 0.5
          break
        case 2: // Medium successive changes
          percentage1 = [15, 30, 40][Math.floor(Math.random() * 3)]
          percentage2 = [15, 30, 40][Math.floor(Math.random() * 3)]
          isIncrease1 = Math.random() > 0.5
          isIncrease2 = Math.random() > 0.5
          break
        case 3: // Advanced successive changes
          percentage1 = [12, 18, 35, 45][Math.floor(Math.random() * 4)]
          percentage2 = [12, 18, 35, 45][Math.floor(Math.random() * 4)]
          isIncrease1 = Math.random() > 0.5
          isIncrease2 = Math.random() > 0.5
          break
        case 4: // Complex successive changes
          percentage1 = Math.floor(Math.random() * 50) + 10
          percentage2 = Math.floor(Math.random() * 50) + 10
          isIncrease1 = Math.random() > 0.5
          isIncrease2 = Math.random() > 0.5
          base = Math.floor(Math.random() * 500) + 100
          break
      }

      const op1 = isIncrease1 ? "increase" : "decrease"
      const op2 = isIncrease2 ? "increase" : "decrease"

      const factor1 = isIncrease1 ? 1 + percentage1 / 100 : 1 - percentage1 / 100
      const factor2 = isIncrease2 ? 1 + percentage2 / 100 : 1 - percentage2 / 100

      const result = base * factor1 * factor2

      return {
        question: `${op1} ${base} by ${percentage1}%, then ${op2} by ${percentage2}% = ?`,
        answer: Math.round(result * 100) / 100,
      }
    },
  },
  reverse: {
    title: "Reverse % Change",
    icon: "🔄",
    generate: () => {
      const difficultyLevel = Math.ceil(Math.random() * 4)
      let percentage, original
      const isIncrease = Math.random() > 0.5

      switch (difficultyLevel) {
        case 1: // Basic reverse changes
          percentage = [10, 20, 25, 50][Math.floor(Math.random() * 4)]
          original = [100, 200, 400][Math.floor(Math.random() * 3)]
          break
        case 2: // Medium reverse changes
          percentage = [15, 30, 40, 60][Math.floor(Math.random() * 4)]
          original = [120, 150, 250, 300][Math.floor(Math.random() * 4)]
          break
        case 3: // Advanced reverse changes
          percentage = [12, 18, 35, 45, 75][Math.floor(Math.random() * 5)]
          original = [80, 160, 240, 320, 480][Math.floor(Math.random() * 5)]
          break
        case 4: // Complex reverse changes
          percentage = Math.floor(Math.random() * 60) + 10
          original = Math.floor(Math.random() * 800) + 100
          break
      }

      let result
      if (isIncrease) {
        result = original * (1 + percentage / 100)
        return {
          question: `${Math.round(result * 100) / 100} is ${percentage}% more than what number?`,
          answer: original,
        }
      } else {
        result = original * (1 - percentage / 100)
        return {
          question: `${Math.round(result * 100) / 100} is ${percentage}% less than what number?`,
          answer: original,
        }
      }
    },
  },
  table: {
    title: "5×5 Table Drill",
    icon: "🔢",
    generate: () => {
      return {
        question: "Practice with the 5×5 table drill below",
        answer: 0,
        isTableDrill: true,
      }
    },
  },
  "close-100": {
    title: "Multiplication Close to 100",
    icon: "💯",
    generate: () => {
      const difficultyLevel = Math.ceil(Math.random() * 4)
      let a, b

      switch (difficultyLevel) {
        case 1: // Very close to 100 (95-105)
          a = Math.floor(Math.random() * 11) + 95
          b = Math.floor(Math.random() * 11) + 95
          break
        case 2: // Close to 100 (90-110)
          a = Math.floor(Math.random() * 21) + 90
          b = Math.floor(Math.random() * 21) + 90
          break
        case 3: // Moderately close (85-115)
          a = Math.floor(Math.random() * 31) + 85
          b = Math.floor(Math.random() * 31) + 85
          break
        case 4: // Extended range (80-120)
          a = Math.floor(Math.random() * 41) + 80
          b = Math.floor(Math.random() * 41) + 80
          break
      }

      return {
        question: `${a} × ${b} = ?`,
        answer: a * b,
      }
    },
  },
}

export function PracticeExerciseScreen({ category }: { category: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode") || "timed"

  // Check if category exists
  const exerciseInfo = exerciseGenerators[category as keyof typeof exerciseGenerators]

  // Table drill specific state
  const [tableData, setTableData] = useState(() => createInitialTableData())
  const [drillType, setDrillType] = useState<DrillType>("row-sum")
  const [tableAnswers, setTableAnswers] = useState<string[]>(Array(5).fill(""))
  const [isTableChecked, setIsTableChecked] = useState(false)
  const [isTableCorrect, setIsTableCorrect] = useState<boolean[]>(Array(5).fill(false))

  // Regular exercise state
  const [currentExercise, setCurrentExercise] = useState<{
    question: string
    answer: number
    isTableDrill?: boolean
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userAnswer, setUserAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [totalAttempted, setTotalAttempted] = useState(0)
  const [timeLeft, setTimeLeft] = useState(mode === "timed" ? 60 : 0)
  const [isActive, setIsActive] = useState(mode === "timed")
  const [showHint, setShowHint] = useState(false)

  const generateExercise = () => {
    setIsLoading(true)
    try {
      const newExercise = exerciseInfo.generate()
      setCurrentExercise(newExercise)
      setUserAnswer("")
      setIsCorrect(null)
      setShowHint(false)
    } catch (error) {
      console.error("Error generating exercise:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Initialize exercise
  useEffect(() => {
    generateExercise()
  }, [category])

  // If category doesn't exist, show error
  if (!exerciseInfo) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Category Not Found</h1>
            <p className="text-gray-400 mb-6">The practice category "{category}" does not exist.</p>
            <Link href="/practice">
              <Button className="bg-sky-600 hover:bg-sky-700">Back to Practice</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Timer for timed mode (disabled for table drill)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (mode === "timed" && isActive && timeLeft > 0 && category !== "table") {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && mode === "timed" && isActive && category !== "table") {
      setIsActive(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timeLeft, isActive, mode, category])

  // Table drill functions
  const resetTable = () => {
    const newData = createInitialTableData()
    setTableData(newData)
    setTableAnswers(Array(5).fill(""))
    setIsTableChecked(false)
    setIsTableCorrect(Array(5).fill(false))
  }

  const handleDrillTypeChange = (value: string) => {
    setDrillType(value as DrillType)
    setTableAnswers(Array(5).fill(""))
    setIsTableChecked(false)
    setIsTableCorrect(Array(5).fill(false))
  }

  const handleTableAnswerChange = (index: number, value: string) => {
    const newAnswers = [...tableAnswers]
    newAnswers[index] = value
    setTableAnswers(newAnswers)
  }

  const checkTableAnswers = () => {
    let correctAnswers: (number | string)[] = []

    switch (drillType) {
      case "row-sum":
        correctAnswers = tableData.rowSums
        break
      case "column-sum":
        correctAnswers = tableData.columnSums
        break
      case "row-percentage":
        correctAnswers = tableData.rowPercentages.map((row) => row[0])
        break
      case "column-percentage":
        correctAnswers = tableData.columnPercentages.map((row) => row[0])
        break
    }

    const newIsCorrect = tableAnswers.map((answer, index) => {
      if (drillType === "row-percentage" || drillType === "column-percentage") {
        const userValue = Number.parseFloat(answer)
        const correctValue = Number.parseFloat(correctAnswers[index] as string)
        return Math.abs(userValue - correctValue) <= 0.5
      } else {
        return Number.parseInt(answer) === correctAnswers[index]
      }
    })

    setIsTableCorrect(newIsCorrect)
    setIsTableChecked(true)

    // Update score for table drill
    const correctCount = newIsCorrect.filter(Boolean).length
    setScore(score + correctCount)
    setTotalAttempted(totalAttempted + 5)
  }

  const getTablePromptText = () => {
    switch (drillType) {
      case "row-sum":
        return "Calculate the sum of each row"
      case "column-sum":
        return "Calculate the sum of each column"
      case "row-percentage":
        return "What percentage is the first cell of each row's total?"
      case "column-percentage":
        return "What percentage is the first cell of each column's total?"
    }
  }

  const getTableAnswerLabel = (index: number) => {
    switch (drillType) {
      case "row-sum":
        return `Row ${index + 1} Sum`
      case "column-sum":
        return `Col ${index + 1} Sum`
      case "row-percentage":
        return `Row ${index + 1} %`
      case "column-percentage":
        return `Col ${index + 1} %`
    }
  }

  // Regular exercise functions
  const checkAnswer = () => {
    if (!currentExercise) return

    const userNum = Number.parseFloat(userAnswer)
    const correctAnswer = currentExercise.answer

    const isAnswerCorrect = Math.abs(userNum - correctAnswer) < 0.01

    setIsCorrect(isAnswerCorrect)
    setTotalAttempted(totalAttempted + 1)

    if (isAnswerCorrect) {
      setScore(score + 1)
      setTimeout(() => {
        generateExercise()
      }, 1000)
    }
  }

  const restart = () => {
    setScore(0)
    setTotalAttempted(0)
    setTimeLeft(mode === "timed" ? 60 : 0)
    setIsActive(mode === "timed")
    generateExercise()
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value)
    setIsCorrect(null)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    checkAnswer()
  }

  const getAccuracy = () => {
    if (totalAttempted === 0) return 0
    return Math.round((score / totalAttempted) * 100)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const getHint = () => {
    switch (category) {
      case "add-sub":
        return "Try breaking down the numbers into easier parts. For subtraction, consider using complements or adding/subtracting the same amount to both numbers."
      case "mult-div":
        return "For multiplication, you can break down numbers. For example, 23×4 = 20×4 + 3×4 = 80 + 12 = 92. For division, look for factors."
      case "squares":
        return "For numbers ending in 5, multiply the tens digit by (tens digit + 1) and append 25. For numbers close to 50 or 100, use the difference method."
      case "cubes":
        return "Remember some common cubes: 2³=8, 3³=27, 4³=64, 5³=125, 6³=216, 7³=343, 8³=512, 9³=729, 10³=1000."
      case "base":
        return "For ×10, add a zero. For ×100, add two zeros. For ÷10, move decimal left. For ÷100, move decimal left twice."
      case "increase":
        return "To increase by X%, multiply by (1 + X/100). To decrease by X%, multiply by (1 - X/100). For common percentages, use fraction equivalents."
      case "successive":
        return "Apply each percentage change one after the other. Multiply by the factors (1±X/100) for each change. The order doesn't matter for multiplication."
      case "reverse":
        return "If Y is X% more than original, then original = Y ÷ (1 + X/100). If Y is X% less, then original = Y ÷ (1 - X/100)."
      case "close-100":
        return "For numbers close to 100, use the formula: (100+a)(100+b) = 10000 + 100(a+b) + ab. This works for numbers like 97×103."
      case "table":
        return "Look for patterns in the numbers. Group numbers that are easy to add together. Use mental math shortcuts for percentages."
      default:
        return "Break down the problem into smaller steps."
    }
  }

  // Render the table grid for table drill
  const renderTableGrid = (highlightFirstColumn = false, highlightFirstRow = false) => (
    <div className="grid grid-cols-6 gap-2 max-w-4xl mx-auto mb-8">
      {/* Header row */}
      <div className="text-center font-bold text-gray-300 text-sm p-2">Row</div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={`header-${i}`} className="text-center font-bold text-gray-300 text-sm p-2">
          Col {i + 1}
        </div>
      ))}

      {/* Table rows */}
      {tableData.table.map((row, rowIndex) => (
        <React.Fragment key={`row-${rowIndex}`}>
          <div className="text-center font-bold text-gray-300 text-sm p-2 flex items-center justify-center">
            {rowIndex + 1}
          </div>
          {row.map((cell, colIndex) => (
            <div
              key={`cell-${rowIndex}-${colIndex}`}
              className={`text-center h-12 flex items-center justify-center text-sm font-medium rounded border ${
                highlightFirstColumn && colIndex === 0
                  ? "bg-pink-500/30 border-pink-400 text-pink-100"
                  : highlightFirstRow && rowIndex === 0
                    ? "bg-orange-500/30 border-orange-400 text-orange-100"
                    : "bg-gray-700/50 border-gray-600 text-white"
              }`}
            >
              {cell}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-black">
      <div className="container px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/practice">
                <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-gray-800">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back to Practice</span>
                </Button>
              </Link>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full">
                <Target className="h-3 w-3 text-sky-400" />
                <span className="text-xs font-medium text-sky-400">Practice Exercise</span>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">{exerciseInfo.title}</h1>
            <p className="text-gray-400 mb-4 text-sm">
              Mode: {mode.charAt(0).toUpperCase() + mode.slice(1)} • Expanded Question Set
            </p>
          </div>
          <div className="w-full md:w-auto">
            <MotivationalQuote />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="h-full flex flex-col bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white text-lg">
                    {category === "table" ? getTablePromptText() : "Practice Exercise"}
                  </CardTitle>
                  {mode === "timed" && category !== "table" && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-sky-400" />
                      <span className="font-mono text-lg text-white">{formatTime(timeLeft)}</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {isLoading ? (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-xl text-white">Loading exercise...</div>
                  </div>
                ) : !isActive && mode === "timed" && category !== "table" ? (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold mb-4 text-white">Time's Up!</h2>
                      <p className="mb-6 text-gray-300">
                        You scored {score} out of {totalAttempted} ({getAccuracy()}% accuracy)
                      </p>
                      <Button onClick={restart} className="bg-sky-600 hover:bg-sky-700">
                        Try Again
                      </Button>
                    </div>
                  </div>
                ) : category === "table" ? (
                  // Table Drill Interface
                  <div className="flex-1">
                    <Tabs defaultValue="row-sum" onValueChange={handleDrillTypeChange}>
                      <TabsList className="grid w-full grid-cols-4 mb-6 bg-gray-900/50 border border-gray-700/50">
                        <TabsTrigger
                          value="row-sum"
                          className="text-gray-300 data-[state=active]:bg-sky-600 data-[state=active]:text-white text-xs rounded-lg transition-all duration-300"
                        >
                          Row Sum
                        </TabsTrigger>
                        <TabsTrigger
                          value="column-sum"
                          className="text-gray-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white text-xs rounded-lg transition-all duration-300"
                        >
                          Column Sum
                        </TabsTrigger>
                        <TabsTrigger
                          value="row-percentage"
                          className="text-gray-300 data-[state=active]:bg-pink-600 data-[state=active]:text-white text-xs rounded-lg transition-all duration-300"
                        >
                          Row %
                        </TabsTrigger>
                        <TabsTrigger
                          value="column-percentage"
                          className="text-gray-300 data-[state=active]:bg-orange-600 data-[state=active]:text-white text-xs rounded-lg transition-all duration-300"
                        >
                          Column %
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="row-sum" className="mt-0">
                        {renderTableGrid()}
                        <div className="grid grid-cols-5 gap-4 max-w-4xl mx-auto">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div key={`answer-${i}`} className="space-y-2">
                              <Label htmlFor={`answer-${i}`} className="text-xs text-gray-300 block text-center">
                                {getTableAnswerLabel(i)}
                              </Label>
                              <div className="flex flex-col items-center">
                                <Input
                                  id={`answer-${i}`}
                                  type="number"
                                  value={tableAnswers[i]}
                                  onChange={(e) => handleTableAnswerChange(i, e.target.value)}
                                  className={`text-center bg-gray-900/50 border-gray-600 text-white h-12 ${
                                    isTableChecked ? (isTableCorrect[i] ? "border-green-500" : "border-red-500") : ""
                                  }`}
                                />
                                {isTableChecked && (
                                  <div className="mt-2 flex items-center justify-center">
                                    {isTableCorrect[i] ? (
                                      <Check className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <X className="h-4 w-4 text-red-500" />
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="column-sum" className="mt-0">
                        {renderTableGrid()}
                        <div className="grid grid-cols-5 gap-4 max-w-4xl mx-auto">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div key={`answer-${i}`} className="space-y-2">
                              <Label htmlFor={`answer-${i}`} className="text-xs text-gray-300 block text-center">
                                {getTableAnswerLabel(i)}
                              </Label>
                              <div className="flex flex-col items-center">
                                <Input
                                  id={`answer-${i}`}
                                  type="number"
                                  value={tableAnswers[i]}
                                  onChange={(e) => handleTableAnswerChange(i, e.target.value)}
                                  className={`text-center bg-gray-900/50 border-gray-600 text-white h-12 ${
                                    isTableChecked ? (isTableCorrect[i] ? "border-green-500" : "border-red-500") : ""
                                  }`}
                                />
                                {isTableChecked && (
                                  <div className="mt-2 flex items-center justify-center">
                                    {isTableCorrect[i] ? (
                                      <Check className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <X className="h-4 w-4 text-red-500" />
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="row-percentage" className="mt-0">
                        {renderTableGrid(true, false)}
                        <div className="grid grid-cols-5 gap-4 max-w-4xl mx-auto">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div key={`answer-${i}`} className="space-y-2">
                              <Label htmlFor={`answer-${i}`} className="text-xs text-gray-300 block text-center">
                                {getTableAnswerLabel(i)}
                              </Label>
                              <div className="flex flex-col items-center">
                                <Input
                                  id={`answer-${i}`}
                                  type="number"
                                  step="0.1"
                                  value={tableAnswers[i]}
                                  onChange={(e) => handleTableAnswerChange(i, e.target.value)}
                                  className={`text-center bg-gray-900/50 border-gray-600 text-white h-12 ${
                                    isTableChecked ? (isTableCorrect[i] ? "border-green-500" : "border-red-500") : ""
                                  }`}
                                />
                                {isTableChecked && (
                                  <div className="mt-2 flex items-center justify-center">
                                    {isTableCorrect[i] ? (
                                      <Check className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <X className="h-4 w-4 text-red-500" />
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="column-percentage" className="mt-0">
                        {renderTableGrid(false, true)}
                        <div className="grid grid-cols-5 gap-4 max-w-4xl mx-auto">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div key={`answer-${i}`} className="space-y-2">
                              <Label htmlFor={`answer-${i}`} className="text-xs text-gray-300 block text-center">
                                {getTableAnswerLabel(i)}
                              </Label>
                              <div className="flex flex-col items-center">
                                <Input
                                  id={`answer-${i}`}
                                  type="number"
                                  step="0.1"
                                  value={tableAnswers[i]}
                                  onChange={(e) => handleTableAnswerChange(i, e.target.value)}
                                  className={`text-center bg-gray-900/50 border-gray-600 text-white h-12 ${
                                    isTableChecked ? (isTableCorrect[i] ? "border-green-500" : "border-red-500") : ""
                                  }`}
                                />
                                {isTableChecked && (
                                  <div className="mt-2 flex items-center justify-center">
                                    {isTableCorrect[i] ? (
                                      <Check className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <X className="h-4 w-4 text-red-500" />
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                ) : (
                  // Regular Exercise Interface
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-md">
                      <div className="text-center mb-8">
                        <div className="text-4xl md:text-5xl font-bold mb-8 text-white">
                          {currentExercise?.question}
                        </div>

                        <form onSubmit={handleSubmit}>
                          <div className="flex gap-2 mb-4">
                            <Input
                              type="text"
                              inputMode="decimal"
                              value={userAnswer}
                              onChange={handleInputChange}
                              placeholder="Enter your answer"
                              className={`text-lg text-center bg-gray-900/50 border-gray-700 text-white ${
                                isCorrect === true ? "border-sky-500" : isCorrect === false ? "border-red-500" : ""
                              }`}
                            />
                            <Button type="submit" className="bg-sky-600 hover:bg-sky-700">
                              Check
                            </Button>
                          </div>
                        </form>

                        {isCorrect === true && <div className="text-sky-400 font-medium">Correct!</div>}

                        {isCorrect === false && (
                          <div className="text-red-400 font-medium">
                            Try again! The correct answer is {currentExercise?.answer}
                          </div>
                        )}

                        {showHint && (
                          <Alert className="mt-4 bg-gray-900/50 border-gray-700">
                            <Lightbulb className="h-4 w-4 text-sky-400" />
                            <AlertDescription className="text-gray-300 text-sm">{getHint()}</AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t border-gray-700/50 flex justify-between">
                {category === "table" ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={resetTable}
                      className="gap-2 border-gray-600 text-gray-300 hover:bg-gray-800 text-xs"
                    >
                      <RefreshCw className="h-3 w-3" />
                      <span>New Table</span>
                    </Button>
                    <Button onClick={checkTableAnswers} className="bg-sky-600 hover:bg-sky-700 text-xs">
                      Check Answers
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setShowHint(!showHint)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 text-xs"
                    >
                      {showHint ? "Hide Hint" : "Show Hint"}
                    </Button>
                    <Button onClick={generateExercise} className="bg-sky-600 hover:bg-sky-700 text-xs">
                      Next Problem
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300 text-xs">Score</span>
                    <span className="font-medium text-white text-xs">
                      {score} / {totalAttempted}
                    </span>
                  </div>
                  <Progress
                    value={totalAttempted > 0 ? (score / totalAttempted) * 100 : 0}
                    className="h-2 bg-gray-800"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300 text-xs">Accuracy</span>
                    <span className="font-medium text-white text-xs">{getAccuracy()}%</span>
                  </div>
                  <Progress value={getAccuracy()} className="h-2 bg-gray-800" />
                </div>

                {mode === "timed" && category !== "table" && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-xs">Time Remaining</span>
                      <span className="font-medium text-white text-xs">{formatTime(timeLeft)}</span>
                    </div>
                    <Progress value={(timeLeft / 60) * 100} className="h-2 bg-gray-800" />
                  </div>
                )}

                <div className="pt-4 border-t border-gray-700">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-4 w-4 mt-0.5 text-sky-400 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium mb-1 text-sky-400 text-xs">Rahul Sir Tip</h3>
                      <p className="text-xs text-gray-400">{getHint()}</p>
                    </div>
                  </div>
                </div>

                {/* Difficulty indicator */}
                <div className="pt-4 border-t border-gray-700">
                  <div className="text-center">
                    <h3 className="font-medium mb-2 text-purple-400 text-xs">Question Variety</h3>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                        <div className="text-green-400 font-medium">Basic</div>
                        <div className="text-gray-400">Level 1-2</div>
                      </div>
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-2">
                        <div className="text-yellow-400 font-medium">Advanced</div>
                        <div className="text-gray-400">Level 3-5</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
