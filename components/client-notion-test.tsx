"use client"

import { useState, useEffect } from "react"
import { CyberButton } from "./ui/cyber-button"
import { LoadingSpinner } from "./ui/loading-spinner"

export function ClientNotionTest() {
  const [testResults, setTestResults] = useState<{
    testimonials: { loading: boolean; success?: boolean; data?: any; error?: string }
    faqs: { loading: boolean; success?: boolean; data?: any; error?: string }
    projects: { loading: boolean; success?: boolean; data?: any; error?: string }
  }>({
    testimonials: { loading: true },
    faqs: { loading: true },
    projects: { loading: true },
  })

  const runTests = async () => {
    // Reset all test results
    setTestResults({
      testimonials: { loading: true },
      faqs: { loading: true },
      projects: { loading: true },
    })

    // Test testimonials endpoint
    try {
      const testimonialsResponse = await fetch("/api/testimonials", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      })
      const testimonialsData = await testimonialsResponse.json()
      setTestResults((prev) => ({
        ...prev,
        testimonials: {
          loading: false,
          success: testimonialsResponse.ok,
          data: testimonialsData,
          error: testimonialsResponse.ok ? undefined : "API returned error status",
        },
      }))
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        testimonials: {
          loading: false,
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        },
      }))
    }

    // Test FAQs endpoint
    try {
      const faqsResponse = await fetch("/api/faqs", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      })
      const faqsData = await faqsResponse.json()
      setTestResults((prev) => ({
        ...prev,
        faqs: {
          loading: false,
          success: faqsResponse.ok,
          data: faqsData,
          error: faqsResponse.ok ? undefined : "API returned error status",
        },
      }))
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        faqs: {
          loading: false,
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        },
      }))
    }

    // Test projects endpoint (web category as an example)
    try {
      const projectsResponse = await fetch("/api/projects/web", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      })
      const projectsData = await projectsResponse.json()
      setTestResults((prev) => ({
        ...prev,
        projects: {
          loading: false,
          success: projectsResponse.ok,
          data: projectsData,
          error: projectsResponse.ok ? undefined : "API returned error status",
        },
      }))
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        projects: {
          loading: false,
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        },
      }))
    }
  }

  // Run tests automatically on component mount
  useEffect(() => {
    runTests()
  }, [])

  return (
    <div className="p-4 mb-8 bg-zinc-900 rounded-sm cyber-border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="metallic-text text-xl font-bold">Client-Side API Tests</h3>
        <CyberButton onClick={runTests} size="sm">
          Run Tests Again
        </CyberButton>
      </div>

      <div className="space-y-4">
        {/* Testimonials Test */}
        <div>
          <h4 className="text-white font-medium mb-2">Testimonials API Test</h4>
          {testResults.testimonials.loading ? (
            <div className="flex items-center">
              <LoadingSpinner size="sm" />
              <span className="ml-2 text-white">Testing...</span>
            </div>
          ) : testResults.testimonials.success ? (
            <div className="bg-emerald-500/20 border border-emerald-500 p-3 rounded-sm">
              <p className="text-emerald-300 text-sm">✓ Successfully fetched testimonials</p>
              <p className="text-zinc-300 text-xs mt-1">
                Found {Array.isArray(testResults.testimonials.data) ? testResults.testimonials.data.length : "unknown"}{" "}
                testimonials
              </p>
              <div className="mt-2 bg-zinc-800 p-2 rounded-sm max-h-40 overflow-auto">
                <pre className="text-xs text-zinc-400">{JSON.stringify(testResults.testimonials.data, null, 2)}</pre>
              </div>
            </div>
          ) : (
            <div className="bg-red-500/20 border border-red-500 p-3 rounded-sm">
              <p className="text-red-300 text-sm">✗ Failed to fetch testimonials</p>
              {testResults.testimonials.error && (
                <p className="text-zinc-400 text-xs mt-1">Error: {testResults.testimonials.error}</p>
              )}
            </div>
          )}
        </div>

        {/* FAQs Test */}
        <div>
          <h4 className="text-white font-medium mb-2">FAQs API Test</h4>
          {testResults.faqs.loading ? (
            <div className="flex items-center">
              <LoadingSpinner size="sm" />
              <span className="ml-2 text-white">Testing...</span>
            </div>
          ) : testResults.faqs.success ? (
            <div className="bg-emerald-500/20 border border-emerald-500 p-3 rounded-sm">
              <p className="text-emerald-300 text-sm">✓ Successfully fetched FAQs</p>
              <p className="text-zinc-300 text-xs mt-1">
                Found {Array.isArray(testResults.faqs.data) ? testResults.faqs.data.length : "unknown"} FAQs
              </p>
              <div className="mt-2 bg-zinc-800 p-2 rounded-sm max-h-40 overflow-auto">
                <pre className="text-xs text-zinc-400">{JSON.stringify(testResults.faqs.data, null, 2)}</pre>
              </div>
            </div>
          ) : (
            <div className="bg-red-500/20 border border-red-500 p-3 rounded-sm">
              <p className="text-red-300 text-sm">✗ Failed to fetch FAQs</p>
              {testResults.faqs.error && <p className="text-zinc-400 text-xs mt-1">Error: {testResults.faqs.error}</p>}
            </div>
          )}
        </div>

        {/* Projects Test */}
        <div>
          <h4 className="text-white font-medium mb-2">Projects API Test (Web Category)</h4>
          {testResults.projects.loading ? (
            <div className="flex items-center">
              <LoadingSpinner size="sm" />
              <span className="ml-2 text-white">Testing...</span>
            </div>
          ) : testResults.projects.success ? (
            <div className="bg-emerald-500/20 border border-emerald-500 p-3 rounded-sm">
              <p className="text-emerald-300 text-sm">✓ Successfully fetched projects</p>
              <p className="text-zinc-300 text-xs mt-1">
                Found {Array.isArray(testResults.projects.data) ? testResults.projects.data.length : "unknown"} projects
              </p>
              <div className="mt-2 bg-zinc-800 p-2 rounded-sm max-h-40 overflow-auto">
                <pre className="text-xs text-zinc-400">{JSON.stringify(testResults.projects.data, null, 2)}</pre>
              </div>
            </div>
          ) : (
            <div className="bg-red-500/20 border border-red-500 p-3 rounded-sm">
              <p className="text-red-300 text-sm">✗ Failed to fetch projects</p>
              {testResults.projects.error && (
                <p className="text-zinc-400 text-xs mt-1">Error: {testResults.projects.error}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
