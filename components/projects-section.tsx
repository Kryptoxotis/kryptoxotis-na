"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { SectionTitle } from "@/components/ui/section-title"
import { CyberButton } from "@/components/ui/cyber-button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface ProjectsSectionProps {
  category: string
  title?: string
}

export function ProjectsSection({ category, title = "Portfolio" }: ProjectsSectionProps) {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true)
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
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log(`${category} projects fetched:`, data)
        setProjects(data)
        setError(null)
      } catch (err) {
        console.error(`Error fetching ${category} projects:`, err)
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [category])

  return (
    <section className="py-20 bg-zinc-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={title} centered />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-white">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="text-center p-6 bg-zinc-900 rounded-sm cyber-border">
            <p className="text-white mb-2">Unable to load projects at this time.</p>
            <p className="text-zinc-400 text-sm">Please check back later.</p>
            <p className="text-zinc-400 text-xs mt-2">Error: {error}</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center p-6">
            <p className="text-white">No projects available at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {projects.map((project) => (
              <div key={project.id} className="group relative overflow-hidden rounded-sm bg-zinc-900 cyber-border">
                <div className="aspect-square bg-zinc-800 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg?height=400&width=600"}
                    alt={project.title}
                    width={600}
                    height={600}
                    className="h-full w-full object-contain p-2 transition-all duration-300 group-hover:scale-102"
                  />
                </div>
                <div className="p-4">
                  <h3 className="metallic-text text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-white mb-4">{project.description}</p>
                  {project.url && (
                    <Link href={project.url} target="_blank" rel="noopener noreferrer">
                      <CyberButton variant="outline" size="sm">
                        View Details
                      </CyberButton>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
