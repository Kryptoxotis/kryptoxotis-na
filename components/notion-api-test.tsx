"use client"

import { useState, useEffect } from "react"
import { CyberButton } from "./ui/cyber-button"

export function NotionApiTest() {
  const [status, setStatus] = useState<{
    loading: boolean
    success?: boolean
    message?: string
    error?: string
    user?: {
      id: string
      name: string
      type: string
    }
  }>({
    loading: true,
  })

  const testConnection = async () => {
    setStatus({ loading: true })

    try {
      const response = await fetch("/api/notion-test")
      const data = await response.json()

      setStatus({
        loading: false,
        success: data.success,
        message: data.message,
        error: data.error,
        user: data.user,
      })
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        message: "Error testing Notion API connection",
        error: error instanceof Error ? error.message : "Unknown error",
      })
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <div className="p-4 mb-8 bg-zinc-900 rounded-sm cyber-border">
      <h3 className="metallic-text text-xl font-bold mb-4">Notion API Status</h3>

      {status.loading ? (
        <p className="text-white">Testing Notion API connection...</p>
      ) : status.success ? (
        <div>
          <p className="text-emerald-500 mb-2">✓ Connected to Notion API</p>
          <p className="text-white text-sm mb-2">{status.message}</p>
          {status.user && (
            <div className="text-zinc-400 text-xs">
              <p>User ID: {status.user.id}</p>
              <p>User Name: {status.user.name}</p>
              <p>User Type: {status.user.type}</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p className="text-red-500 mb-2">✗ Failed to connect to Notion API</p>
          <p className="text-white text-sm mb-2">{status.message}</p>
          {status.error && <p className="text-zinc-400 text-xs mb-4">Error: {status.error}</p>}
          <CyberButton onClick={testConnection} size="sm">
            Retry Connection
          </CyberButton>
        </div>
      )}
    </div>
  )
}
