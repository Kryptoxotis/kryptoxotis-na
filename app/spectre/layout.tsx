import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Spectre - Neural Interface",
  description: "AI Agent Neural Interface - Restricted Access",
  robots: "noindex, nofollow",
}

export default function SpectreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
