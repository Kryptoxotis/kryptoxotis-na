"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionTitle } from "@/components/ui/section-title"
import { getProjects, type Project } from "@/lib/notion"
import { STLModelViewer } from "./stl-model-viewer"
import { LoadingSpinner } from "./ui/loading-spinner"

export function ThreeDModelGallery() {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const allProjects = await getProjects("3d")
        // Filter for only featured projects that have STL files
        const featuredProjects = allProjects.filter((project) => project.featured && project.stlFile)
        setProjects(featuredProjects)
      } catch (error) {
        console.error("Error fetching 3D projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Our 3D Printing Projects" centered />
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="lg" />
            <span className="ml-4 text-white">Loading projects...</span>
          </div>
        </div>
      </section>
    )
  }

  if (projects.length === 0) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Our 3D Printing Projects" centered />
          <div className="flex justify-center items-center h-64">
            <div className="text-white">No featured 3D projects with STL files available.</div>
          </div>
        </div>
      </section>
    )
  }

  const currentProject = projects[currentIndex]

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <>
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Our 3D Printing Projects" centered />

          <div className="max-w-6xl mx-auto mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* 3D Model Viewer */}
              <div className="relative">
                <div className="bg-black rounded-sm cyber-border p-4 aspect-square">
                  <STLModelViewer
                    stlFile={currentProject.stlFile}
                    title={currentProject.title}
                    modelColor="#34947A"
                    backgroundColor="#1a1a1a"
                  />
                </div>

                {/* Fullscreen button */}
                <Button
                  onClick={() => setIsFullscreen(true)}
                  className="absolute top-6 right-6 bg-black/80 hover:bg-black border border-emerald-500/30"
                  size="sm"
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="metallic-text text-2xl font-bold mb-2">{currentProject.title}</h3>
                  <p className="text-white/80 mb-4">{currentProject.description}</p>

                  {currentProject.client && (
                    <p className="text-emerald-500 mb-2">
                      <span className="font-semibold">Client:</span> {currentProject.client}
                    </p>
                  )}

                  {currentProject.application && (
                    <p className="text-white/80 mb-2">
                      <span className="font-semibold">Application:</span> {currentProject.application}
                    </p>
                  )}

                  {currentProject.printTime && (
                    <p className="text-white/80 mb-2">
                      <span className="font-semibold">Print Time:</span> {currentProject.printTime} hours
                    </p>
                  )}

                  {currentProject.status && (
                    <p className="text-white/80 mb-4">
                      <span className="font-semibold">Status:</span> {currentProject.status}
                    </p>
                  )}

                  {currentProject.materials && currentProject.materials.length > 0 && (
                    <div className="mb-4">
                      <span className="font-semibold text-white">Materials:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {currentProject.materials.map((material, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-emerald-500/20 text-emerald-500 rounded-sm text-sm border border-emerald-500/30"
                          >
                            {material}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation */}
                {projects.length > 1 && (
                  <div className="flex items-center justify-between pt-6">
                    <Button
                      onClick={prevProject}
                      variant="outline"
                      className="border-emerald-500/30 text-white hover:bg-emerald-500/10"
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>

                    <span className="text-white/60">
                      {currentIndex + 1} of {projects.length}
                    </span>

                    <Button
                      onClick={nextProject}
                      variant="outline"
                      className="border-emerald-500/30 text-white hover:bg-emerald-500/10"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="relative w-full h-full max-w-4xl max-h-4xl">
            <Button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 z-10 bg-black/80 hover:bg-black border border-emerald-500/30"
              size="sm"
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="w-full h-full bg-black rounded-sm cyber-border">
              <STLModelViewer
                stlFile={currentProject.stlFile}
                title={currentProject.title}
                modelColor="#34947A"
                backgroundColor="#1a1a1a"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
