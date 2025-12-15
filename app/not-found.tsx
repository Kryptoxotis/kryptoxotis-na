import Link from "next/link"
import { CyberButton } from "@/components/ui/cyber-button"

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="text-8xl font-bold metallic-text mb-4">404</div>
          <h2 className="metallic-text text-2xl font-bold mb-2">Page Not Found</h2>
          <p className="text-zinc-400 mb-4">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <CyberButton>Go Home</CyberButton>
          </Link>
          <Link href="/contact">
            <CyberButton variant="outline">Contact Us</CyberButton>
          </Link>
        </div>
      </div>
    </div>
  )
}
