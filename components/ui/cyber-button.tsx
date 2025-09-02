import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
}

const CyberButton = forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "relative inline-flex items-center justify-center rounded-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none",
          "cyber-border overflow-hidden",
          {
            "bg-black border-emerald-500": variant === "default",
            "bg-transparent border-emerald-500": variant === "outline",
            "bg-transparent": variant === "ghost",
            "h-10 px-4 py-2": size === "default",
            "h-8 px-3 text-sm": size === "sm",
            "h-12 px-6 text-lg": size === "lg",
          },
          className,
        )}
        ref={ref}
        {...props}
      >
        <span className="metallic-silver-text transition-all duration-300 hover:metallic-red-text">
          {props.children}
        </span>
      </button>
    )
  },
)
CyberButton.displayName = "CyberButton"

export { CyberButton }
