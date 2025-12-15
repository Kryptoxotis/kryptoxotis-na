import { NextResponse } from "next/server"
import { z } from "zod"
import { checkRateLimit, getClientIP, getRateLimitHeaders } from "@/lib/rate-limit"
import { VALIDATION_LIMITS } from "@/lib/constants"

export const runtime = "nodejs" // Force Node.js runtime

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(VALIDATION_LIMITS.NAME_MAX_LENGTH, "Name too long"),
  email: z.string().email("Invalid email address").max(VALIDATION_LIMITS.EMAIL_MAX_LENGTH, "Email too long"),
  subject: z.string().min(1, "Subject is required").max(VALIDATION_LIMITS.SUBJECT_MAX_LENGTH, "Subject too long"),
  message: z.string().min(1, "Message is required").max(VALIDATION_LIMITS.MESSAGE_MAX_LENGTH, "Message too long"),
})

export async function POST(request: Request) {
  // CSRF protection via origin check
  const origin = request.headers.get("origin")
  const host = request.headers.get("host")
  if (origin && host && !origin.includes(host)) {
    return NextResponse.json({
      success: false,
      message: "Invalid request origin",
    }, { status: 403 })
  }

  // Rate limiting check
  const clientIP = getClientIP(request.headers)
  const rateLimitResult = checkRateLimit(clientIP, "contact")

  if (!rateLimitResult.success) {
    return NextResponse.json({
      success: false,
      message: "Too many requests. Please try again later.",
    }, {
      status: 429,
      headers: getRateLimitHeaders(rateLimitResult)
    })
  }

  // Parse and validate the request body
  let data: z.infer<typeof contactSchema>
  try {
    const body = await request.json()
    data = contactSchema.parse(body)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: "Validation failed",
        errors: error.errors.map(e => ({ field: e.path.join("."), message: e.message })),
      }, { status: 400 })
    }
    return NextResponse.json({
      success: false,
      message: "Invalid request body",
    }, { status: 400 })
  }

  // Check if we are in a development environment or if API keys are missing
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_CONTACT_DATABASE_ID) {
    console.warn('[DEV MODE] Contact form submission not saved to Notion:', data.email)
    return NextResponse.json({
      success: true,
      message: "Thank you for your message. We will get back to you soon! (Development mode)",
      dev: true
    })
  }

  try {

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


    return NextResponse.json({
      success: true,
      message: "Thank you for your message. We will get back to you soon!",
    })
  } catch (error) {
    console.error("API: Error submitting contact form:", error)
    return NextResponse.json({
      success: false,
      message: "There was an error submitting your message. Please try again later.",
    }, { status: 500 })
  }
}
