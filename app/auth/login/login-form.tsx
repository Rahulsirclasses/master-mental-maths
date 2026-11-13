"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { signIn } from "next-auth/react"

export default function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const registered = searchParams.get("registered")

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
                callbackUrl: window.location.origin + "/dashboard",
            })

            if (result?.error) {
                throw new Error(result.error || "Invalid email or password")
            }

            // Redirect to /dashboard — middleware will catch pending/disabled users
            // and redirect them to /auth/pending or /auth/disabled accordingly
            router.push("/dashboard")
            router.refresh()
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="flex flex-col gap-6">
                {registered && (
                    <Alert className="border-yellow-500/50 bg-yellow-950/20 text-yellow-200 mb-4">
                        <AlertDescription>
                            Registration successful! Please log in to check your approval status.
                        </AlertDescription>
                    </Alert>
                )}

                <Card className="dark-card">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl text-primary">Login</CardTitle>
                        <CardDescription>Enter your credentials to access your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-6">
                            <Button
                                variant="outline"
                                className="w-full bg-white text-black hover:bg-gray-200"
                                onClick={() => signIn("google", { callbackUrl: "/" })}
                            >
                                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                                </svg>
                                Sign in with Google
                            </Button>
                            <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-gray-700" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-gray-950 px-2 text-gray-400">Or continue with</span>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={handleLogin}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your.email@example.com"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-gray-900/50 border-gray-700"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="bg-gray-900/50 border-gray-700"
                                    />
                                </div>
                                {error && (
                                    <Alert className="border-red-500/50 bg-red-950/20">
                                        <AlertDescription className="text-red-200 text-sm">{error}</AlertDescription>
                                    </Alert>
                                )}
                                <Button type="submit" className="w-full btn-gradient" disabled={isLoading}>
                                    {isLoading ? "Logging in..." : "Login"}
                                </Button>
                            </div>
                            <div className="mt-6 text-center text-sm text-gray-400">
                                Don't have an account?{" "}
                                <Link href="/auth/sign-up" className="text-primary hover:underline underline-offset-4">
                                    Sign up
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
