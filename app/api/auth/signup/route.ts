import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import connectToDatabase from "@/lib/db"
import { User } from "@/models/index"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json()

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
        }

        await connectToDatabase()

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            name,
            email,
            password: hashedPassword,
            provider: "credentials",
            role: "user",
            status: "pending",
        })

        return NextResponse.json({ success: true }, { status: 201 })
    } catch (error) {
        console.error("Signup error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
