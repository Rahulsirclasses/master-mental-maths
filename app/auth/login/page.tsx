import { Suspense } from "react"
import LoginForm from "./login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-gradient-to-br from-gray-950 via-black to-gray-900">
      <div className="w-full max-w-md">
        <Suspense fallback={<div className="text-center text-white">Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}

