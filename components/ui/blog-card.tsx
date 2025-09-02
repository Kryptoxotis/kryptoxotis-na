import Link from "next/link"
import { Calendar, Clock, Tag } from "lucide-react"

interface BlogCardProps {
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

export function BlogCard({
  id,
  title,
  excerpt,
  category,
  tags,
  publishDate,
  estimatedReadTime,
  author,
  featured,
}: BlogCardProps) {
  // Create date-based URL - use YYYY-MM-DD format for consistency
  const dateUrl = new Date(publishDate).toISOString().split("T")[0]

  const displayDate = new Date(publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Link href={`/blog/${dateUrl}`} className="block">
      <div className="bg-zinc-900 rounded-sm cyber-border overflow-hidden hover:border-emerald-500 transition-all duration-300 hover:scale-[1.02] cursor-pointer group h-full">
        <div className="p-6 h-full flex flex-col">
          {/* Category and Featured Badge */}
          <div className="flex items-center justify-between mb-4">
            <span className="bg-emerald-500 text-black px-3 py-1 rounded-sm text-sm font-bold">{category}</span>
            {featured && (
              <span className="bg-zinc-800 text-emerald-400 px-3 py-1 rounded-sm text-sm font-medium">Featured</span>
            )}
          </div>

          {/* Title */}
          <h3 className="metallic-text text-xl font-bold mb-3 group-hover:text-emerald-400 transition-colors flex-grow">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-zinc-300 mb-4 line-clamp-3 flex-grow">{excerpt}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="flex items-center bg-zinc-800 text-white px-2 py-1 rounded-sm text-xs">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
            {tags.length > 3 && <span className="text-zinc-400 text-xs px-2 py-1">+{tags.length - 3} more</span>}
          </div>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-sm text-zinc-400 mb-4">
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {displayDate}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {estimatedReadTime} min read
            </span>
          </div>

          {/* Author */}
          <p className="text-emerald-400 text-sm">By {author}</p>
        </div>
      </div>
    </Link>
  )
}
