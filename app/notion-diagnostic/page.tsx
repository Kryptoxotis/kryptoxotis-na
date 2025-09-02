import { NotionDiagnosticViewer } from "@/components/notion-diagnostic-viewer"

export default function NotionDiagnosticPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="metallic-text text-3xl font-bold mb-8">Notion Diagnostic</h1>
      <NotionDiagnosticViewer />
    </div>
  )
}
