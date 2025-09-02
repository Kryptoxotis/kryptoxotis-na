import { NextResponse } from "next/server"

export const runtime = "nodejs" // Force Node.js runtime

// Mock data for materials
const mockMaterials = [
  {
    id: "1",
    name: "PLA (Polylactic Acid)",
    materialType: "Thermoplastic",
    bestUses: ["Prototypes", "Models", "Educational projects"],
    properties: ["Easy to print", "Eco-friendly", "Rigid"],
    priceRange: ["$20-30/kg"],
  },
  // Other mock materials...
]

export async function GET(request: Request) {
  console.log("API: Starting materials diagnostic")

  const diagnostic = {
    timestamp: new Date().toISOString(),
    envVars: {
      apiKeyExists: !!process.env.NOTION_API_KEY,
      apiKeyPrefix: process.env.NOTION_API_KEY ? process.env.NOTION_API_KEY.substring(0, 4) + "..." : null,
      databaseIdExists: !!process.env.NOTION_3D_PRINTING_MATERIALS_DATABASE_ID,
      databaseIdPrefix: process.env.NOTION_3D_PRINTING_MATERIALS_DATABASE_ID
        ? process.env.NOTION_3D_PRINTING_MATERIALS_DATABASE_ID.substring(0, 4) + "..."
        : null,
      databaseIdValue: process.env.NOTION_3D_PRINTING_MATERIALS_DATABASE_ID || "Not set",
    },
    apiTest: null as any,
    mockData: mockMaterials,
  }

  // Test API connection if credentials exist
  if (process.env.NOTION_API_KEY && process.env.NOTION_3D_PRINTING_MATERIALS_DATABASE_ID) {
    try {
      console.log("API: Testing Notion materials database connection")
      console.log("API: Database ID:", process.env.NOTION_3D_PRINTING_MATERIALS_DATABASE_ID)

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
          body: JSON.stringify({}),
        },
      )

      if (response.ok) {
        const data = await response.json()
        diagnostic.apiTest = {
          success: true,
          count: data.results.length,
          firstResult: data.results.length > 0 ? data.results[0] : null,
        }
      } else {
        const errorData = await response.json()
        diagnostic.apiTest = {
          success: false,
          status: response.status,
          error: errorData.message || "Unknown error",
        }
      }
    } catch (error) {
      diagnostic.apiTest = {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  } else {
    diagnostic.apiTest = {
      success: false,
      error: "Missing environment variables",
    }
  }

  return NextResponse.json(diagnostic)
}
