import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export const dynamic = "force-dynamic"

// This route is no longer used (migrated from Supabase to NextAuth + MongoDB).
// Kept as a stub to avoid 404s from old links.
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const origin = requestUrl.origin
  return NextResponse.redirect(`${origin}/`)
}
