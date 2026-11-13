import { Header } from "@/components/header"
import { SettingsScreen } from "@/components/settings-screen"

export default function Settings() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <SettingsScreen />
    </main>
  )
}
