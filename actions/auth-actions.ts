"use server"

import connectToDatabase from "@/lib/db"
import { User } from "@/models/index"
import bcrypt from "bcryptjs"

export async function registerUser(formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
        return { error: "Email and password are required" }
    }

    await connectToDatabase()

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        return { error: "User already exists" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
        name,
        email,
        password: hashedPassword,
    })

    return { success: true }
}
