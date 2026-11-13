"use client"

import { useState } from "react"
import { PracticeScreen } from "@/components/practice-screen"
import { PracticeExerciseScreenDb } from "@/components/practice-exercise-screen-db"

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [showExercise, setShowExercise] = useState(true)

  if (showExercise) {
    return <PracticeExerciseScreenDb category={params.category} onBack={() => setShowExercise(false)} />
  }

  return <PracticeScreen />
}
