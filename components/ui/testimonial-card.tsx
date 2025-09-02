import Image from "next/image"
import { cn } from "@/lib/utils"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  avatar?: string
  className?: string
}

export function TestimonialCard({
  quote,
  author,
  role,
  avatar = "/placeholder.svg?height=80&width=80",
  className,
}: TestimonialCardProps) {
  return (
    <div className={cn("relative rounded-sm bg-zinc-900 p-6 cyber-border", className)}>
      <div className="mb-4">
        <svg className="h-8 w-8 text-teal-500 mb-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p className="text-white">{quote}</p>
      </div>

      <div className="flex items-center">
        <div className="mr-4 h-10 w-10 overflow-hidden rounded-full border border-teal-500">
          <Image
            src={avatar || "/placeholder.svg"}
            alt={author}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="font-medium text-white">{author}</p>
          <p className="text-sm text-white">{role}</p>
        </div>
      </div>
    </div>
  )
}
