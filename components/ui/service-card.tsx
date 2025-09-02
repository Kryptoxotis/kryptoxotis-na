import Link from "next/link"
import { CyberButton } from "./cyber-button"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ServiceCardProps {
  title: string
  icon: ReactNode
  description?: string
  href: string
  className?: string
  buttonText?: string
}

export function ServiceCard({
  title,
  icon,
  description,
  href,
  className,
  buttonText = "Learn More",
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-sm bg-zinc-900 p-6 transition-all duration-300 hover:bg-zinc-800 cyber-border",
        className,
      )}
    >
      <div className="mb-4 h-12 w-12 rounded-sm bg-black p-2 cyber-border flex items-center justify-center">{icon}</div>

      <h3 className="metallic-text mb-3 text-xl font-bold">{title}</h3>

      {description && <p className="text-white mb-4">{description}</p>}

      <Link href={href}>
        <CyberButton variant="outline" size="sm">
          {buttonText}
        </CyberButton>
      </Link>

      <div className="absolute -bottom-1 -right-1 h-12 w-12 bg-gradient-to-br from-teal-500/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    </div>
  )
}
