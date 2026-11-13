"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Shuffle, RotateCcw } from "lucide-react"
import { getFlashcardSets, getFlashcards } from "@/actions/flashcard-actions"
import type { FlashcardSet, Flashcard } from "@/lib/mock-data" // Using existing types

interface EnrichedFlashcardSet extends FlashcardSet {
  cards: Flashcard[]
}

export function FlashcardsScreen() {
  const [sets, setSets] = useState<EnrichedFlashcardSet[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [shuffledCards, setShuffledCards] = useState<Flashcard[]>([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [setsResult, cardsResult] = await Promise.all([
        getFlashcardSets(),
        getFlashcards()
      ])

      if (setsResult.data && cardsResult.data) {
        const enrichedSets = setsResult.data.map((set: any) => ({
          ...set,
          cards: cardsResult.data.filter((card: any) => card.set_id === set.id)
        }))
        setSets(enrichedSets)
      }
    } catch (error) {
      console.error("Failed to load flashcards:", error)
    } finally {
      setLoading(false)
    }
  }

  const currentSet = sets.find((s) => s.id === selectedSetId)

  const shuffleCards = (cards: Flashcard[]) => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    setShuffledCards(shuffled)
    setCurrentCardIndex(0)
    setIsFlipped(false)
  }

  const selectSet = (setId: string) => {
    const set = sets.find((s) => s.id === setId)
    if (set) {
      setSelectedSetId(setId)
      shuffleCards(set.cards)
    }
  }

  const nextCard = () => {
    if (currentCardIndex < shuffledCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setIsFlipped(false)
    }
  }

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
      setIsFlipped(false)
    }
  }

  const resetCards = () => {
    setCurrentCardIndex(0)
    setIsFlipped(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  if (!selectedSetId) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              Flashcards Zone
            </h1>
            <p className="text-gray-300 text-lg">Master speed maths with interactive flashcards</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sets.map((set) => (
              <Card
                key={set.id}
                className="bg-gray-900 border-gray-700 hover:border-teal-500 transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => selectSet(set.id)}
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{set.name}</h3>
                  <p className="text-gray-400 mb-4">{set.cards.length} cards available</p>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{set.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-teal-400 font-medium">Start Practice →</span>
                    <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center">
                      <span className="text-teal-400 font-bold text-lg">{set.cards.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const currentCard = shuffledCards[currentCardIndex]
  const progress = shuffledCards.length > 0 ? ((currentCardIndex + 1) / shuffledCards.length) * 100 : 0

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => setSelectedSetId(null)}
            className="border-gray-600 text-white hover:bg-gray-800"
          >
            ← Back to Sets
          </Button>
          <h1 className="text-2xl font-bold text-center">{currentSet?.name}</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => shuffleCards(currentSet?.cards || [])}
              className="border-gray-600 text-white hover:bg-gray-800"
            >
              <Shuffle className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetCards}
              className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">
              Card {currentCardIndex + 1} of {shuffledCards.length}
            </span>
            <span className="text-sm text-gray-400">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-800" />
        </div>

        {/* Flashcard */}
        <div className="flex justify-center mb-8">
          <Card
            className={`w-full max-w-md h-64 cursor-pointer transition-all duration-500 transform ${isFlipped ? "rotate-y-180" : ""
              } bg-gray-900 border-gray-700 hover:border-teal-500`}
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ transformStyle: "preserve-3d" }}
          >
            <CardContent className="h-full flex items-center justify-center p-8 relative">
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isFlipped ? "opacity-0" : "opacity-100"
                  }`}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-4">{currentCard?.front}</div>
                  <div className="text-sm text-gray-400">Click to reveal answer</div>
                </div>
              </div>
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isFlipped ? "opacity-100" : "opacity-0"
                  }`}
                style={{ transform: "rotateY(180deg)" }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-400 mb-4">{currentCard?.back}</div>
                  <div className="text-sm text-gray-400">Click to show question</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={prevCard}
            disabled={currentCardIndex === 0}
            className="border-gray-600 text-white hover:bg-gray-800 disabled:opacity-50 bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <Button
            variant="outline"
            onClick={nextCard}
            disabled={currentCardIndex === shuffledCards.length - 1}
            className="border-gray-600 text-white hover:bg-gray-800 disabled:opacity-50 bg-transparent"
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
