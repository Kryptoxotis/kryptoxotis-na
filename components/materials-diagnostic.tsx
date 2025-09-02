"use client"

import { useState, useEffect } from "react"
import { CyberButton } from "./ui/cyber-button"
import { LoadingSpinner } from "./ui/loading-spinner"

export function MaterialsDiagnostic() {
  const [diagnosticData, setDiagnosticData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [showDiagnostic, setShowDiagnostic] = useState(true)

  const runDiagnostic = async () => {
    setLoading(true)
    try {
      // Test direct API call
      const timestamp = new Date().getTime()
      const response = await fetch(`/api/materials/diagnostic?t=${timestamp}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        cache: "no-store",
      })

      const data = await response.json()
      setDiagnosticData(data)
    } catch (error) {
      console.error("Error running materials diagnostic:", error)
      setDiagnosticData({
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (showDiagnostic) {
      runDiagnostic()
    }
  }, [showDiagnostic])

  return (
    <div className="p-4 mb-8 bg-zinc-900 rounded-sm cyber-border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="metallic-text text-xl font-bold">3D Printing Materials Diagnostic</h3>
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
          ) : diagnosticData ? (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium mb-2">Environment Variables</h4>
                <div className="bg-zinc-800 p-3 rounded-sm">
                  <p className="text-sm">
                    NOTION_API_KEY:{" "}
                    <span className={diagnosticData.envVars?.apiKeyExists ? "text-emerald-400" : "text-red-400"}>
                      {diagnosticData.envVars?.apiKeyExists ? "Exists" : "Missing"}
                    </span>
                  </p>
                  <p className="text-sm">
                    NOTION_3D_PRINTING_MATERIALS_DATABASE_ID:{" "}
                    <span className={diagnosticData.envVars?.databaseIdExists ? "text-emerald-400" : "text-red-400"}>
                      {diagnosticData.envVars?.databaseIdExists ? "Exists" : "Missing"}
                    </span>
                    {diagnosticData.envVars?.databaseIdExists && (
                      <span className="text-zinc-400 ml-2">(Value: {diagnosticData.envVars?.databaseIdPrefix}...)</span>
                    )}
                  </p>
                </div>
              </div>

              {diagnosticData.apiTest && (
                <div>
                  <h4 className="text-lg font-medium mb-2">API Test</h4>
                  <div
                    className={`p-3 rounded-sm ${
                      diagnosticData.apiTest.success
                        ? "bg-emerald-500/20 border border-emerald-500"
                        : "bg-red-500/20 border border-red-500"
                    }`}
                  >
                    {diagnosticData.apiTest.success ? (
                      <div>
                        <p className="text-emerald-300 text-sm">✓ Successfully queried materials database</p>
                        <p className="text-zinc-300 text-xs mt-1">Found {diagnosticData.apiTest.count} materials</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-red-300 text-sm">✗ Failed to query materials database</p>
                        {diagnosticData.apiTest.error && (
                          <p className="text-zinc-400 text-xs mt-1">Error: {diagnosticData.apiTest.error}</p>
                        )}
                        {diagnosticData.apiTest.status && (
                          <p className="text-zinc-400 text-xs">Status: {diagnosticData.apiTest.status}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {diagnosticData.mockData && (
                <div>
                  <h4 className="text-lg font-medium mb-2">Mock Data Sample</h4>
                  <div className="bg-zinc-800 p-3 rounded-sm max-h-40 overflow-auto">
                    <pre className="text-xs text-zinc-400">{JSON.stringify(diagnosticData.mockData[0], null, 2)}</pre>
                  </div>
                </div>
              )}

              {diagnosticData.error && (
                <div>
                  <h4 className="text-lg font-medium mb-2">Error</h4>
                  <div className="bg-red-500/20 border border-red-500 p-3 rounded-sm">
                    <p className="text-red-300 text-sm">{diagnosticData.error}</p>
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
