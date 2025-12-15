// Shared TypeScript interfaces for Notion API responses

export interface NotionRichText {
  plain_text: string
  href?: string | null
  annotations?: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
  }
}

export interface NotionFile {
  type: "file" | "external"
  file?: { url: string }
  external?: { url: string }
}

export interface NotionMultiSelectItem {
  name: string
}

export interface NotionSelectItem {
  name: string
}

export interface NotionPage<T = Record<string, unknown>> {
  id: string
  url?: string
  properties: T
}

// Generic Notion property structure for dynamic access
export interface NotionGenericProperties {
  [key: string]: {
    title?: Array<{ plain_text: string }>
    rich_text?: NotionRichText[]
    checkbox?: boolean
    number?: number | null
    select?: NotionSelectItem | null
    multi_select?: NotionMultiSelectItem[]
    files?: NotionFile[]
    url?: string | null
    status?: { name: string } | null
  } | undefined
}

// Use this for routes that need flexible property access
export type NotionPageGeneric = NotionPage<NotionGenericProperties>

export interface NotionDatabaseResponse {
  results: NotionPage[]
  has_more?: boolean
  next_cursor?: string | null
}

// Testimonial-specific types
export interface TestimonialProperties {
  Quote?: { rich_text: NotionRichText[] }
  "Client Name"?: { title: Array<{ plain_text: string }> }
  Role?: { rich_text: NotionRichText[] }
  Avatar?: { files: NotionFile[] }
}

// FAQ-specific types
export interface FAQProperties {
  Question?: { title: Array<{ plain_text: string }> }
  Answer?: { rich_text: NotionRichText[] }
  Category?: { select: NotionSelectItem | null }
  Order?: { number: number | null }
}

// Material-specific types
export interface MaterialProperties {
  "Material Name"?: { title: Array<{ plain_text: string }> }
  "Material Type"?: { select: NotionSelectItem | null }
  "Best Uses"?: { multi_select: NotionMultiSelectItem[] }
  Properties?: { multi_select: NotionMultiSelectItem[] }
  Price?: { number: number | null }
}

// Project-specific types
export interface ProjectProperties {
  "Project Title"?: { title: Array<{ plain_text: string }> }
  Description?: { rich_text: NotionRichText[] }
  Client?: { rich_text: NotionRichText[] }
  Image?: { files?: NotionFile[]; rich_text?: NotionRichText[] }
  Featured?: { checkbox: boolean }
  Order?: { number: number | null }
  Technologies?: { multi_select: NotionMultiSelectItem[] }
  "Website URL"?: { url: string | null }
  Materials?: { multi_select: NotionMultiSelectItem[] }
  Application?: { select: NotionSelectItem | null }
  STL?: { files: NotionFile[] }
  "Print Time"?: { number: number | null }
  Status?: { status: { name: string } | null }
}

// Web project interface for components
export interface WebProject {
  id: string
  title: string
  description: string
  client: string
  image: string
  featured: boolean
  order?: number
  technologies?: string[]
  url?: string
}

// API response data types for client components
export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  avatar?: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
  order?: number
}

export interface Material {
  id: string
  name: string
  materialType: string
  bestUses: string[]
  properties: string[]
  price: number | null
}
