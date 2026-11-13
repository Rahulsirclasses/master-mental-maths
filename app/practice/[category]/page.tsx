import { Suspense } from "react"
import { Header } from "@/components/header"
import { PracticeExerciseScreen } from "@/components/practice-exercise-screen"
import { notFound } from "next/navigation"

// Define valid categories
const validCategories = [
  "add-sub",
  "mult-div",
  "squares",
  "cubes",
  "base",
  "increase",
  "successive",
  "reverse",
  "table",
  "close-100",
]

export default function PracticeExercise({ params }: { params: { category: string } }) {
  // Check if the category is valid
  if (!validCategories.includes(params.category)) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-black">
      <Header />
      <Suspense
        fallback={<div className="container px-4 py-8 text-center text-white">Loading practice exercises...</div>}
      >
        <PracticeExerciseScreen category={params.category} />
      </Suspense>
    </main>
  )
}
