"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="relative z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/output-onlinepngtools%20%286%29-2ANOOH7A6DqKwij49O5WbsIcU1shVO.png"
                  alt="Kryptoxotis Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="metallic-text text-2xl font-extrabold tracking-tight ml-3 hidden sm:block">
                KRYPTOXOTIS
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group relative metallic-silver-text transition-all duration-300 hover:metallic-red-text"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-emerald-500 transition-all duration-300 group-hover:w-full glow-emerald"></span>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="cyber-border inline-flex items-center justify-center rounded-md p-2 metallic-silver-text hover:metallic-red-text transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "absolute inset-x-0 top-20 z-50 origin-top transform transition md:hidden",
          mobileMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
        )}
      >
        <div className="bg-zinc-900 border-b border-zinc-800 py-2">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 metallic-silver-text transition-all duration-300 hover:metallic-red-text"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
