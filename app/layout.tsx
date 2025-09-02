import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"

// Import a serif font for titles
const playfair = fetch(
  new URL("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap"),
).then((res) => res.text())

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Kryptoxotis - Futuristic Business Solutions",
  description: "Business Database Management, Web Design, and 3D Printing Services",
    generator: 'v0.app'
}

// Force dynamic rendering and disable caching
export const dynamic = "force-dynamic"
export const revalidate = 0

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add meta tags to prevent caching */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />

        {/* Add Google site verification meta tag */}
        <meta name="google-site-verification" content="googlefd6bd9e9a032b480" />

        {/* Add Playfair Display font */}
        <style dangerouslySetInnerHTML={{ __html: playfair }} />

        {/* Add Sans Forgetica font */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @font-face {
              font-family: 'Sans Forgetica';
              src: url('https://cdn.jsdelivr.net/gh/BafS/Sans-Forgetica@v1.0.0/fonts/SansForgetica-Regular.woff2') format('woff2'),
                   url('https://cdn.jsdelivr.net/gh/BafS/Sans-Forgetica@v1.0.0/fonts/SansForgetica-Regular.woff') format('woff');
              font-weight: normal;
              font-style: normal;
              font-display: swap;
            }
          `,
          }}
        />
      </head>
      <body className="bg-black min-h-screen flex flex-col font-sans-forgetica">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <Suspense fallback={<div className="h-20 bg-black border-b border-zinc-800"></div>}>
            <Header />
          </Suspense>
          <main className="flex-grow">{children}</main>
          <Suspense fallback={<div className="h-40 bg-black border-t border-zinc-800"></div>}>
            <Footer />
          </Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
