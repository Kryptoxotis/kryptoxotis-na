import { NextResponse } from "next/server"
import crypto from "crypto"
import { checkRateLimit, getClientIP, getRateLimitHeaders } from "@/lib/rate-limit"

export async function POST(request: Request) {
  try {
    // Rate limiting check
    const clientIP = getClientIP(request.headers)
    const rateLimitResult = checkRateLimit(clientIP, "auth")

    if (!rateLimitResult.success) {
      return NextResponse.json({
        authorized: false,
        message: "Too many attempts. Please try again later.",
      }, {
        status: 429,
        headers: getRateLimitHeaders(rateLimitResult)
      })
    }

    const body = await request.json()
    const { code } = body

    if (!code || typeof code !== "string") {
      return NextResponse.json({
        authorized: false,
        message: "Access code is required",
      }, { status: 400 })
    }

    // Validate against server-side environment variable
    const validCode = process.env.SPECTRE_ACCESS_CODE

    if (!validCode) {
      console.error("SPECTRE_ACCESS_CODE environment variable is not set")
      return NextResponse.json({
        authorized: false,
        message: "Service configuration error",
      }, { status: 500 })
    }

    // Use constant-time comparison to prevent timing attacks
    const isValid = validCode && code.length === validCode.length &&
      crypto.timingSafeEqual(Buffer.from(code), Buffer.from(validCode))

    if (!isValid) {
      return NextResponse.json({
        authorized: false,
        message: "Invalid access code",
      }, { status: 401 })
    }

    return NextResponse.json({
      authorized: true,
      message: "Access granted",
    })
  } catch (error) {
    console.error("Error validating access code:", error)
    return NextResponse.json({
      authorized: false,
      message: "Validation failed",
    }, { status: 500 })
  }
}
