import { Suspense } from "react"
import { Header } from "@/components/header"
import { PracticeExerciseScreen } from "@/components/practice-exercise-screen"

export default function Close100Practice() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <Suspense
        fallback={<div className="container px-4 py-8 text-center text-white">Loading practice exercises...</div>}
      >
        <PracticeExerciseScreen category="close-100" />
      </Suspense>
    </main>
  )
}
