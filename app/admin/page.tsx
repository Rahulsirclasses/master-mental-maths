import { ComprehensiveAdminPanel } from "@/components/comprehensive-admin-panel"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getAdminData } from "@/actions/admin-actions"

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }

  // Optional: Check role (if intended to be admin only)
  // if (session.user?.role !== "admin") {
  //   redirect("/") 
  // }

  const initialData = await getAdminData()

  return <ComprehensiveAdminPanel initialData={initialData} />
}
