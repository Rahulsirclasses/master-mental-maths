import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function DisabledPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <Card className="w-full max-w-md bg-gray-900 border-gray-800 text-white">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 bg-red-500/10 p-4 rounded-full w-fit">
                        <AlertCircle className="h-10 w-10 text-red-500" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Account Disabled</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <p className="text-gray-400">
                        Your account has been disabled by an administrator. Please contact support if you believe this is an error.
                    </p>
                    <div className="pt-4">
                        <Link href="/auth/login">
                            <Button variant="outline" className="w-full">
                                Back to Login
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
