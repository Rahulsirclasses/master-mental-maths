import { Header } from "@/components/header"
import PracticeScreen from "@/components/practice-screen"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function Practice() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }

  return (
    <main className="min-h-screen bg-black">
      <Header />
      <PracticeScreen />
    </main>
  )
}
