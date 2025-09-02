import { NextResponse } from "next/server"

export const runtime = "nodejs" // Force Node.js runtime

export async function POST(request: Request) {
  console.log("API: Starting submitContactForm function in environment:", process.env.NODE_ENV)

  // Parse the request body
  const data = await request.json()

  // Check if we're in a development environment or if API keys are missing
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_CONTACT_DATABASE_ID) {
    console.log("API: Mock contact form submission due to missing environment variables")
    return NextResponse.json({
      success: true,
      message: "Thank you for your message. We'll get back to you soon! (Development mode)",
    })
  }

  try {
    console.log("API: Submitting contact form to Notion")

    // Use fetch directly to create a page in Notion
    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: {
          database_id: process.env.NOTION_CONTACT_DATABASE_ID,
        },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: data.name,
                },
              },
            ],
          },
          Email: {
            email: data.email,
          },
          Subject: {
            select: {
              name: data.subject,
            },
          },
          Message: {
            rich_text: [
              {
                text: {
                  content: data.message,
                },
              },
            ],
          },
          "Date Submitted": {
            date: {
              start: new Date().toISOString(),
            },
          },
          Status: {
            select: {
              name: "New",
            },
          },
        },
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("API: Error creating Notion page:", errorData)
      throw new Error(`Notion API error: ${errorData.message || "Unknown error"}`)
    }

    console.log("API: Contact form submitted successfully")

    return NextResponse.json({
      success: true,
      message: "Thank you for your message. We'll get back to you soon!",
    })
  } catch (error) {
    console.error("API: Error submitting contact form:", error)
    return NextResponse.json({
      success: false,
      message: "There was an error submitting your message. Please try again later.",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
