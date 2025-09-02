"use client"

import { useState, useEffect } from "react"
import { CyberButton } from "./ui/cyber-button"
import { LoadingSpinner } from "./ui/loading-spinner"

export function NotionDiagnosticViewer() {
  const [showDiagnostic, setShowDiagnostic] = useState(false)
  const [diagnostic, setDiagnostic] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const runDiagnostic = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/notion-diagnostic")
      const data = await response.json()
      setDiagnostic(data)
    } catch (error) {
      console.error("Error running diagnostic:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (showDiagnostic && !diagnostic) {
      runDiagnostic()
    }
  }, [showDiagnostic, diagnostic])

  return (
    <div className="p-4 mb-8 bg-zinc-900 rounded-sm cyber-border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="metallic-text text-xl font-bold">Notion Diagnostic</h3>
        <CyberButton onClick={() => setShowDiagnostic(!showDiagnostic)} size="sm">
          {showDiagnostic ? "Hide" : "Show"}
        </CyberButton>
      </div>

      {showDiagnostic && (
        <div className="text-white">
          {loading ? (
            <div className="flex items-center justify-center p-4">
              <LoadingSpinner size="sm" />
              <span className="ml-2">Running diagnostic...</span>
            </div>
          ) : diagnostic ? (
            <div className="space-y-6">
              {/* Environment Info */}
              <div>
                <h4 className="text-lg font-medium mb-2">Environment</h4>
                <div className="bg-zinc-800 p-3 rounded-sm">
                  <p className="text-sm">
                    Timestamp: <span className="text-emerald-400">{diagnostic.timestamp}</span>
                  </p>
                  <p className="text-sm">
                    Node Environment: <span className="text-emerald-400">{diagnostic.environment.nodeEnv}</span>
                  </p>
                  <p className="text-sm">
                    Vercel Environment:{" "}
                    <span className="text-emerald-400">
                      {diagnostic.environment.vercelEnv || "Not running on Vercel"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Notion Configuration */}
              <div>
                <h4 className="text-lg font-medium mb-2">Notion Configuration</h4>
                <div className="bg-zinc-800 p-3 rounded-sm">
                  <p className="text-sm">
                    API Key:{" "}
                    <span className={diagnostic.notionConfig.apiKeyExists ? "text-emerald-400" : "text-red-400"}>
                      {diagnostic.notionConfig.apiKeyExists
                        ? `Exists (${diagnostic.notionConfig.apiKeyPrefix})`
                        : "Missing"}
                    </span>
                    {diagnostic.notionConfig.apiKeyExists && (
                      <span className="text-zinc-400 ml-2">
                        (Length: {diagnostic.notionConfig.apiKeyLength} characters)
                      </span>
                    )}
                  </p>

                  <div className="mt-2">
                    <p className="text-sm font-medium mb-1">Database IDs:</p>
                    <ul className="space-y-1 pl-4">
                      {Object.entries(diagnostic.notionConfig.databases).map(([key, value]: [string, any]) => (
                        <li key={key} className="text-sm flex items-center">
                          <span
                            className={`w-3 h-3 mr-2 rounded-full ${value.exists ? "bg-emerald-500" : "bg-red-500"}`}
                          ></span>
                          <span className="capitalize">{key}:</span>
                          <span className={`ml-2 ${value.exists ? "text-emerald-400" : "text-red-400"}`}>
                            {value.exists ? value.id : "Missing"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* API Tests */}
              <div>
                <h4 className="text-lg font-medium mb-2">API Connection Tests</h4>

                {/* User Info Test */}
                <div className="mb-3">
                  <p className="text-sm font-medium mb-1">Authentication Test:</p>
                  <div
                    className={`p-3 rounded-sm ${diagnostic.apiTests.userInfo?.success ? "bg-emerald-500/20 border border-emerald-500" : "bg-red-500/20 border border-red-500"}`}
                  >
                    {diagnostic.apiTests.userInfo?.success ? (
                      <div>
                        <p className="text-emerald-300 text-sm">✓ Successfully authenticated with Notion API</p>
                        <p className="text-zinc-300 text-xs mt-1">
                          User: {diagnostic.apiTests.userInfo.name} (ID:{" "}
                          {diagnostic.apiTests.userInfo.id.substring(0, 8)}...)
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-red-300 text-sm">✗ Failed to authenticate with Notion API</p>
                        {diagnostic.apiTests.userInfo?.error && (
                          <p className="text-zinc-400 text-xs mt-1">Error: {diagnostic.apiTests.userInfo.error}</p>
                        )}
                        {diagnostic.apiTests.userInfo?.status && (
                          <p className="text-zinc-400 text-xs">Status: {diagnostic.apiTests.userInfo.status}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Database Access Tests */}
                <div className="mb-3">
                  <p className="text-sm font-medium mb-1">Database Access Tests:</p>
                  <div className="space-y-2">
                    {Object.entries(diagnostic.apiTests.databaseAccess).map(([key, value]: [string, any]) => (
                      <div
                        key={key}
                        className={`p-3 rounded-sm ${value.success ? "bg-emerald-500/20 border border-emerald-500" : "bg-red-500/20 border border-red-500"}`}
                      >
                        {value.success ? (
                          <div>
                            <p className="text-emerald-300 text-sm">✓ Successfully accessed {key} database</p>
                            <p className="text-zinc-300 text-xs mt-1">Title: {value.title}</p>
                            <p className="text-zinc-400 text-xs">
                              Last edited: {new Date(value.lastEditedTime).toLocaleString()}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-red-300 text-sm">✗ Failed to access {key} database</p>
                            {value.error && <p className="text-zinc-400 text-xs mt-1">Error: {value.error}</p>}
                            {value.status && <p className="text-zinc-400 text-xs">Status: {value.status}</p>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial Query Test */}
                {diagnostic.apiTests.testimonialQuery && (
                  <div>
                    <p className="text-sm font-medium mb-1">Testimonial Query Test:</p>
                    <div
                      className={`p-3 rounded-sm ${diagnostic.apiTests.testimonialQuery.success ? "bg-emerald-500/20 border border-emerald-500" : "bg-red-500/20 border border-red-500"}`}
                    >
                      {diagnostic.apiTests.testimonialQuery.success ? (
                        <div>
                          <p className="text-emerald-300 text-sm">✓ Successfully queried testimonials database</p>
                          <p className="text-zinc-300 text-xs mt-1">
                            Found {diagnostic.apiTests.testimonialQuery.count} testimonials
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-red-300 text-sm">✗ Failed to query testimonials database</p>
                          {diagnostic.apiTests.testimonialQuery.error && (
                            <p className="text-zinc-400 text-xs mt-1">
                              Error: {diagnostic.apiTests.testimonialQuery.error}
                            </p>
                          )}
                          {diagnostic.apiTests.testimonialQuery.status && (
                            <p className="text-zinc-400 text-xs">
                              Status: {diagnostic.apiTests.testimonialQuery.status}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Request Headers */}
              <div>
                <h4 className="text-lg font-medium mb-2">Request Headers</h4>
                <div className="bg-zinc-800 p-3 rounded-sm">
                  <pre className="text-xs text-zinc-300 overflow-auto max-h-40">
                    {JSON.stringify(diagnostic.requestInfo.headers, null, 2)}
                  </pre>
                </div>
              </div>

              {/* Summary and Recommendations */}
              {diagnostic.errors.length > 0 && (
                <div>
                  <h4 className="text-lg font-medium mb-2">Issues Found</h4>
                  <div className="bg-red-500/10 border border-red-500 p-3 rounded-sm">
                    <ul className="list-disc pl-5 space-y-1">
                      {diagnostic.errors.map((error: string, index: number) => (
                        <li key={index} className="text-red-300 text-sm">
                          {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="flex justify-center mt-4">
                <CyberButton onClick={runDiagnostic} size="sm">
                  Run Diagnostic Again
                </CyberButton>
              </div>
            </div>
          ) : (
            <p className="text-zinc-400">Failed to load diagnostic information</p>
          )}
        </div>
      )}
    </div>
  )
}
