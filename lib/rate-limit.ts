/**
 * Simple in-memory rate limiter for API endpoints
 * Note: For production with multiple server instances, consider using Redis
 */

interface RateLimitEntry {
  count: number
  firstRequest: number
}

// Store rate limit data in memory
const rateLimitStore = new Map<string, RateLimitEntry>()

// Configuration constants
export const RATE_LIMIT_CONFIG = {
  // Contact form: 5 requests per 15 minutes per IP
  contact: { maxRequests: 5, windowMs: 15 * 60 * 1000 },
  // General API: 60 requests per minute per IP
  api: { maxRequests: 60, windowMs: 60 * 1000 },
  // Auth check: 10 requests per minute per IP
  auth: { maxRequests: 10, windowMs: 60 * 1000 },
} as const

export type RateLimitType = keyof typeof RATE_LIMIT_CONFIG

interface RateLimitResult {
  success: boolean
  remaining: number
  resetTime: number
}

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier (usually IP address)
 * @param type - Type of rate limit to apply
 * @returns Object with success status and remaining requests
 */
export function checkRateLimit(
  identifier: string,
  type: RateLimitType = "api"
): RateLimitResult {
  const config = RATE_LIMIT_CONFIG[type]
  const key = `${type}:${identifier}`
  const now = Date.now()

  // Clean up old entries periodically
  if (Math.random() < 0.01) {
    cleanupOldEntries()
  }

  const entry = rateLimitStore.get(key)

  if (!entry) {
    // First request from this identifier
    rateLimitStore.set(key, { count: 1, firstRequest: now })
    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetTime: now + config.windowMs,
    }
  }

  // Check if window has expired
  if (now - entry.firstRequest > config.windowMs) {
    // Reset the window
    rateLimitStore.set(key, { count: 1, firstRequest: now })
    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetTime: now + config.windowMs,
    }
  }

  // Window is still active
  if (entry.count >= config.maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetTime: entry.firstRequest + config.windowMs,
    }
  }

  // Increment counter
  entry.count++
  rateLimitStore.set(key, entry)

  return {
    success: true,
    remaining: config.maxRequests - entry.count,
    resetTime: entry.firstRequest + config.windowMs,
  }
}

/**
 * Clean up expired rate limit entries to prevent memory leaks
 */
function cleanupOldEntries(): void {
  const now = Date.now()
  const maxWindowMs = Math.max(
    ...Object.values(RATE_LIMIT_CONFIG).map((c) => c.windowMs)
  )

  for (const [key, entry] of rateLimitStore.entries()) {
    if (now - entry.firstRequest > maxWindowMs) {
      rateLimitStore.delete(key)
    }
  }
}

/**
 * Get client IP from request headers
 * @param headers - Request headers
 * @returns Client IP address or "unknown"
 */
export function getClientIP(headers: Headers): string {
  // Try multiple headers in order of reliability
  const cfConnectingIP = headers.get("cf-connecting-ip")
  if (cfConnectingIP) return cfConnectingIP.trim()

  const forwarded = headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()

  const realIP = headers.get("x-real-ip")
  if (realIP) return realIP.trim()

  const xClientIP = headers.get("x-client-ip")
  if (xClientIP) return xClientIP.trim()

  return "unknown"
}

/**
 * Create rate limit headers for response
 */
export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    "X-RateLimit-Remaining": result.remaining.toString(),
    "X-RateLimit-Reset": result.resetTime.toString(),
  }
}
