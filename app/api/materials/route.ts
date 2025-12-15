import { NextResponse } from "next/server"
import type { NotionRichText, NotionMultiSelectItem, NotionPageGeneric } from "@/types/notion"
import { NO_CACHE_HEADERS } from "@/lib/constants"

export const runtime = "nodejs" // Force Node.js runtime

// Helper function to safely extract rich text from Notion
function extractRichText(richText: NotionRichText[] | undefined): string {
  if (!richText || !Array.isArray(richText) || richText.length === 0) return ""
  return richText.map((text) => text?.plain_text || "").join("")
}

// Helper function to extract multi-select values
function extractMultiSelect(multiSelect: NotionMultiSelectItem[] | undefined): string[] {
  if (!multiSelect || !Array.isArray(multiSelect)) return []
  return multiSelect.map((item) => item?.name || "")
}

export async function GET(request: Request) {
  // Check if we're in a development environment or if API keys are missing
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_3D_PRINTING_MATERIALS_DATABASE_ID) {
    return NextResponse.json([])
  }

  try {
    // Use fetch directly to query the Notion API
    const response = await fetch(
      `https://api.notion.com/v1/databases/${process.env.NOTION_3D_PRINTING_MATERIALS_DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sorts: [
            {
              property: "Material Name",
              direction: "ascending",
            },
          ],
        }),
      },
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error("API: Error querying Notion database:", errorData)
      throw new Error(`Notion API error: ${errorData.message || "Unknown error"}`)
    }

    const data = await response.json()

    // Process the results
    const materials = data.results.map((page: NotionPageGeneric) => {
      const properties = page.properties || {}

      // Extract the material data
      const name = properties["Material Name"]?.title?.[0]?.plain_text || "Untitled Material"
      const materialType = properties["Material Type"]?.select?.name || ""
      const bestUses = extractMultiSelect(properties["Best Uses"]?.multi_select)
      const materialProperties = extractMultiSelect(properties["Properties"]?.multi_select)

      // Get the price
      let price = null
      if (properties["Price"] && properties["Price"].number !== null && properties["Price"].number !== undefined) {
        price = properties["Price"].number
      }

      return {
        id: page.id,
        name,
        materialType,
        bestUses,
        properties: materialProperties,
        price,
      }
    })

    // Set cache control headers
    return new NextResponse(JSON.stringify(materials), {
      headers: {
        "Content-Type": "application/json",
        ...NO_CACHE_HEADERS,
      },
    })
  } catch (error) {
    console.error("API: Error fetching materials:", error)
    return NextResponse.json([], {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...NO_CACHE_HEADERS,
      },
    })
  }
}
