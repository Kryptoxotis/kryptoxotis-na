import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const response = NextResponse.next()
    
    // Different caching strategies per endpoint
    const path = request.nextUrl.pathname
    
    if (path === "/api/blog") {
      // Blog posts can be cached for 60 seconds, revalidate in background
      response.headers.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300")
    } else if (path === "/api/contact") {
      // Contact form submissions should never be cached
      response.headers.set("Cache-Control", "no-store")
    } else {
      // Default: short cache for other API routes
      response.headers.set("Cache-Control", "public, s-maxage=30, stale-while-revalidate=60")
    }
    
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/api/:path*",
}
