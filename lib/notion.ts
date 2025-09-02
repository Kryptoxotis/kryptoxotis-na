// Type definitions for our data structures
export interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
  order?: number
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  avatar?: string
}

export interface Project {
  id: string
  title: string
  description: string
  client?: string
  image: string
  technologies?: string[]
  completionDate?: string
  url?: string
  materials?: string[]
  application?: string
  featured?: boolean
  order?: number
  stlFile?: string
  printTime?: number
  status?: string
}

// Update the Material interface to use price instead of priceRange
export interface Material {
  id: string
  name: string
  materialType: string
  bestUses: string[]
  properties: string[]
  price: number | null
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string // Full HTML content from Notion
  category: string
  tags: string[]
  publishDate: string
  estimatedReadTime: number
  wordCount: number
  seoScore: number
  status: string
  featured: boolean
  author: string
  url?: string
  notionUrl?: string
}

export interface ContactSubmission {
  name: string
  email: string
  subject: string
  message: string
}

// Function to fetch Testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  console.log("Client: Starting getTestimonials function")

  try {
    // Add a timestamp to prevent caching
    const timestamp = new Date().getTime()
    const response = await fetch(`/api/testimonials?t=${timestamp}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Client: HTTP error! status: ${response.status}, body:`, errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const testimonials = await response.json()
    console.log(`Client: Received ${testimonials.length} testimonials`)
    return testimonials
  } catch (error) {
    console.error("Client: Error fetching testimonials:", error)
    throw error
  }
}

// Function to fetch FAQs
export async function getFAQs(): Promise<FAQ[]> {
  console.log("Client: Starting getFAQs function")

  try {
    // Add a timestamp to prevent caching
    const timestamp = new Date().getTime()
    const response = await fetch(`/api/faqs?t=${timestamp}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Client: HTTP error! status: ${response.status}, body:`, errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const faqs = await response.json()
    console.log(`Client: Received ${faqs.length} FAQs`)
    return faqs
  } catch (error) {
    console.error("Client: Error fetching FAQs:", error)
    throw error
  }
}

// Function to fetch Projects based on category
export async function getProjects(category?: string): Promise<Project[]> {
  console.log(`Client: Starting getProjects function for category: ${category}`)

  // If no category is specified, return an empty array
  if (!category) {
    return []
  }

  try {
    // Add a timestamp to prevent caching
    const timestamp = new Date().getTime()
    const response = await fetch(`/api/projects/${category}?t=${timestamp}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Client: HTTP error! status: ${response.status}, body:`, errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const projects = await response.json()
    console.log(`Client: Received ${projects.length} ${category} projects`)
    return projects
  } catch (error) {
    console.error(`Client: Error fetching ${category} projects:`, error)
    throw error
  }
}

// Function to fetch Blog Posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  console.log("Client: Starting getBlogPosts function")

  try {
    // Add a timestamp to prevent caching
    const timestamp = new Date().getTime()
    const response = await fetch(`/api/blog?t=${timestamp}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Client: HTTP error! status: ${response.status}, body:`, errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const blogPosts = await response.json()
    console.log(`Client: Received ${blogPosts.length} blog posts`)
    return blogPosts
  } catch (error) {
    console.error("Client: Error fetching blog posts:", error)
    throw error
  }
}

// Function to fetch 3D Printing Materials
export async function getMaterials(): Promise<Material[]> {
  console.log("Client: Starting getMaterials function")

  try {
    // Add a timestamp to prevent caching
    const timestamp = new Date().getTime()
    const response = await fetch(`/api/materials?t=${timestamp}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Client: HTTP error! status: ${response.status}, body:`, errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const materials = await response.json()
    console.log(`Client: Received ${materials.length} materials`)
    return materials
  } catch (error) {
    console.error("Client: Error fetching materials:", error)
    throw error
  }
}

// Function to submit contact form data
export async function submitContactForm(data: ContactSubmission): Promise<{ success: boolean; message: string }> {
  console.log("Client: Starting submitContactForm function")

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Client: HTTP error! status: ${response.status}, body:`, errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log("Client: Contact form submitted successfully")
    return result
  } catch (error) {
    console.error("Client: Error submitting contact form:", error)
    return {
      success: false,
      message: "There was an error submitting your message. Please try again later.",
    }
  }
}
