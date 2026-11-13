"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Quote, Sparkles } from "lucide-react"

const quotes = [
  "Speed is strategy practiced well.",
  "You don't need talent. You need targets.",
  "Math isn't hard. It's just untrained memory.",
  "Consistency beats intensity every time.",
  "The secret to mental math is pattern recognition.",
  "Practice until calculation feels like intuition.",
  "Your brain is a muscle. Train it daily.",
  "Small steps daily lead to massive progress.",
  "The difference between ordinary and extraordinary is practice.",
  "Mental math is not a gift, it's a skill you build.",
]

export function MotivationalQuote() {
  const [currentQuote, setCurrentQuote] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Set initial quote
    setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)])

    // Rotate quotes every 10 seconds
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)])
        setIsAnimating(false)
      }, 300)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="w-full max-w-xl mx-auto bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-2xl hover:shadow-sky-500/10 transition-all duration-500 hover:scale-105">
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-purple-500 rounded-full blur-lg opacity-30"></div>
            <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-sky-500 to-purple-500 flex items-center justify-center">
              <Quote className="h-5 w-5 text-white" />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-3 w-3 text-sky-400" />
              <span className="text-xs font-medium text-sky-400 tracking-wide">Daily Inspiration</span>
            </div>

            <p
              className={`italic text-base text-gray-300 leading-relaxed transition-all duration-300 ${
                isAnimating ? "opacity-0 transform translate-y-2" : "opacity-100 transform translate-y-0"
              }`}
            >
              "{currentQuote}"
            </p>

            <div className="flex items-center justify-end mt-3 gap-2">
              <div className="h-1 w-6 bg-gradient-to-r from-sky-500 to-purple-500 rounded-full"></div>
              <p className="text-xs text-gray-500 font-medium">Rahul Sir</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
