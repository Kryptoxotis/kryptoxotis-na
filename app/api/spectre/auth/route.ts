import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Get the client IP address with better detection
    const forwarded = request.headers.get("x-forwarded-for")
    const realIP = request.headers.get("x-real-ip")
    const cfConnectingIP = request.headers.get("cf-connecting-ip")
    const xClientIP = request.headers.get("x-client-ip")

    // Try multiple headers to get the real IP
    let clientIP = "unknown"

    if (cfConnectingIP) {
      clientIP = cfConnectingIP.trim()
    } else if (forwarded) {
      clientIP = forwarded.split(",")[0].trim()
    } else if (realIP) {
      clientIP = realIP.trim()
    } else if (xClientIP) {
      clientIP = xClientIP.trim()
    }

    // Get allowed IPs from environment variable and clean them
    const allowedIPsRaw = process.env.ALLOWED_IPS || ""
    const allowedIPs = allowedIPsRaw
      .split(",")
      .map((ip) => ip.trim())
      .map((ip) => ip.replace(/^["']|["']$/g, "")) // Remove surrounding quotes
      .filter((ip) => ip.length > 0)

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
