import { NextResponse } from "next/server"

export const runtime = "nodejs" // Force Node.js runtime

// Mock data for FAQs
const mockFAQs = [
  {
    id: "1",
    question: "What services does Kryptoxotis offer?",
    answer:
      "Kryptoxotis specializes in Business Database Management & Automation, Web Design, and 3D Printing services. We provide comprehensive solutions tailored to your business needs.",
  },
  {
    id: "2",
    question: "How can database automation benefit my business?",
    answer:
      "Database automation can streamline your operations, reduce manual errors, save time, and provide valuable insights through data analysis, ultimately leading to better decision-making and increased productivity.",
  },
  {
    id: "3",
    question: "What is the typical timeline for a web design project?",
    answer:
      "The timeline varies depending on the complexity of the project. A basic website might take 2-4 weeks, while more complex sites with custom functionality could take 2-3 months. We'll provide a detailed timeline during our initial consultation.",
  },
  {
    id: "4",
    question: "Do you offer maintenance services after project completion?",
    answer:
      "Yes, we offer ongoing maintenance and support services to ensure your systems continue to run smoothly. We can create a maintenance plan tailored to your specific needs.",
  },
  {
    id: "5",
    question: "What materials do you use for 3D printing?",
    answer:
      "We work with a variety of materials including PLA, ABS, PETG, TPU, and nylon. The choice of material depends on the specific requirements of your project, such as durability, flexibility, and heat resistance.",
  },
]

// Helper function to safely extract rich text from Notion
function extractRichText(richText: any[] | undefined): string {
  if (!richText || !Array.isArray(richText) || richText.length === 0) return ""
  return richText.map((text) => text?.plain_text || "").join("")
}

export async function GET(request: Request) {
  console.log("API: Starting getFAQs function in environment:", process.env.NODE_ENV)
  console.log("API: Request headers:", Object.fromEntries(request.headers.entries()))

  // Check if we're in a development environment or if API keys are missing
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_FAQ_DATABASE_ID) {
    console.log("API: Using mock FAQ data due to missing environment variables")
    return NextResponse.json(mockFAQs)
  }

  try {
    console.log("API: Querying Notion FAQ database")

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
    console.log(`API: Received ${data.results.length} FAQs from Notion`)

    // Process the results
    const faqs = data.results.map((page: any) => {
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
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.error("API: Error fetching FAQs:", error)

    // In production, return mock data with error info
    if (process.env.NODE_ENV === "production") {
      return new NextResponse(
        JSON.stringify({
          items: mockFAQs,
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

    return new NextResponse(JSON.stringify(mockFAQs), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  }
}
