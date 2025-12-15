import { NextResponse } from "next/server"
import type { NotionRichText, NotionFile, NotionPageGeneric, NotionMultiSelectItem } from "@/types/notion"

export const runtime = "nodejs" // Force Node.js runtime


// Helper function to safely extract rich text from Notion
function extractRichText(richText: NotionRichText[] | undefined): string {
  if (!richText || !Array.isArray(richText) || richText.length === 0) return ""
  return richText.map((text) => text?.plain_text || "").join("")
}

// Update the extractFileUrl function to handle STL files
function extractFileUrl(files: NotionFile[] | undefined, fileType = "image"): string {
  if (!files || !Array.isArray(files) || files.length === 0) {
    return fileType === "image" ? "/placeholder.svg?height=400&width=600" : ""
  }

  const file = files[0]
  if (!file) return fileType === "image" ? "/placeholder.svg?height=400&width=600" : ""

  if (file.type === "external" && file.external?.url) {
    return file.external.url
  } else if (file.type === "file" && file.file?.url) {
    return file.file.url
  }

  return fileType === "image" ? "/placeholder.svg?height=400&width=600" : ""
}

export async function GET(request: Request, { params }: { params: { category: string } }) {
  const category = params.category

  // If no category is specified, return an empty array
  if (!category) {
    return NextResponse.json([])
  }

  // Determine which database ID to use
  let databaseId
  switch (category) {
    case "database":
      databaseId = process.env.NOTION_DATABASE_PROJECTS_DATABASE_ID
      break
    case "web":
      databaseId = process.env.NOTION_WEB_PROJECTS_DATABASE_ID
      break
    case "3d":
      databaseId = process.env.NOTION_3D_PROJECTS_DATABASE_ID
      break
    default:
      // If category doesn't match any known category, return an empty array
      return NextResponse.json([])
  }

  // Check if we're in a development environment or if API keys are missing
  if (!process.env.NOTION_API_KEY || !databaseId) {
    return NextResponse.json([])
  }

  try {

    // Use fetch directly to query the Notion API
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
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
      console.error(`API: Error querying Notion ${category} database:`, errorData)
      throw new Error(`Notion API error: ${errorData.message || "Unknown error"}`)
    }

    const data = await response.json()

    // Define project type with optional category-specific fields
    interface Project {
      id: string
      title: string
      description: string
      client: string
      image: string
      featured: boolean
      order: number | null | undefined
      technologies?: string[]
      url?: string
      materials?: string[]
      application?: string
      stlFile?: string
      printTime?: number
      status?: string
    }

    // In the GET function, update the project mapping to include STL files
    const projects = data.results.map((page: NotionPageGeneric) => {
      const properties = page.properties || {}

      // Extract the project data
      const title = properties["Project Title"]?.title?.[0]?.plain_text || "Untitled Project"
      const description = extractRichText(properties.Description?.rich_text)
      const client = extractRichText(properties.Client?.rich_text)
      const image = properties.Image?.files?.length
        ? extractFileUrl(properties.Image.files, "image")
        : "/placeholder.svg?height=400&width=600"
      const featured = properties.Featured?.checkbox || false
      const order = properties.Order?.number

      const project: Project = {
        id: page.id,
        title,
        description,
        client,
        image,
        featured,
        order,
      }

      // Add category-specific properties
      if (category === "database" || category === "web") {
        if (properties.Technologies?.multi_select) {
          project.technologies = properties.Technologies.multi_select.map((tech: NotionMultiSelectItem) => tech.name || "")
        }

        if (category === "web" && properties["Website URL"]?.url) {
          project.url = properties["Website URL"].url
        }
      } else if (category === "3d") {
        // For 3D projects, handle the different field structure
        // Image is a rich_text field, not files
        if (properties.Image?.rich_text?.length) {
          const imageText = extractRichText(properties.Image.rich_text)
          project.image = imageText || "/placeholder.svg?height=400&width=600"
        }

        if (properties.Materials?.multi_select) {
          project.materials = properties.Materials.multi_select.map((material: NotionMultiSelectItem) => material.name || "")
        }

        if (properties.Application?.select) {
          project.application = properties.Application.select.name
        }

        // Add STL file URL from the STL field (files type)
        if (properties.STL?.files?.length) {
          project.stlFile = extractFileUrl(properties.STL.files, "stl")
        }

        // Add additional 3D-specific fields
        if (properties["Print Time"]?.number) {
          project.printTime = properties["Print Time"].number
        }

        if (properties.Status?.status) {
          project.status = properties.Status.status.name
        }
      }

      return project
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error(`API: Error fetching ${category} projects:`, error)
    return NextResponse.json([], { status: 500 })
  }
}
