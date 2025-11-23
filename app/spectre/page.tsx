"use client"

import React, { useEffect, useState } from "react"
import { Shield, Eye, Loader2, Wifi } from "lucide-react"
import { CyberButton } from "@/components/ui/cyber-button"
import FloatingOrb from "@/components/visual/FloatingOrb"

export default function SpectrePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [accessCode, setAccessCode] = useState("")
  const [error, setError] = useState("")
  const [isCheckingIP, setIsCheckingIP] = useState(true)
  const [agentLoaded, setAgentLoaded] = useState(false)
  const [clientIP, setClientIP] = useState<string>("")

  const SPECTRE_ACCESS_CODE = "KRYPTO2025"

  useEffect(() => {
    const getClientIP = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json")
        const data = await response.json()
        setClientIP(data.ip)
      } catch {
        try {
          const authResponse = await fetch("/api/spectre/auth")
          const authData = await authResponse.json()
          setClientIP(authData.ip || "Unknown")
        } catch {
          setClientIP("Unable to determine")
        }
      }
    }

    getClientIP()
  }, [])

  useEffect(() => {
    const checkIPAccess = async () => {
      try {
        const response = await fetch("/api/spectre/auth")
        const data = await response.json()

        if (data.authorized) {
          setIsAuthenticated(true)
        }
      } catch {
        console.log("IP check failed, requiring manual authentication")
      } finally {
        setIsCheckingIP(false)
      }
    }

    checkIPAccess()
  }, [])

  const handleAccess = (e: React.FormEvent) => {
    e.preventDefault()
    if (accessCode === SPECTRE_ACCESS_CODE) {
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Invalid access code")
      setAccessCode("")
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      const script = document.createElement("script")
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed"
      script.async = true
      script.type = "text/javascript"

      script.onload = () => {
        setAgentLoaded(true)

        // Style the widget
        setTimeout(() => {
          const style = document.createElement("style")
          style.textContent = `
            elevenlabs-convai iframe,
            elevenlabs-convai > div,
            elevenlabs-convai > div > div {
              border-radius: 20px !important;
              border: 2px solid rgba(16, 185, 129, 0.4) !important;
              background: rgba(0, 0, 0, 0.95) !important;
              backdrop-filter: blur(20px) !important;
              box-shadow: 0 0 40px rgba(16, 185, 129, 0.3) !important;
            }

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

        // Auto-listen + autoplay
        setTimeout(() => {
          const convai = document.querySelector("elevenlabs-convai")
          if (convai) {
            convai.setAttribute("autoplay", "true")
            convai.setAttribute("auto-listen", "true")
            // Fallback force click
            convai?.shadowRoot?.querySelector("button[data-action='listen']")?.click()
          }
        }, 2000)
      }

      document.head.appendChild(script)

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script)
        }
      }
    }
  }, [isAuthenticated])

  if (isCheckingIP) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/10 rounded-full mb-4 cyber-border">
            <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
          </div>
          <h2 className="metallic-text text-xl font-semibold mb-2">Initializing Spectre</h2>
          <p className="metallic-silver-text">Verifying access credentials...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="cyber-border bg-zinc-900/80 backdrop-blur-sm rounded-lg p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 rounded-full mb-6 cyber-border">
                <<Shield className="w-10 h-10 text-emerald-400" />
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
      {/* Header */}
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
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-xs">
                <Wifi className="w-3 h-3 text-emerald-400" />
                <span className="text-zinc-400">IP:</span>
                <span className="text-emerald-400 font-mono">{clientIP}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-400 text-sm font-medium">ONLINE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-4xl relative">
          {/* Agent UI */}
          <div className="relative bg-zinc-900/20 backdrop-blur-sm rounded-2xl border border-emerald-500/20 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-emerald-500/10 flex justify-between items-center">
              <div>
                <h2 className="metallic-text text-lg font-semibold">Neural Interface</h2>
                <p className="metallic-silver-text text-sm">Direct communication channel</p>
              </div>
              <div className="flex items-center space-x-2">
                {agentLoaded ? (
                  <>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-emerald-400 text-sm font-medium">Agent Ready</span>
                  </>
                ) : (
                  <>
                    <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />
                    <span className="text-yellow-400 text-sm font-medium">Loading...</span>
                  </>
                )}
              </div>
            </div>

            <div className="relative p-4 sm:p-8 min-h-[400px] sm:min-h-[500px] flex items-center justify-center bg-gradient-to-br from-black/40 to-zinc-900/40 rounded-xl border border-emerald-500/20 backdrop-blur-sm overflow-hidden">
              {/* Orb */}
              <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                <FloatingOrb />
              </div>

              {/* Widget */}
              <div className="z-20 w-full h-full flex items-center justify-center">
                <elevenlabs-convai agent-id="agent_01jytjymf2fwy9g4bmzv9hqex5"></elevenlabs-convai>
              </div>
            </div>
          </div>

          {/* IP display mobile */}
          <div className="sm:hidden mt-4 text-center">
            <div className="inline-flex items-center space-x-2 text-xs bg-zinc-900/50 px-3 py-2 rounded-lg border border-emerald-500/20">
              <Wifi className="w-3 h-3 text-emerald-400" />
              <span className="text-zinc-400">IP:</span>
              <span className="text-emerald-400 font-mono">{clientIP}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
