"use client"

import { useEffect } from "react"
import { CyberButton } from "@/components/ui/cyber-button"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error caught by error boundary:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="cyber-border bg-zinc-900 p-6 rounded-sm max-w-md">
        <h2 className="metallic-text text-xl font-bold mb-4">Something went wrong</h2>
        <p className="text-white mb-4">
          We apologize for the inconvenience. An error occurred while loading this content.
        </p>
        <div className="mb-6 p-4 bg-zinc-800 rounded-sm text-left">
          <p className="text-zinc-400 text-sm mb-2">Error details:</p>
          <p className="text-zinc-300 text-sm font-mono overflow-auto">{error.message}</p>
          {error.digest && <p className="text-zinc-400 text-xs mt-2">Error ID: {error.digest}</p>}
        </div>
        <CyberButton onClick={reset}>Try again</CyberButton>
      </div>
    </div>
  )
}
