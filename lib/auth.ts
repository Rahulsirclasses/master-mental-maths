import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcryptjs"
import connectToDatabase from "@/lib/db"
import { User } from "@/models/index"
import { adaptUser } from "@/lib/adapters/userAdapter"
import { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                await connectToDatabase()

                const user = await User.findOne({ email: credentials.email })

                if (!user) {
                    return null
                }

                // If user registered with Google, they won't have a password
                if (!user.password && user.provider === "google") {
                    return null
                }

                const isPasswordMatch = await bcrypt.compare(credentials.password, user.password)

                if (!isPasswordMatch) {
                    return null
                }

                // Only block disabled accounts at the authorize level.
                // Pending users are allowed to get a token — middleware will redirect them.
                if (user.status === "disabled") {
                    throw new Error("Your account has been disabled. Contact admin.")
                }

                return adaptUser(user)
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account }: any) {
            // Handle Google provider
            if (account?.provider === "google") {
                await connectToDatabase()
                const existingUser = await User.findOne({ email: user.email })

                if (!existingUser) {
                    await User.create({
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        provider: "google",
                        role: "user",
                        status: "pending",
                    })
                    return "/auth/pending?new=true"
                }

                if (existingUser.status === "pending") {
                    return "/auth/pending"
                }
                if (existingUser.status === "disabled") {
                    return "/auth/disabled"
                }

                return true
            }

            // For credentials provider: always return true here.
            // Pending users get a valid token and middleware redirects them to /auth/pending.
            return true
        },

        async jwt({ token, user, trigger, session }: any) {
            if (user) {
                token.role = user.role
                token.id = user.id
                token.status = user.status
            }

            // Re-fetch status/role from DB on every request to pick up admin changes immediately
            if (token.email) {
                await connectToDatabase()
                const dbUser = await User.findOne({ email: token.email }).select("role status")
                if (dbUser) {
                    token.role = dbUser.role
                    token.status = dbUser.status
                }
            }

            if (trigger === "update" && session?.name) {
                token.name = session.name
            }

            return token
        },

        async session({ session, token }: any) {
            if (session.user) {
                session.user.role = token.role as string
                session.user.id = token.id as string
                session.user.status = token.status as string
            }
            return session
        },
    },
    pages: {
        signIn: "/auth/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
}
