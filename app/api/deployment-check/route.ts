import { NextResponse } from "next/server"

export const runtime = "nodejs" // Force Node.js runtime

export async function GET() {
  const deploymentInfo = {
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV || "local",
    },
    runtimeInfo: {
      node: process.version,
      platform: process.platform,
    },
    headers: {},
    notionConfig: {
      apiKeyExists: !!process.env.NOTION_API_KEY,
      apiKeyPrefix: process.env.NOTION_API_KEY ? process.env.NOTION_API_KEY.substring(0, 4) : null,
      databaseIdsExist: {
        contact: !!process.env.NOTION_CONTACT_DATABASE_ID,
        threeDProjects: !!process.env.NOTION_3D_PROJECTS_DATABASE_ID,
        webProjects: !!process.env.NOTION_WEB_PROJECTS_DATABASE_ID,
        databaseProjects: !!process.env.NOTION_DATABASE_PROJECTS_DATABASE_ID,
        testimonials: !!process.env.NOTION_TESTIMONIALS_DATABASE_ID,
        faqs: !!process.env.NOTION_FAQ_DATABASE_ID,
      },
    },
  }

  return NextResponse.json(deploymentInfo)
}
