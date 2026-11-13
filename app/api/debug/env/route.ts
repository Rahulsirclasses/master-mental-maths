import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

export async function GET() {
    let dbStatus = "Not connected";
    let dbError = null;

    try {
        await connectToDatabase();
        dbStatus = mongoose.connection.readyState === 1 ? "Connected" : `State: ${mongoose.connection.readyState}`;
    } catch (e: any) {
        dbStatus = "Error";
        dbError = e.message;
    }

    const maskVar = (str?: string) => {
        if (!str) return "MISSING";
        if (str.length <= 8) return "***";
        return `${str.substring(0, 4)}...${str.substring(str.length - 4)}`;
    };

    let session = null;
    let sessionError = null;
    try {
        session = await getServerSession(authOptions);
    } catch (e: any) {
        sessionError = e.message;
    }

    return NextResponse.json({
        environment: {
            NODE_ENV: process.env.NODE_ENV,
            NEXTAUTH_URL: process.env.NEXTAUTH_URL || "MISSING",
            VERCEL_URL: process.env.VERCEL_URL || "MISSING",
            VERCEL_ENV: process.env.VERCEL_ENV || "MISSING",
            GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? `SET (Value: ${process.env.GOOGLE_CLIENT_ID}, Length: ${process.env.GOOGLE_CLIENT_ID.length})` : "MISSING",
            GOOGLE_CLIENT_SECRET: maskVar(process.env.GOOGLE_CLIENT_SECRET),
            MONGODB_URI: maskVar(process.env.MONGODB_URI),
            NEXTAUTH_SECRET: maskVar(process.env.NEXTAUTH_SECRET),
        },
        database: {
            status: dbStatus,
            error: dbError
        },
        sessionInfo: {
            session,
            error: sessionError
        },
        time: new Date().toISOString()
    });
}
