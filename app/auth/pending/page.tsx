"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, RefreshCcw } from "lucide-react"

export default function PendingPage() {
    const { data: session, update } = useSession()
    const router = useRouter()

    useEffect(() => {
        // Poll every 5 seconds — just trigger a session refresh
        // The redirect check is handled by the session watcher below
        const interval = setInterval(async () => {
            await update()
        }, 5000)

        return () => clearInterval(interval)
    }, [update])

    // Watch session — redirect as soon as status becomes 'approved'
    useEffect(() => {
        if (session?.user?.status === "approved") {
            router.push("/dashboard")
        }
    }, [session?.user?.status, router])

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <Card className="w-full max-w-md bg-gray-900 border-gray-800 text-white">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 bg-yellow-500/10 p-4 rounded-full w-fit">
                        <Clock className="h-10 w-10 text-yellow-500" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Account Pending</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <p className="text-gray-400">
                        Your account is currently under review. Access will be granted once an administrator approves your registration.
                    </p>
                    <p className="text-sm text-gray-500 animate-pulse">
                        Checking status...
                    </p>
                    <div className="pt-4 space-y-2">
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => window.location.reload()}
                        >
                            <RefreshCcw className="mr-2 h-4 w-4" />
                            Check Status
                        </Button>
                        <Link href="/auth/login" className="block w-full">
                            <Button variant="ghost" className="w-full text-gray-400 hover:text-white">
                                Back to Login
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
