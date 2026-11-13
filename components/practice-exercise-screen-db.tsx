"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Lightbulb, BookOpen, ArrowLeft, RotateCcw } from "lucide-react"
import { getQuestions } from "@/actions/question-actions"
import { type Question } from "@/lib/mock-data" // Keeping type definition for now

interface PracticeExerciseScreenDbProps {
  category: string
  onBack: () => void
}

export function PracticeExerciseScreenDb({ category, onBack }: PracticeExerciseScreenDbProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadQuestions()
  }, [category])

  const loadQuestions = async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await getQuestions(category)

      if (result.error) {
        throw new Error(result.error)
      }

      if (result.data && result.data.length > 0) {
        setQuestions(result.data)
      } else {
        setError("No questions found for this category")
      }
    } catch (err) {
      console.error("Error loading questions:", err)
      setError(err instanceof Error ? err.message : "Failed to load questions")
    } finally {
      setLoading(false)
    }
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0

  const handleSubmit = () => {
    if (!currentQuestion || userAnswer.trim() === "") return

    const userNumericAnswer = Number.parseFloat(userAnswer)
    const correct = Math.abs(userNumericAnswer - currentQuestion.answer) < 0.01

    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setUserAnswer("")
      setShowResult(false)
      setShowHint(false)
      setShowExplanation(false)
    } else {
      // Exercise complete
      alert(`Exercise complete! Your score: ${score}/${questions.length}`)
      onBack()
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setUserAnswer("")
    setShowResult(false)
    setIsCorrect(false)
    setScore(0)
    setShowHint(false)
    setShowExplanation(false)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading questions...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 flex items-center justify-center">
        <Card className="bg-gray-900/80 border-gray-700/50 max-w-md">
          <CardContent className="p-6 text-center">
            <XCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Error Loading Questions</h2>
            <p className="text-gray-400 mb-4">{error}</p>
            <div className="flex gap-2">
              <Button onClick={loadQuestions} className="bg-blue-600 hover:bg-blue-700">
                Try Again
              </Button>
              <Button onClick={onBack} variant="outline" className="border-gray-600 bg-transparent">
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 flex items-center justify-center">
        <Card className="bg-gray-900/80 border-gray-700/50 max-w-md">
          <CardContent className="p-6 text-center">
            <BookOpen className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">No Questions Available</h2>
            <p className="text-gray-400 mb-4">
              No questions found for this category. Please add some questions in the admin panel first.
            </p>
            <div className="flex gap-2">
              <Button onClick={onBack} className="bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
              <Button asChild variant="outline" className="border-gray-600 bg-transparent">
                <a href="/admin">Add Questions</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900">
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="outline" className="border-gray-600 bg-transparent">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-gray-600 text-gray-300">
              Question {currentQuestionIndex + 1} of {questions.length}
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">
              Score: {score}/{questions.length}
            </Badge>
            <Button onClick={handleRestart} variant="outline" size="sm" className="border-gray-600 bg-transparent">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="bg-gray-900/80 border-gray-700/50 max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-xl">{currentQuestion?.question}</CardTitle>
              <Badge className={`${getDifficultyColor(currentQuestion?.difficulty_level || 1)} text-white`}>
                {getDifficultyLabel(currentQuestion?.difficulty_level || 1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Answer Input */}
            <div className="space-y-2">
              <input
                type="number"
                step="0.01"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer"
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white text-lg text-center"
                disabled={showResult}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !showResult) {
                    handleSubmit()
                  }
                }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {!showResult ? (
                <>
                  <Button
                    onClick={handleSubmit}
                    disabled={userAnswer.trim() === ""}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    Submit Answer
                  </Button>
                  {currentQuestion?.hint && (
                    <Button onClick={() => setShowHint(!showHint)} variant="outline" className="border-gray-600">
                      <Lightbulb className="h-4 w-4" />
                    </Button>
                  )}
                </>
              ) : (
                <Button onClick={handleNext} className="flex-1 bg-green-600 hover:bg-green-700">
                  {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish"}
                </Button>
              )}
            </div>

            {/* Hint */}
            {showHint && currentQuestion?.hint && (
              <Alert className="bg-blue-500/10 border-blue-500/30">
                <Lightbulb className="h-4 w-4 text-blue-400" />
                <AlertDescription className="text-blue-400">
                  <strong>Hint:</strong> {currentQuestion.hint}
                </AlertDescription>
              </Alert>
            )}

            {/* Result */}
            {showResult && (
              <Alert className={isCorrect ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"}>
                {isCorrect ? (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-400" />
                )}
                <AlertDescription className={isCorrect ? "text-green-400" : "text-red-400"}>
                  {isCorrect ? (
                    <span>
                      <strong>Correct!</strong> Well done!
                    </span>
                  ) : (
                    <span>
                      <strong>Incorrect.</strong> The correct answer is {currentQuestion?.answer}
                    </span>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {/* Explanation */}
            {showResult && currentQuestion?.explanation && (
              <div className="space-y-2">
                <Button
                  onClick={() => setShowExplanation(!showExplanation)}
                  variant="outline"
                  size="sm"
                  className="border-gray-600"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  {showExplanation ? "Hide" : "Show"} Explanation
                </Button>
                {showExplanation && (
                  <Alert className="bg-purple-500/10 border-purple-500/30">
                    <BookOpen className="h-4 w-4 text-purple-400" />
                    <AlertDescription className="text-purple-400">
                      <strong>Explanation:</strong> {currentQuestion.explanation}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {/* Tags */}
            {currentQuestion?.tags && currentQuestion.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {currentQuestion.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export { PracticeExerciseScreenDb as PracticeExerciseScreenDB }
