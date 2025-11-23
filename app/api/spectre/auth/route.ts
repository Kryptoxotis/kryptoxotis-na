import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Get client IP from various possible headers
    const forwarded = request.headers.get("x-forwarded-for")
    const realIP = request.headers.get("x-real-ip")
    const cfConnectingIP = request.headers.get("cf-connecting-ip")

    let clientIP = forwarded?.split(",")[0]?.trim() || realIP || cfConnectingIP || request.ip || "unknown"

    // Clean up the IP (remove any brackets or extra formatting)
    clientIP = clientIP.replace(/^\[|\]$/g, "").trim()

    // Get allowed IPs from environment variable
    const allowedIPsEnv = process.env.ALLOWED_IPS || ""

    // Parse allowed IPs - handle quotes and clean up
    const allowedIPs = allowedIPsEnv
      .split(",")
      .map((ip) => ip.trim().replace(/^["']|["']$/g, ""))
      .filter((ip) => ip.length > 0)

    // Check if client IP is in allowed list
    const authorized = allowedIPs.includes(clientIP)

    console.log("IP Authorization Check:", {
      clientIP,
      allowedIPs,
      authorized,
      headers: {
        "x-forwarded-for": forwarded,
        "x-real-ip": realIP,
        "cf-connecting-ip": cfConnectingIP,
      },
    })

    return NextResponse.json({
      authorized,
      ip: clientIP,
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json(
      {
        authorized: false,
        ip: "error",
        error: "Failed to check authorization",
      },
      { status: 500 },
    )
  }
}
