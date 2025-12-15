"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { SectionTitle } from "@/components/ui/section-title"
import { CyberButton } from "@/components/ui/cyber-button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ExternalLink } from "lucide-react"
import type { WebProject } from "@/types/notion"

export function WebPortfolioSection({ title = "Our Web Design Portfolio" }) {
  const [projects, setProjects] = useState<WebProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true)
        const timestamp = new Date().getTime()
        const response = await fetch(`/api/projects/web?t=${timestamp}`, {
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
        console.log(`Web projects fetched:`, data)

        // Filter for featured projects with URLs
        const featuredProjects = data
          .filter((project: WebProject) => project.url && project.featured)
          // Sort by the order field
          .sort((a: WebProject, b: WebProject) => {
            // If order is not defined, put at the end
            if (a.order === undefined) return 1
            if (b.order === undefined) return -1
            return a.order - b.order
          })

        setProjects(featuredProjects)

        // Set the first project as active by default if there are projects
        if (featuredProjects.length > 0) {
          setActiveTab(featuredProjects[0].id)
        }

        setError(null)
      } catch (err) {
        console.error(`Error fetching web projects:`, err)
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

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
          <div className="mt-12">
            {/* Project tabs */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setActiveTab(project.id)}
                  className={`px-4 py-2 rounded-sm transition-all duration-300 ${
                    activeTab === project.id
                      ? "bg-emerald-500 text-white cyber-border"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  {project.title}
                </button>
              ))}
            </div>

            {/* Active project display */}
            {activeTab && (
              <div className="flex flex-col gap-8">
                {/* Embedded website - now at the top and full width */}
                <div className="bg-zinc-900 p-1 rounded-sm cyber-border">
                  <div className="relative w-full bg-white rounded-sm overflow-hidden">
                    {/* Toolbar to make it look like a browser window */}
                    <div className="bg-zinc-800 p-2 flex items-center">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="mx-auto px-4 py-1 bg-zinc-700 rounded-full text-xs text-white max-w-xs truncate">
                        {projects.find((p) => p.id === activeTab)?.url}
                      </div>
                    </div>

                    {/* The actual iframe - made taller for better viewing */}
                    <div className="aspect-[16/9] w-full">
                      <iframe
                        src={projects.find((p) => p.id === activeTab)?.url}
                        className="w-full h-full border-0"
                        title={projects.find((p) => p.id === activeTab)?.title}
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin"
                      ></iframe>
                    </div>

                    {/* Overlay for touch devices to prevent accidental interaction */}
                    <div className="absolute inset-0 bg-transparent lg:hidden">
                      <div className="absolute bottom-4 left-0 right-0 text-center">
                        <Link
                          href={projects.find((p) => p.id === activeTab)?.url || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-500 text-white px-4 py-2 rounded-sm inline-flex items-center"
                        >
                          <span className="flex items-center">
                            Open Website <ExternalLink className="ml-2 h-4 w-4" />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project info - now at the bottom */}
                <div className="bg-zinc-900 p-6 rounded-sm cyber-border">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                      <h3 className="metallic-text text-2xl font-bold mb-2">
                        {projects.find((p) => p.id === activeTab)?.title}
                      </h3>
                      <p className="text-white">{projects.find((p) => p.id === activeTab)?.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <Link
                        href={projects.find((p) => p.id === activeTab)?.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center"
                      >
                        <CyberButton>
                          <span className="flex items-center">
                            Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                          </span>
                        </CyberButton>
                      </Link>
                    </div>
                  </div>

                  {projects.find((p) => p.id === activeTab)?.technologies && (
                    <div className="mt-4 pt-4 border-t border-zinc-800">
                      <h4 className="text-emerald-500 font-medium mb-2">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {projects
                          .find((p) => p.id === activeTab)
                          ?.technologies?.map((tech: string, index: number) => (
                            <span key={index} className="bg-zinc-800 text-white px-3 py-1 rounded-sm text-sm">
                              {tech}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
