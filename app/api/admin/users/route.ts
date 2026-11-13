import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import connectToDatabase from "@/lib/db"
import { User } from "@/models/index"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
        return new NextResponse("Unauthorized", { status: 403 })
    }

    await connectToDatabase()

    try {
        const users = await User.find({}).sort({ createdAt: -1 }).select("-password").lean()

        const sanitizedUsers = users.map((user: any) => ({
            ...user,
            id: user._id.toString(),
            _id: undefined
        }))

        return NextResponse.json(sanitizedUsers)
    } catch (error) {
        console.error("Error fetching users:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
        return new NextResponse("Unauthorized", { status: 403 })
    }

    try {
        const body = await req.json()
        const { userId, action } = body

        if (!userId || !["approve", "disable", "enable"].includes(action)) {
            return new NextResponse("Invalid request", { status: 400 })
        }

        await connectToDatabase()

        let update = {}
        if (action === "approve" || action === "enable") {
            update = { status: "approved" }
        } else if (action === "disable") {
            update = { status: "disabled" }
        }

        const user = await User.findByIdAndUpdate(userId, update, { new: true }).lean()

        if (!user) {
            return new NextResponse("User not found", { status: 404 })
        }

        return NextResponse.json({
            success: true,
            user: {
                ...user,
                id: user._id.toString(),
                _id: undefined
            }
        })

    } catch (error) {
        console.error("Error updating user:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
