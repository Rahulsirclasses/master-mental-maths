import { Header } from "@/components/header"
import { HomeScreen } from "@/components/home-screen"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900">
      <Header />
      <HomeScreen />
    </main>
  )
}
