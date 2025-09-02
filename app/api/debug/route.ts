import { NextResponse } from "next/server"

export const runtime = "nodejs" // Force Node.js runtime

export async function GET(request: Request) {
  // Get the request headers
  const headers = Object.fromEntries(request.headers.entries())

  // Get the URL and query parameters
  const url = new URL(request.url)
  const params = Object.fromEntries(url.searchParams.entries())

  // Get environment information
  const environment = {
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
  }

  // Check if we can access the Notion API
  const notionApiStatus = { success: false, error: null as string | null }
  if (process.env.NOTION_API_KEY) {
    try {
      const response = await fetch("https://api.notion.com/v1/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
        },
      })

      if (response.ok) {
        notionApiStatus.success = true
      } else {
        const errorData = await response.json()
        notionApiStatus.error = errorData.message || "Unknown error"
      }
    } catch (error) {
      notionApiStatus.error = error instanceof Error ? error.message : "Unknown error"
    }
  } else {
    notionApiStatus.error = "NOTION_API_KEY is not defined"
  }

  // Return the debug information
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    request: {
      url: request.url,
      method: request.method,
      headers,
      params,
    },
    environment,
    notionApiStatus,
  })
}
