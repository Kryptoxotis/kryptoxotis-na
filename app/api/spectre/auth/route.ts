import { type NextRequest, NextResponse } from "next/server"
import { checkRateLimit, getClientIP, getRateLimitHeaders } from "@/lib/rate-limit"

export async function GET(request: NextRequest) {
  try {
    // Get the client IP using shared utility
    const clientIP = getClientIP(request.headers)

    // Rate limiting check for auth endpoint
    const rateLimitResult = checkRateLimit(clientIP, "auth")

    if (!rateLimitResult.success) {
      return NextResponse.json({
        authorized: false,
        message: "Too many requests. Please try again later.",
      }, {
        status: 429,
        headers: getRateLimitHeaders(rateLimitResult)
      })
    }

    // Get allowed IPs from environment variable and clean them
    const allowedIPsRaw = process.env.ALLOWED_IPS || ""
    const allowedIPs = allowedIPsRaw
      .split(",")
      .map((ip) => ip.trim())
      .map((ip) => ip.replace(/^["']|["']$/g, "")) // Remove surrounding quotes
      .filter((ip) => ip.length > 0 && /^(\d{1,3}\.){3}\d{1,3}$/.test(ip))

    // Check if the client IP is in the allowed list
    const isAuthorized = allowedIPs.includes(clientIP)

    return NextResponse.json({
      authorized: isAuthorized,
      ip: clientIP,
      message: isAuthorized ? "Access granted" : "Manual authentication required",
    })
  } catch (error) {
    console.error("Error checking IP authorization:", error)
    return NextResponse.json(
      {
        authorized: false,
        message: "Authorization check failed",
      },
      { status: 500 },
    )
  }
}
