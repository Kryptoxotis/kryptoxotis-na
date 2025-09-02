import { cn } from "@/lib/utils"

interface SectionTitleProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionTitle({ title, subtitle, centered = false, className }: SectionTitleProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      <h2 className="metallic-text text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      {subtitle && <p className="text-white max-w-3xl">{subtitle}</p>}
    </div>
  )
}
