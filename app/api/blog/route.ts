import { NextResponse } from "next/server"
import { Client } from "@notionhq/client"

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

// Helper function to convert Notion rich text to HTML
function richTextToHtml(richText: any[]): string {
  if (!richText || !Array.isArray(richText)) return ""

  return richText
    .map((text) => {
      let content = text.plain_text || ""

      // Apply formatting
      if (text.annotations?.bold) content = `<strong>${content}</strong>`
      if (text.annotations?.italic) content = `<em>${content}</em>`
      if (text.annotations?.strikethrough) content = `<del>${content}</del>`
      if (text.annotations?.underline) content = `<u>${content}</u>`
      if (text.annotations?.code) content = `<code>${content}</code>`

      // Handle links
      if (text.href) content = `<a href="${text.href}" target="_blank" rel="noopener noreferrer">${content}</a>`

      return content
    })
    .join("")
}

// Helper function to convert Notion blocks to HTML with timeout
async function blocksToHtml(blocks: any[]): Promise<string> {
  try {
    const htmlBlocks = await Promise.all(
      blocks.map(async (block) => {
        switch (block.type) {
          case "paragraph":
            const paragraphText = richTextToHtml(block.paragraph?.rich_text || [])
            return paragraphText ? `<p>${paragraphText}</p>` : ""

          case "heading_1":
            const h1Text = richTextToHtml(block.heading_1?.rich_text || [])
            return h1Text ? `<h1>${h1Text}</h1>` : ""

          case "heading_2":
            const h2Text = richTextToHtml(block.heading_2?.rich_text || [])
            return h2Text ? `<h2>${h2Text}</h2>` : ""

          case "heading_3":
            const h3Text = richTextToHtml(block.heading_3?.rich_text || [])
            return h3Text ? `<h3>${h3Text}</h3>` : ""

          case "bulleted_list_item":
            const bulletText = richTextToHtml(block.bulleted_list_item?.rich_text || [])
            return bulletText ? `<li>${bulletText}</li>` : ""

          case "numbered_list_item":
            const numberedText = richTextToHtml(block.numbered_list_item?.rich_text || [])
            return numberedText ? `<li>${numberedText}</li>` : ""

          case "quote":
            const quoteText = richTextToHtml(block.quote?.rich_text || [])
            return quoteText ? `<blockquote>${quoteText}</blockquote>` : ""

          case "code":
            const codeText = richTextToHtml(block.code?.rich_text || [])
            const language = block.code?.language || "text"
            return codeText ? `<pre><code class="language-${language}">${codeText}</code></pre>` : ""

          case "divider":
            return "<hr>"

          case "image":
            const imageUrl = block.image?.file?.url || block.image?.external?.url
            const caption = richTextToHtml(block.image?.caption || [])
            return imageUrl
              ? `<figure><img src="${imageUrl}" alt="${caption}" />${caption ? `<figcaption>${caption}</figcaption>` : ""}</figure>`
              : ""

          default:
            return ""
        }
      }),
    )

    // Group consecutive list items
    let html = htmlBlocks.join("")

    // Wrap consecutive <li> elements in <ul> tags
    html = html.replace(/(<li>.*?<\/li>)(?=\s*<li>|$)/gs, (match, li, offset, string) => {
      const beforeMatch = string.substring(0, offset)
      const afterMatch = string.substring(offset + match.length)

      const isFirstLi = !beforeMatch.endsWith("</li>")
      const isLastLi = !afterMatch.startsWith("<li>")

      if (isFirstLi && isLastLi) {
        return `<ul>${match}</ul>`
      } else if (isFirstLi) {
        return `<ul>${match}`
      } else if (isLastLi) {
        return `${match}</ul>`
      } else {
        return match
      }
    })

    return html
  } catch (error) {
    console.error("Error converting blocks to HTML:", error)
    return "<p>Content could not be loaded.</p>"
  }
}

