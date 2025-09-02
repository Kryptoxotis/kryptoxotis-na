"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQItemProps {
  question: string
  answer: string
  className?: string
}

export function FAQItem({ question, answer, className }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn("border-b border-zinc-800 py-4", className)}>
      <button className="flex w-full items-center justify-between text-left" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-lg font-medium text-white">{question}</h3>
        <ChevronDown className={cn("h-5 w-5 text-teal-500 transition-transform", isOpen && "rotate-180")} />
      </button>

      <div className={cn("mt-2 overflow-hidden transition-all duration-300", isOpen ? "max-h-96" : "max-h-0")}>
        <p className="text-white">{answer}</p>
      </div>
    </div>
  )
}
