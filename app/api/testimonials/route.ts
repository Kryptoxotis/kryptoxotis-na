import { NextResponse } from "next/server"

export const runtime = "nodejs" // Force Node.js runtime

// Mock data for testimonials
const mockTestimonials = [
  {
    id: "1",
    quote:
      "Kryptoxotis transformed our outdated database system into a streamlined, automated powerhouse. Our efficiency has increased by 40%!",
    author: "Sarah Johnson",
    role: "Operations Director, TechCorp",
  },
  {
    id: "2",
    quote:
      "The web design team at Kryptoxotis created a stunning website that perfectly captures our brand. The attention to detail is remarkable.",
    author: "Michael Chen",
    role: "Marketing Manager, Innovate Inc.",
  },
  {
    id: "3",
    quote:
      "Their 3D printing service helped us rapidly prototype our product, saving us months of development time. The quality exceeded our expectations.",
    author: "Jessica Rodriguez",
    role: "Product Developer, NextGen Solutions",
  },
]

// Helper function to safely extract rich text from Notion
function extractRichText(richText: any[] | undefined): string {
  if (!richText || !Array.isArray(richText) || richText.length === 0) return ""
  return richText.map((text) => text?.plain_text || "").join("")
}

// Helper function to safely get the first URL from a files array
function extractFileUrl(files: any[] | undefined): string {
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
  console.log("API: Starting getTestimonials function in environment:", process.env.NODE_ENV)
  console.log("API: Request headers:", Object.fromEntries(request.headers.entries()))

  // Check if we're in a development environment or if API keys are missing
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_TESTIMONIALS_DATABASE_ID) {
    console.log("API: Using mock testimonials data due to missing environment variables")
    return NextResponse.json(mockTestimonials)
  }

  try {
    console.log("API: Querying Notion testimonials database")

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
    console.log(`API: Received ${data.results.length} testimonials from Notion`)

    // Process the results
    const testimonials = data.results.map((page: any) => {
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
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.error("API: Error fetching testimonials:", error)

    // In production, return mock data with error info
    if (process.env.NODE_ENV === "production") {
      return new NextResponse(
        JSON.stringify({
          items: mockTestimonials,
          error: {
            message: error instanceof Error ? error.message : "Unknown error",
            type: "fetch_error",
          },
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        },
      )
    }

    return new NextResponse(JSON.stringify(mockTestimonials), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  }
}
