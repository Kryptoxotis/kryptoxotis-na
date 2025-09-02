import { ClientNotionTest } from "@/components/client-notion-test"

export default function ClientTestPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="metallic-text text-3xl font-bold mb-8">Client-Side API Tests</h1>
      <p className="text-white mb-8">
        This page tests the client-side API calls to ensure they're working correctly. Click the "Run Tests" button to
        test the API endpoints.
      </p>
      <ClientNotionTest />
    </div>
  )
}
