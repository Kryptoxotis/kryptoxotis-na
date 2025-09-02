"use client"

import { useState, useEffect } from "react"
import { CyberButton } from "./ui/cyber-button"
import { LoadingSpinner } from "./ui/loading-spinner"

export function NotionStatusChecker() {
  const [showStatus, setShowStatus] = useState(false)
  const [status, setStatus] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const checkStatus = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/notion-status")
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      console.error("Error checking Notion status:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (showStatus && !status) {
      checkStatus()
    }
  }, [showStatus, status])

  return (
    <div className="p-4 mb-8 bg-zinc-900 rounded-sm cyber-border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="metallic-text text-xl font-bold">Notion Status</h3>
        <CyberButton onClick={() => setShowStatus(!showStatus)} size="sm">
          {showStatus ? "Hide" : "Show"}
        </CyberButton>
      </div>

      {showStatus && (
        <div className="text-white">
          {loading ? (
            <div className="flex items-center justify-center p-4">
              <LoadingSpinner size="sm" />
              <span className="ml-2">Checking Notion status...</span>
            </div>
          ) : status ? (
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium mb-2">Environment</h4>
                <div className="bg-zinc-800 p-3 rounded-sm">
                  <p className="text-sm">
                    Timestamp: <span className="text-emerald-400">{status.timestamp}</span>
                  </p>
                  <p className="text-sm">
                    Node Environment: <span className="text-emerald-400">{status.environment}</span>
                  </p>
                  <p className="text-sm">
                    Vercel Environment: <span className="text-emerald-400">{status.vercelEnv}</span>
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-2">Configuration</h4>
                <div className="bg-zinc-800 p-3 rounded-sm">
                  <p className="text-sm">
                    API Key:{" "}
                    <span className={status.apiKeyExists ? "text-emerald-400" : "text-red-400"}>
                      {status.apiKeyExists ? "Exists" : "Missing"}
                    </span>
                  </p>
                  <p className="text-sm">
                    All Required Env Vars:{" "}
                    <span className={status.hasRequiredEnvVars ? "text-emerald-400" : "text-red-400"}>
                      {status.hasRequiredEnvVars ? "Yes" : "No"}
                    </span>
                  </p>

                  <div className="mt-2">
                    <p className="text-sm font-medium mb-1">Database IDs:</p>
                    <ul className="space-y-1 pl-4">
                      {Object.entries(status.databaseIds).map(([key, exists]: [string, any]) => (
                        <li key={key} className="text-sm flex items-center">
                          <span
                            className={`w-3 h-3 mr-2 rounded-full ${exists ? "bg-emerald-500" : "bg-red-500"}`}
                          ></span>
                          <span className="capitalize">{key}:</span>
                          <span className={`ml-2 ${exists ? "text-emerald-400" : "text-red-400"}`}>
                            {exists ? "Exists" : "Missing"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-2">API Connection</h4>
                <div
                  className={`p-3 rounded-sm ${status.apiConnection.success ? "bg-emerald-500/20 border border-emerald-500" : "bg-red-500/20 border border-red-500"}`}
                >
                  <p className={status.apiConnection.success ? "text-emerald-300" : "text-red-300"}>
                    {status.apiConnection.message}
                  </p>
                  {status.apiConnection.error && (
                    <p className="text-zinc-400 text-sm mt-2">Error: {status.apiConnection.error}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <CyberButton onClick={checkStatus} size="sm">
                  Check Again
                </CyberButton>
              </div>
            </div>
          ) : (
            <p className="text-zinc-400">Failed to load status information</p>
          )}
        </div>
      )}
    </div>
  )
}
