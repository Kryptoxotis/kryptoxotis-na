"use client"

import { useState, useEffect } from "react"
import { FAQItem } from "@/components/ui/faq-item"
import { SectionTitle } from "@/components/ui/section-title"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export function FAQsSection() {
  const [faqs, setFaqs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchFAQs() {
      try {
        setLoading(true)
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
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log("FAQs fetched:", data)
        setFaqs(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching FAQs:", err)
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchFAQs()
  }, [])

  return (
    <section className="py-20 bg-zinc-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Frequently Asked Questions" centered />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-white">Loading FAQs...</p>
          </div>
        ) : error ? (
          <div className="text-center p-6 bg-zinc-900 rounded-sm cyber-border">
            <p className="text-white mb-2">Unable to load FAQs at this time.</p>
            <p className="text-zinc-400 text-sm">Please check back later.</p>
            <p className="text-zinc-400 text-xs mt-2">Error: {error}</p>
          </div>
        ) : faqs.length === 0 ? (
          <div className="text-center p-6">
            <p className="text-white">No FAQs available at this time.</p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto mt-12">
            {faqs.map((faq) => (
              <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
