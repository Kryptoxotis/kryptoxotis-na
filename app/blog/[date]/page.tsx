import { notFound } from "next/navigation"
import Link from "next/link"
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react"
import { CyberButton } from "@/components/ui/cyber-button"
import { getBlogPosts } from "@/lib/notion"

interface BlogPostPageProps {
  params: {
    date: string
  }
}

async function getBlogPostByDate(date: string) {
  try {
    console.log("Searching for blog post with date:", date)
    const posts = await getBlogPosts()
    console.log(
      "Available posts:",
      posts.map((p) => ({ title: p.title, publishDate: p.publishDate })),
    )

    // Handle different date formats
    let searchDate: string

    if (date.includes("-")) {
      const parts = date.split("-")
      if (parts.length === 3) {
        // Check if it's MM-DD-YYYY or YYYY-MM-DD
        if (parts[0].length === 4) {
          // Already YYYY-MM-DD format
          searchDate = date
        } else {
          // Convert MM-DD-YYYY to YYYY-MM-DD
          const [month, day, year] = parts
          searchDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
        }
      } else {
        searchDate = date
      }
    } else {
      searchDate = date
    }

    console.log("Formatted search date:", searchDate)

    // Find post by matching the date
    const foundPost = posts.find((post) => {
      const postDate = new Date(post.publishDate).toISOString().split("T")[0]
      console.log(`Comparing post date ${postDate} with search date ${searchDate}`)
      return postDate === searchDate
    })

    console.log("Found post:", foundPost ? foundPost.title : "None")
    return foundPost
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostByDate(params.date)

  if (!post) {
    console.log("No post found, showing 404")
    notFound()
  }

  const formattedDate = new Date(post.publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex flex-col">
      {/* Back Navigation */}
      <section className="py-6 bg-zinc-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-emerald-500 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-12 bg-zinc-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Category */}
            <div className="mb-4">
              <span className="inline-block bg-emerald-500 text-black px-3 py-1 rounded-sm text-sm font-bold">
                {post.category}
              </span>
              {post.featured && (
                <span className="inline-block bg-zinc-800 text-emerald-400 px-3 py-1 rounded-sm text-sm font-medium ml-2">
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="metallic-text text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-zinc-400 mb-8">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {formattedDate}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {post.estimatedReadTime} min read
              </span>
              <span className="text-emerald-400">By {post.author}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <span key={index} className="flex items-center bg-zinc-800 text-white px-3 py-1 rounded-sm text-sm">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <article className="prose prose-invert prose-emerald max-w-none prose-lg">
                  <div
                    className="text-white leading-relaxed 
                    [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-6 [&>h1]:text-emerald-400 [&>h1]:mt-8
                    [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mb-4 [&>h2]:text-emerald-400 [&>h2]:mt-6
                    [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mb-3 [&>h3]:text-emerald-400 [&>h3]:mt-4
                    [&>p]:mb-4 [&>p]:leading-relaxed [&>p]:text-gray-200
                    [&>ul]:mb-4 [&>ul]:pl-6 [&>ul]:space-y-2
                    [&>ol]:mb-4 [&>ol]:pl-6 [&>ol]:space-y-2
                    [&>li]:text-gray-200 [&>li]:leading-relaxed
                    [&>ul>li]:list-disc [&>ol>li]:list-decimal
                    [&>blockquote]:border-l-4 [&>blockquote]:border-emerald-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-300 [&>blockquote]:my-6
                    [&>pre]:bg-zinc-800 [&>pre]:p-4 [&>pre]:rounded-sm [&>pre]:overflow-x-auto [&>pre]:my-4
                    [&>code]:bg-zinc-800 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-emerald-400
                    [&>hr]:border-zinc-700 [&>hr]:my-8
                    [&>figure]:my-6 [&>figure>img]:rounded-sm [&>figure>img]:w-full
                    [&>figcaption]:text-center [&>figcaption]:text-gray-400 [&>figcaption]:text-sm [&>figcaption]:mt-2
                    [&>strong]:text-emerald-400 [&>strong]:font-semibold
                    [&>em]:text-gray-300 [&>em]:italic
                    [&>a]:text-emerald-500 [&>a]:hover:text-emerald-400 [&>a]:transition-colors [&>a]:underline"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </article>

                {/* Call to Action */}
                <div className="mt-12 p-6 bg-zinc-900 rounded-sm cyber-border">
                  <h3 className="metallic-text text-xl font-bold mb-4">Ready to Transform Your Business?</h3>
                  <p className="text-white mb-4">
                    Get expert insights and solutions tailored to your needs. Contact us today to discuss how we can
                    help you achieve your goals.
                  </p>
                  <Link href="/contact">
                    <CyberButton>Get Started</CyberButton>
                  </Link>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-6">
                  {/* Article Stats */}
                  <div className="bg-zinc-900 p-4 rounded-sm cyber-border">
                    <h4 className="metallic-text font-bold mb-3">Article Stats</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Read Time:</span>
                        <span className="text-white">{post.estimatedReadTime} min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Category:</span>
                        <span className="text-emerald-400">{post.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Author:</span>
                        <span className="text-white">{post.author}</span>
                      </div>
                      {post.wordCount > 0 && (
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Words:</span>
                          <span className="text-white">{post.wordCount}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Related Topics */}
                  <div className="bg-zinc-900 p-4 rounded-sm cyber-border">
                    <h4 className="metallic-text font-bold mb-3">Related Topics</h4>
                    <div className="space-y-2">
                      {post.tags.map((tag, index) => (
                        <Link
                          key={index}
                          href={`/blog?search=${encodeURIComponent(tag)}`}
                          className="block text-emerald-500 hover:text-emerald-400 transition-colors text-sm"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
