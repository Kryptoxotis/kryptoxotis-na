"use client"

import { useState, useEffect } from "react"
import { TestimonialCard } from "@/components/ui/testimonial-card"
import { SectionTitle } from "@/components/ui/section-title"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        setLoading(true)
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
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setTestimonials(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching testimonials:", err)
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Client Testimonials" centered />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-white">Loading testimonials...</p>
          </div>
        ) : error ? (
          <div className="text-center p-6 bg-zinc-900 rounded-sm cyber-border">
            <p className="text-white mb-2">Unable to load testimonials at this time.</p>
            <p className="text-zinc-400 text-sm">Please check back later.</p>
            <p className="text-zinc-400 text-xs mt-2">Error: {error}</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center p-6">
            <p className="text-white">No testimonials available at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                avatar={testimonial.avatar}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
