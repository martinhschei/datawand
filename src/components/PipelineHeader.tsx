import { Save, Download } from "lucide-react"

export function PipelineHeader() {
  return (
    <header className="flex items-center justify-between border-b border-border bg-card p-2">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold text-card-foreground">Datawand Pipeline Builder</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center rounded p-1">
          <button className="flex flex-col items-center rounded transition-colors focus:outline-none">
          <Save className="h-5 w-5 mb-1" />
          <span className="text-xs">Save</span>
          </button>
        </div>
        <div className="flex flex-col items-center rounded p-1">
          <button className="flex flex-col items-center rounded transition-colors focus:outline-none">
        <Download className="h-5 w-5 mb-1" />
        <span className="text-xs">Export</span>
          </button>
        </div>
      </div>
    </header>
  )
}
