"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { registerUser } from "@/actions/auth-actions"
import { signIn } from "next-auth/react"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("email", email)
      formData.append("password", password)

      const result = await registerUser(formData)

      if (result.error) {
        throw new Error(result.error)
      }

      // Auto-login after successful registration
      // We pass callbackUrl to ensure NextAuth has a valid base for URL construction
      const loginResult = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: window.location.origin + "/dashboard",
      })

      if (loginResult?.error) {
        // Fallback to login page if auto-login fails
        router.push("/auth/login?registered=true")
      } else {
        // Redirect to /dashboard — middleware will catch pending users and redirect to /auth/pending
        router.push("/dashboard")
        router.refresh()
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-gradient-to-br from-gray-950 via-black to-gray-900">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <Card className="dark-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-primary">Create Account</CardTitle>
              <CardDescription>Sign up to start your speed maths journey</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-900/50 border-gray-700"
                    />
                  </div>
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
                    <p className="text-xs text-gray-500">Must be at least 6 characters</p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="repeat-password">Confirm Password</Label>
                    <Input
                      id="repeat-password"
                      type="password"
                      required
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      className="bg-gray-900/50 border-gray-700"
                    />
                  </div>
                  {error && (
                    <Alert className="border-red-500/50 bg-red-950/20">
                      <AlertDescription className="text-red-200 text-sm">{error}</AlertDescription>
                    </Alert>
                  )}
                  <Button type="submit" className="w-full btn-gradient" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Sign up"}
                  </Button>
                </div>
                <div className="mt-6 text-center text-sm text-gray-400">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-primary hover:underline underline-offset-4">
                    Login
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

