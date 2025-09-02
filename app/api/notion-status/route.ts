import { NextResponse } from "next/server"

export const runtime = "nodejs" // Force Node.js runtime

// Check if we have all required environment variables
function hasRequiredEnvVars(): boolean {
  const requiredVars = [
    "NOTION_API_KEY",
    "NOTION_CONTACT_DATABASE_ID",
    "NOTION_3D_PROJECTS_DATABASE_ID",
    "NOTION_WEB_PROJECTS_DATABASE_ID",
    "NOTION_DATABASE_PROJECTS_DATABASE_ID",
    "NOTION_TESTIMONIALS_DATABASE_ID",
    "NOTION_FAQ_DATABASE_ID",
  ]

  return requiredVars.every((varName) => !!process.env[varName])
}

export async function GET() {
  console.log("API: Starting Notion status check in environment:", process.env.NODE_ENV)

  const status = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "unknown",
    vercelEnv: process.env.VERCEL_ENV || "local",
    hasRequiredEnvVars: hasRequiredEnvVars(),
    apiKeyExists: !!process.env.NOTION_API_KEY,
    databaseIds: {
      contact: !!process.env.NOTION_CONTACT_DATABASE_ID,
      threeDProjects: !!process.env.NOTION_3D_PROJECTS_DATABASE_ID,
      webProjects: !!process.env.NOTION_WEB_PROJECTS_DATABASE_ID,
      databaseProjects: !!process.env.NOTION_DATABASE_PROJECTS_DATABASE_ID,
      testimonials: !!process.env.NOTION_TESTIMONIALS_DATABASE_ID,
      faqs: !!process.env.NOTION_FAQ_DATABASE_ID,
    },
    apiConnection: {
      success: false,
      message: "",
      error: null,
    },
  }

  // Only test API connection if API key exists
  if (process.env.NOTION_API_KEY) {
    try {
      // Use fetch directly to test the Notion API
      const response = await fetch("https://api.notion.com/v1/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Notion API error: ${errorData.message || "Unknown error"}`)
      }

      const user = await response.json()

      status.apiConnection = {
        success: true,
        message: `Connected to Notion API as ${user.name}`,
        error: null,
      }
    } catch (error) {
      status.apiConnection = {
        success: false,
        message: "Failed to connect to Notion API",
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  return NextResponse.json(status)
}
