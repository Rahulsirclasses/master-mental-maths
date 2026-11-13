import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-gradient-to-br from-gray-950 via-black to-gray-900">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <Card className="dark-card">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl text-primary">Check Your Email</CardTitle>
              <CardDescription>We've sent you a confirmation link</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-primary/50 bg-primary/10">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <AlertDescription className="ml-2">
                  <p className="font-semibold text-foreground mb-2">Account Created Successfully!</p>
                  <p className="text-sm text-muted-foreground">
                    A confirmation email has been sent to your registered email address.
                  </p>
                </AlertDescription>
              </Alert>

              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="space-y-3">
                  <p className="font-medium text-foreground">Next Steps:</p>
                  <ol className="space-y-2 ml-4 list-decimal">
                    <li>Check your email inbox for the confirmation message</li>
                    <li>If you don't see it, check your Spam or Promotions folder</li>
                    <li>Click the "Confirm your account" button in the email</li>
                    <li>Once confirmed, you can log in and start practicing</li>
                  </ol>
                </div>

                <Alert className="border-amber-500/50 bg-amber-950/20">
                  <AlertDescription className="text-amber-200 text-xs">
                    <strong>Important:</strong> You must confirm your email before you can log in to your account.
                  </AlertDescription>
                </Alert>
              </div>

              <div className="pt-4">
                <Link href="/auth/login">
                  <Button className="w-full btn-gradient">Go to Login Page</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
