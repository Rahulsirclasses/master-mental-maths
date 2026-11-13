"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calculator, Target, Zap, Brain, BookOpen } from "lucide-react"
import { PracticeExerciseScreen } from "@/components/practice-exercise-screen"

interface Category {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  difficulty: string
  timeEstimate: string
  color: string
  questions: number
}

const categories: Category[] = [
  {
    id: "add-sub",
    title: "Addition & Subtraction",
    description: "Master basic arithmetic with mental math techniques",
    icon: Calculator,
    difficulty: "Beginner",
    timeEstimate: "5-10 min",
    color: "bg-blue-500",
    questions: 50,
  },
  {
    id: "mult-div",
    title: "Multiplication & Division",
    description: "Learn quick multiplication and division tricks",
    icon: Calculator,
    difficulty: "Intermediate",
    timeEstimate: "10-15 min",
    color: "bg-green-500",
    questions: 45,
  },
  {
    id: "squares",
    title: "Squares up to 300",
    description: "Calculate squares of numbers up to 300 instantly",
    icon: Target,
    difficulty: "Advanced",
    timeEstimate: "15-20 min",
    color: "bg-purple-500",
    questions: 40,
  },
  {
    id: "cubes",
    title: "Cubes & Cube Roots",
    description: "Master cube calculations and find cube roots",
    icon: Brain,
    difficulty: "Expert",
    timeEstimate: "20-25 min",
    color: "bg-red-500",
    questions: 35,
  },
  {
    id: "base",
    title: "Base 10/100 Tricks",
    description: "Use base number systems for faster calculations",
    icon: Zap,
    difficulty: "Intermediate",
    timeEstimate: "10-15 min",
    color: "bg-yellow-500",
    questions: 30,
  },
  {
    id: "increase",
    title: "Percentage Increase/Decrease",
    description: "Calculate percentage changes quickly",
    icon: Target,
    difficulty: "Intermediate",
    timeEstimate: "10-15 min",
    color: "bg-teal-500",
    questions: 40,
  },
  {
    id: "successive",
    title: "Successive Changes",
    description: "Handle multiple percentage changes in sequence",
    icon: Brain,
    difficulty: "Advanced",
    timeEstimate: "15-20 min",
    color: "bg-orange-500",
    questions: 25,
  },
  {
    id: "reverse",
    title: "Reverse Changes",
    description: "Find original values from percentage changes",
    icon: Zap,
    difficulty: "Expert",
    timeEstimate: "20-25 min",
    color: "bg-pink-500",
    questions: 20,
  },
  {
    id: "table",
    title: "5×5 Table Drill",
    description: "Master the 5×5 multiplication table grid",
    icon: BookOpen,
    difficulty: "Beginner",
    timeEstimate: "5-10 min",
    color: "bg-indigo-500",
    questions: 25,
  },
  {
    id: "close-100",
    title: "Close to 100",
    description: "Multiply numbers close to 100 using shortcuts",
    icon: Target,
    difficulty: "Advanced",
    timeEstimate: "15-20 min",
    color: "bg-cyan-500",
    questions: 30,
  },
]

export function PracticeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  if (selectedCategory) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container px-4 py-8">
          <Button
            onClick={() => setSelectedCategory(null)}
            variant="ghost"
            className="mb-6 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Categories
          </Button>
          <PracticeExerciseScreen category={selectedCategory} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Choose Your Practice</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Select a category to start practicing. Each session is designed to improve your mental math skills with
            progressive difficulty levels.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card
                key={category.id}
                className="bg-gray-900/80 border-gray-700/50 hover:bg-gray-800/80 transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {category.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-xl group-hover:text-blue-400 transition-colors">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-sm leading-relaxed">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-400">⏱️ {category.timeEstimate}</span>
                      <span className="text-gray-400">📝 {category.questions} questions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            💡 Tip: Start with beginner categories and work your way up to expert level
          </p>
        </div>
      </div>
    </div>
  )
}

export default PracticeScreen
