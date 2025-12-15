"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Shield, Eye, Loader2 } from 'lucide-react'
import { CyberButton } from "@/components/ui/cyber-button"

export default function SpectrePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [accessCode, setAccessCode] = useState("")
  const [error, setError] = useState("")
  const [agentLoaded, setAgentLoaded] = useState(false)
  const [isValidating, setIsValidating] = useState(false)

  const handleAccess = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsValidating(true)
    setError("")
    try {
      const response = await fetch("/api/spectre/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: accessCode }),
      })
      const data = await response.json()
      if (data.authorized) {
        setIsAuthenticated(true)
        setError("")
      } else {
        setError(data.message || "Invalid access code")
        setAccessCode("")
      }
    } catch (error) {
      setError("Failed to validate access code. Please try again.")
      setAccessCode("")
    } finally {
      setIsValidating(false)
    }
  }

  useEffect(() => {
    // Load the ElevenLabs script only after authentication
    if (isAuthenticated) {
      const script = document.createElement("script")
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed"
      script.async = true
      script.type = "text/javascript"

      script.onerror = () => {
        console.error('Failed to load ElevenLabs script')
        setAgentLoaded(false)
      }

      script.onload = () => {
        setAgentLoaded(true)
        // Apply styling
        setTimeout(() => {
          const style = document.createElement("style")
          style.textContent = `
            /* Style the widget when it does render */
            elevenlabs-convai iframe,
            elevenlabs-convai > div,
            elevenlabs-convai > div > div {
              border-radius: 20px !important;
              border: 2px solid rgba(16, 185, 129, 0.4) !important;
              background: rgba(0, 0, 0, 0.95) !important;
              backdrop-filter: blur(20px) !important;
              box-shadow: 0 0 40px rgba(16, 185, 129, 0.3) !important;
            }

            /* Style buttons */
            elevenlabs-convai button {
              background: linear-gradient(135deg, #10b981, #059669) !important;
              border: 1px solid rgba(16, 185, 129, 0.6) !important;
              border-radius: 12px !important;
              color: white !important;
              transition: all 0.3s ease !important;
              padding: 12px 24px !important;
              font-weight: 600 !important;
            }

            elevenlabs-convai button:hover {
              background: linear-gradient(135deg, #059669, #047857) !important;
              box-shadow: 0 0 25px rgba(16, 185, 129, 0.5) !important;
              transform: translateY(-2px) !important;
            }
          `
          document.head.appendChild(style)
        }, 1000)
      }

      document.head.appendChild(script)

      return () => {
        // Cleanup script on unmount
        if (document.head.contains(script)) {
          document.head.removeChild(script)
        }
      }
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="cyber-border bg-zinc-900/80 backdrop-blur-sm rounded-lg p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 rounded-full mb-6 cyber-border">
                <Shield className="w-10 h-10 text-emerald-400" />
              </div>
              <h1 className="metallic-text text-3xl font-bold mb-3">SPECTRE</h1>
              <p className="metallic-silver-text text-lg">AI Agent Interface</p>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto mt-4"></div>
            </div>

            <form onSubmit={handleAccess} className="space-y-6">
              <div>
                <label htmlFor="accessCode" className="block text-sm font-medium metallic-silver-text mb-3">
                  Authorization Required
                </label>
                <input
                  type="password"
                  id="accessCode"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-emerald-500/30 rounded-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                  placeholder="Enter access code"
                  required
                />
                {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
              </div>

              <CyberButton type="submit" className="w-full justify-center">
                <Eye className="w-4 h-4 mr-2" />
                Initialize Spectre
              </CyberButton>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Minimalistic Header */}
      <div className="bg-black/90 backdrop-blur-sm border-b border-emerald-500/20 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="metallic-text text-xl font-bold">SPECTRE</h1>
                <p className="metallic-silver-text text-xs">Neural Interface</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-emerald-400 text-sm font-medium">ONLINE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Centered and Minimalistic */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-4xl">
          {/* AI Agent Interface - Centered */}
          <div className="relative">
            <div className="bg-zinc-900/20 backdrop-blur-sm rounded-2xl border border-emerald-500/20 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-emerald-500/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="metallic-text text-lg sm:text-xl font-semibold">Neural Interface</h2>
                    <p className="metallic-silver-text text-sm">Direct communication channel</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {agentLoaded ? (
                      <>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-emerald-400 text-sm font-medium hidden sm:inline">Agent Ready</span>
                      </>
                    ) : (
                      <>
                        <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />
                        <span className="text-yellow-400 text-sm font-medium hidden sm:inline">Loading...</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-8">
                <div className="relative">
                  {/* Loading State */}
                  {!agentLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/50 rounded-xl">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/10 rounded-full mb-4 cyber-border">
                          <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                        </div>
                        <h3 className="metallic-text text-lg font-semibold mb-2">Initializing AI Agent</h3>
                        <p className="metallic-silver-text text-sm">Establishing neural connection...</p>
                      </div>
                    </div>
                  )}

                  {/* AI Agent Widget Container */}
                  <div
                    id="spectre-agent-container"
                    className="min-h-[400px] sm:min-h-[500px] flex items-center justify-center bg-gradient-to-br from-black/40 to-zinc-900/40 rounded-xl border border-emerald-500/20 backdrop-blur-sm relative overflow-hidden"
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent"></div>
                    </div>

                    {/* AI Agent Widget */}
                    <div className="w-full h-full flex items-center justify-center relative z-20">
                      <elevenlabs-convai agent-id="agent_01jz9r2kajer9t5a9jz36p237s"></elevenlabs-convai>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
