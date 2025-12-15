import { NextResponse } from "next/server"
import type { NotionRichText, NotionPageGeneric } from "@/types/notion"
import { NO_CACHE_HEADERS } from "@/lib/constants"

export const runtime = "nodejs" // Force Node.js runtime


// Helper function to safely extract rich text from Notion
function extractRichText(richText: NotionRichText[] | undefined): string {
  if (!richText || !Array.isArray(richText) || richText.length === 0) return ""
  return richText.map((text) => text?.plain_text || "").join("")
}

export async function GET(request: Request) {

  // Check if we're in a development environment or if API keys are missing
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_FAQ_DATABASE_ID) {
    return NextResponse.json([])
  }

  try {

    // Use fetch directly to query the Notion API
    const response = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_FAQ_DATABASE_ID}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("API: Error querying Notion database:", errorData)
      throw new Error(`Notion API error: ${errorData.message || "Unknown error"}`)
    }

    const data = await response.json()

    // Process the results
    const faqs = data.results.map((page: NotionPageGeneric) => {
      const properties = page.properties || {}

      // Extract the FAQ data
      const question = properties.Question?.title?.[0]?.plain_text || "Untitled Question"
      const answer = extractRichText(properties.Answer?.rich_text)
      const category = properties.Category?.select?.name
      const order = properties.Order?.number

      return {
        id: page.id,
        question,
        answer,
        category,
        order,
      }
    })

    // Set cache control headers
    return new NextResponse(JSON.stringify(faqs), {
      headers: {
        "Content-Type": "application/json",
        ...NO_CACHE_HEADERS,
      },
    })
  } catch (error) {
    console.error("API: Error fetching FAQs:", error)

    return new NextResponse(JSON.stringify([]), { headers: { "Content-Type": "application/json", ...NO_CACHE_HEADERS }, status: 500 })
  }
}
