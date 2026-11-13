import { Header } from "@/components/header"
import { FlashcardsScreen } from "@/components/flashcards-screen"

export default function Flashcards() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <FlashcardsScreen />
    </main>
  )
}