// Helper function to fetch content with timeout and retry
async function fetchPageContent(pageId: string, retries = 2): Promise<string> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      console.log(`Fetching content for page ${pageId}, attempt ${attempt + 1}`)

      // Add timeout to the request
      const timeoutPromise = new Promise(
        (_, reject) => setTimeout(() => reject(new Error("Request timeout")), 10000), // 10 second timeout
      )

      const blocksPromise = notion.blocks.children.list({
        block_id: pageId,
      })

      const blocksResponse = (await Promise.race([blocksPromise, timeoutPromise])) as any
      const content = await blocksToHtml(blocksResponse.results)

      console.log(`Successfully fetched content for page ${pageId}`)
      return content
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed for page ${pageId}:`, error)

      if (attempt === retries) {
        console.error(`All attempts failed for page ${pageId}, using fallback content`)
        return "<p>Content is temporarily unavailable. Please check back later.</p>"
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)))
    }
  }

  return "<p>Content could not be loaded.</p>"
}

export async function GET() {
  try {
    console.log("Server: Starting getBlogPosts API function")

    if (!process.env.NOTION_API_KEY) {
      console.error("Server: NOTION_API_KEY is not set")
      return NextResponse.json({ error: "Notion API key not configured" }, { status: 500 })
    }

    if (!process.env.NOTION_BLOG_DATABASE_ID) {
      console.error("Server: NOTION_BLOG_DATABASE_ID is not set")
      return NextResponse.json({ error: "Blog database ID not configured" }, { status: 500 })
    }

    console.log("Server: Fetching blog posts from Notion database")

    // Add timeout to database query
    const timeoutPromise = new Promise(
      (_, reject) => setTimeout(() => reject(new Error("Database query timeout")), 15000), // 15 second timeout
    )

    const queryPromise = notion.databases.query({
      database_id: process.env.NOTION_BLOG_DATABASE_ID,
      sorts: [
        {
          property: "Publish Date",
          direction: "descending",
        },
      ],
    })

    const response = (await Promise.race([queryPromise, timeoutPromise])) as any

    console.log(`Server: Retrieved ${response.results.length} total blog posts from Notion`)

    // Process posts in smaller batches to avoid overwhelming the API
    const batchSize = 3
    const allBlogPosts = []

    for (let i = 0; i < response.results.length; i += batchSize) {
      const batch = response.results.slice(i, i + batchSize)
      console.log(
        `Processing batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(response.results.length / batchSize)}`,
      )

      const batchResults = await Promise.all(
        batch.map(async (page: any) => {
          try {
            const properties = page.properties

            // Extract basic properties first
            const tags = properties.Tags?.multi_select?.map((tag: any) => tag.name) || []
            const publishDate = properties["Publish Date"]?.date?.start || new Date().toISOString().split("T")[0]

            // Get status - handle both status and select property types
            let status = "Draft"
            if (properties.Status?.status?.name) {
              status = properties.Status.status.name
            } else if (properties.Status?.select?.name) {
              status = properties.Status.select.name
            }

            // Only fetch content for published posts
            let content = "<p>Content preview not available.</p>"
            if (status === "Published") {
              content = await fetchPageContent(page.id)
            }

            return {
              id: page.id,
              title: properties.Title?.title?.[0]?.plain_text || "Untitled",
              excerpt: properties.Excerpt?.rich_text?.[0]?.plain_text || "",
              content: content,
              category: properties.Category?.select?.name || "General",
              tags: tags,
              publishDate: publishDate,
              estimatedReadTime: properties["Estimated Read Time"]?.number || 5,
              wordCount: properties["Word Count"]?.number || 0,
              seoScore: properties["SEO Score"]?.number || 0,
              status: status,
              featured: properties.Featured?.checkbox || false,
              author: properties.Author?.rich_text?.[0]?.plain_text || "Kryptoxotis Team",
              url: properties.URL?.url || null,
              notionUrl: page.url,
            }
          } catch (error) {
            console.error(`Server: Error processing blog post ${page.id}:`, error)
            return null
          }
        }),
      )

      allBlogPosts.push(...batchResults.filter((post) => post !== null))

      // Small delay between batches to be nice to the API
      if (i + batchSize < response.results.length) {
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
    }

    // Filter to only show published posts
    const publishedPosts = allBlogPosts.filter((post) => post.status === "Published")

    console.log(`Server: Successfully processed ${publishedPosts.length} published blog posts`)
    return NextResponse.json(publishedPosts)
  } catch (error) {
    console.error("Server: Error in getBlogPosts API:", error)

    // Return a more user-friendly error response
    return NextResponse.json(
      {
        error: "Unable to fetch blog posts at this time. Please try again later.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
