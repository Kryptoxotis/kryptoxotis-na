import { NextResponse } from "next/server"

export const runtime = "nodejs" // Force Node.js runtime

export async function GET() {
  console.log("API: Starting comprehensive Notion diagnostic in environment:", process.env.NODE_ENV)

  const diagnostic = {
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
    },
    notionConfig: {
      apiKeyExists: !!process.env.NOTION_API_KEY,
      apiKeyLength: process.env.NOTION_API_KEY ? process.env.NOTION_API_KEY.length : 0,
      apiKeyPrefix: process.env.NOTION_API_KEY ? process.env.NOTION_API_KEY.substring(0, 4) + "..." : null,
      databases: {
        contact: {
          exists: !!process.env.NOTION_CONTACT_DATABASE_ID,
          id: process.env.NOTION_CONTACT_DATABASE_ID
            ? `${process.env.NOTION_CONTACT_DATABASE_ID.substring(0, 4)}...${process.env.NOTION_CONTACT_DATABASE_ID.substring(process.env.NOTION_CONTACT_DATABASE_ID.length - 4)}`
            : null,
        },
        threeDProjects: {
          exists: !!process.env.NOTION_3D_PROJECTS_DATABASE_ID,
          id: process.env.NOTION_3D_PROJECTS_DATABASE_ID
            ? `${process.env.NOTION_3D_PROJECTS_DATABASE_ID.substring(0, 4)}...${process.env.NOTION_3D_PROJECTS_DATABASE_ID.substring(process.env.NOTION_3D_PROJECTS_DATABASE_ID.length - 4)}`
            : null,
        },
        webProjects: {
          exists: !!process.env.NOTION_WEB_PROJECTS_DATABASE_ID,
          id: process.env.NOTION_WEB_PROJECTS_DATABASE_ID
            ? `${process.env.NOTION_WEB_PROJECTS_DATABASE_ID.substring(0, 4)}...${process.env.NOTION_WEB_PROJECTS_DATABASE_ID.substring(process.env.NOTION_WEB_PROJECTS_DATABASE_ID.length - 4)}`
            : null,
        },
        databaseProjects: {
          exists: !!process.env.NOTION_DATABASE_PROJECTS_DATABASE_ID,
          id: process.env.NOTION_DATABASE_PROJECTS_DATABASE_ID
            ? `${process.env.NOTION_DATABASE_PROJECTS_DATABASE_ID.substring(0, 4)}...${process.env.NOTION_DATABASE_PROJECTS_DATABASE_ID.substring(process.env.NOTION_DATABASE_PROJECTS_DATABASE_ID.length - 4)}`
            : null,
        },
        testimonials: {
          exists: !!process.env.NOTION_TESTIMONIALS_DATABASE_ID,
          id: process.env.NOTION_TESTIMONIALS_DATABASE_ID
            ? `${process.env.NOTION_TESTIMONIALS_DATABASE_ID.substring(0, 4)}...${process.env.NOTION_TESTIMONIALS_DATABASE_ID.substring(process.env.NOTION_TESTIMONIALS_DATABASE_ID.length - 4)}`
            : null,
        },
        faqs: {
          exists: !!process.env.NOTION_FAQ_DATABASE_ID,
          id: process.env.NOTION_FAQ_DATABASE_ID
            ? `${process.env.NOTION_FAQ_DATABASE_ID.substring(0, 4)}...${process.env.NOTION_FAQ_DATABASE_ID.substring(process.env.NOTION_FAQ_DATABASE_ID.length - 4)}`
            : null,
        },
      },
    },
    apiTests: {
      userInfo: null as any,
      databaseAccess: {} as Record<string, any>,
    },
    errors: [] as string[],
    requestInfo: {
      headers: {} as Record<string, string>,
    },
  }

  // Test 1: Check if we can connect to Notion API
  if (process.env.NOTION_API_KEY) {
    try {
      const response = await fetch("https://api.notion.com/v1/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
        },
      })

      // Store response headers for debugging
      diagnostic.requestInfo.headers = Object.fromEntries(response.headers.entries())

      if (response.ok) {
        const userData = await response.json()
        diagnostic.apiTests.userInfo = {
          success: true,
          name: userData.name,
          id: userData.id,
          type: userData.type,
        }
      } else {
        const errorData = await response.json()
        diagnostic.apiTests.userInfo = {
          success: false,
          status: response.status,
          error: errorData.message || "Unknown error",
        }
        diagnostic.errors.push(`Notion API authentication failed: ${errorData.message || "Unknown error"}`)
      }
    } catch (error) {
      diagnostic.apiTests.userInfo = {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
      diagnostic.errors.push(`Notion API connection error: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  } else {
    diagnostic.errors.push("NOTION_API_KEY is not defined")
  }

  // Test 2: Check if we can access each database
  const databaseIds = {
    testimonials: process.env.NOTION_TESTIMONIALS_DATABASE_ID,
    faqs: process.env.NOTION_FAQ_DATABASE_ID,
  }

  if (process.env.NOTION_API_KEY) {
    for (const [key, databaseId] of Object.entries(databaseIds)) {
      if (databaseId) {
        try {
          const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
              "Notion-Version": "2022-06-28",
            },
          })

          if (response.ok) {
            const dbData = await response.json()
            diagnostic.apiTests.databaseAccess[key] = {
              success: true,
              title: dbData.title?.[0]?.plain_text || "Untitled",
              lastEditedTime: dbData.last_edited_time,
            }
          } else {
            const errorData = await response.json()
            diagnostic.apiTests.databaseAccess[key] = {
              success: false,
              status: response.status,
              error: errorData.message || "Unknown error",
            }
            diagnostic.errors.push(`Cannot access ${key} database: ${errorData.message || "Unknown error"}`)
          }
        } catch (error) {
          diagnostic.apiTests.databaseAccess[key] = {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
          }
          diagnostic.errors.push(
            `Error accessing ${key} database: ${error instanceof Error ? error.message : "Unknown error"}`,
          )
        }
      } else {
        diagnostic.apiTests.databaseAccess[key] = {
          success: false,
          error: "Database ID not defined",
        }
        diagnostic.errors.push(`${key} database ID is not defined`)
      }
    }
  }

  // Test 3: Try to query the testimonials database
  if (process.env.NOTION_API_KEY && process.env.NOTION_TESTIMONIALS_DATABASE_ID) {
    try {
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

      if (response.ok) {
        const data = await response.json()
        diagnostic.apiTests.testimonialQuery = {
          success: true,
          count: data.results.length,
        }
      } else {
        const errorData = await response.json()
        diagnostic.apiTests.testimonialQuery = {
          success: false,
          status: response.status,
          error: errorData.message || "Unknown error",
        }
        diagnostic.errors.push(`Failed to query testimonials: ${errorData.message || "Unknown error"}`)
      }
    } catch (error) {
      diagnostic.apiTests.testimonialQuery = {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
      diagnostic.errors.push(`Error querying testimonials: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  return NextResponse.json(diagnostic)
}
