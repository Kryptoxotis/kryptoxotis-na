import { NextResponse } from "next/server"
import type { NotionRichText, NotionFile, NotionPageGeneric } from "@/types/notion"
import { NO_CACHE_HEADERS } from "@/lib/constants"

export const runtime = "nodejs" // Force Node.js runtime


// Helper function to safely extract rich text from Notion
function extractRichText(richText: NotionRichText[] | undefined): string {
  if (!richText || !Array.isArray(richText) || richText.length === 0) return ""
  return richText.map((text) => text?.plain_text || "").join("")
}

// Helper function to safely get the first URL from a files array
function extractFileUrl(files: NotionFile[] | undefined): string {
  if (!files || !Array.isArray(files) || files.length === 0) return "/placeholder.svg?height=400&width=600"

  const file = files[0]
  if (!file) return "/placeholder.svg?height=400&width=600"

  if (file.type === "external" && file.external?.url) {
    return file.external.url
  } else if (file.type === "file" && file.file?.url) {
    return file.file.url
  }

  return "/placeholder.svg?height=400&width=600"
}

export async function GET(request: Request) {

  // Check if we're in a development environment or if API keys are missing
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_TESTIMONIALS_DATABASE_ID) {
    return NextResponse.json([])
  }

  try {

    // Use fetch directly to query the Notion API
    const response = await fetch(
      `https://api.notion.com/v1/databases/${process.env.NOTION_TESTIMONIALS_DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      },
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error("API: Error querying Notion database:", errorData)
      throw new Error(`Notion API error: ${errorData.message || "Unknown error"}`)
    }

    const data = await response.json()

    // Process the results
    const testimonials = data.results.map((page: NotionPageGeneric) => {
      const properties = page.properties || {}

      // Extract the testimonial data
      const quote = extractRichText(properties.Quote?.rich_text)
      const author = properties["Client Name"]?.title?.[0]?.plain_text || "Anonymous"
      const role = extractRichText(properties.Role?.rich_text)
      const avatar = properties.Avatar?.files?.length ? extractFileUrl(properties.Avatar.files) : undefined

      return {
        id: page.id,
        quote,
        author,
        role,
        avatar,
      }
    })

    // Set cache control headers
    return new NextResponse(JSON.stringify(testimonials), {
      headers: {
        "Content-Type": "application/json",
        ...NO_CACHE_HEADERS,
      },
    })
  } catch (error) {
    console.error("API: Error fetching testimonials:", error)

    return new NextResponse(JSON.stringify([]), { headers: { "Content-Type": "application/json", ...NO_CACHE_HEADERS }, status: 500 })
}
  }
