import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token
        const path = req.nextUrl.pathname

        // 1. Enforce approval status for ALL authenticated routes
        if (token?.status === "pending" && !path.startsWith("/auth/pending")) {
            return NextResponse.redirect(new URL("/auth/pending", req.url))
        }
        if (token?.status === "disabled" && !path.startsWith("/auth/disabled")) {
            return NextResponse.redirect(new URL("/auth/disabled", req.url))
        }

        // 2. Protect Admin Routes — only admins can access
        if (
            path.startsWith("/dashboard/admin") ||
            path.startsWith("/api/admin") ||
            path.startsWith("/admin")
        ) {
            if (token?.role !== "admin") {
                return NextResponse.redirect(new URL("/dashboard", req.url))
            }
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: "/auth/login",
        },
    }
)

export const config = {
    matcher: [
        /*
         * Match ALL routes EXCEPT:
         * - /auth/* (login, signup, pending, disabled pages)
         * - /api/auth/* (NextAuth endpoints)
         * - /_next/* (Next.js internals)
         * - Static files: images, fonts, icons etc.
         * - / (home page — public landing page)
         */
        "/((?!auth|api/auth|api/debug|_next/static|_next/image|favicon|robots|sitemap|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.ico|.*\\.webp|.*\\.woff|.*\\.woff2|$).*)",
    ],
}
