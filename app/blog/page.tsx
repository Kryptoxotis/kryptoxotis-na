"use client"

import { useState, useEffect } from "react"
import { SectionTitle } from "@/components/ui/section-title"
import { BlogCard } from "@/components/ui/blog-card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Search, Filter } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  tags: string[]
  publishDate: string
  estimatedReadTime: number
  author: string
  featured: boolean
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
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
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log("Blog posts fetched:", data)
        setPosts(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching blog posts:", err)
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // Filter posts based on search term and category
  useEffect(() => {
    let filtered = posts

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    setFilteredPosts(filtered)
  }, [posts, searchTerm, selectedCategory])

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(posts.map((post) => post.category)))]

  // Separate featured and regular posts
  // Since all posts from API are already published, we just need to separate by featured status
  // Featured posts: published AND featured = true
  const featuredPosts = filteredPosts.filter((post) => post.featured === true)
  // Regular posts: published AND featured = false
  const regularPosts = filteredPosts.filter((post) => post.featured === false)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="metallic-text text-4xl md:text-5xl font-bold mb-6">Kryptoxotis Blog</h1>
            <p className="text-white text-xl">
              Insights, tutorials, and industry updates on technology, business automation, and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-700 rounded-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-700 rounded-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 appearance-none"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <LoadingSpinner size="lg" />
              <p className="mt-4 text-white">Loading blog posts...</p>
            </div>
          ) : error ? (
            <div className="text-center p-6 bg-zinc-900 rounded-sm cyber-border">
              <p className="text-white mb-2">Unable to load blog posts at this time.</p>
              <p className="text-zinc-400 text-sm">Please check back later.</p>
              <p className="text-zinc-400 text-xs mt-2">Error: {error}</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center p-6">
              <p className="text-white">No blog posts found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Featured Posts */}
              {featuredPosts.length > 0 && (
                <div>
                  <SectionTitle title="Featured Articles" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredPosts.map((post) => (
                      <BlogCard key={post.id} {...post} />
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Posts */}
              {regularPosts.length > 0 && (
                <div>
                  <SectionTitle title={featuredPosts.length > 0 ? "Latest Articles" : "All Articles"} />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularPosts.map((post) => (
                      <BlogCard key={post.id} {...post} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
