import type React from "react"
import { useState } from "react"
import { Database, Globe, Upload, Wifi, Clipboard} from "lucide-react"
import FileDrop from "./FileDrop"

type SourceType = "file" | "http" | "websocket" | "database"

const sourceTypes = [
  { id: "file", name: "File", icon: Upload, description: "JSON, CSV, XLS, XML, TXT" },
  { id: "http", name: "HTTP", icon: Globe, description: "REST API endpoint" },
  { id: "websocket", name: "WebSocket", icon: Wifi, description: "Real-time data stream" },
  { id: "database", name: "SQL Database", icon: Database, description: "PostgreSQL, MySQL, etc." },
  { id: "paste", name: "Paste", icon: Clipboard, description: "Paste data from clipboard" },
]

type SourcePickerProps = {
  selectedSource: string | null
  onSelectSource: (sourceId: string, config: any) => void
}

export function SourcePicker({ selectedSource, onSelectSource }: SourcePickerProps) {
  const [sourceType, setSourceType] = useState<SourceType | null>(null)

  const handleConnect = (type: SourceType, config: any) => {
    onSelectSource(type, config)
  }

  return (
    <div className="mb-6 rounded-lg border border-border p-4 h-full">
      {!sourceType ? (
        <section>
          <h3 className="mb-3 text-sm font-medium text-foreground">Select Data Source</h3>
          <div className="grid grid-cols-2 gap-2">
            {sourceTypes.map((source) => {
              const Icon = source.icon
              return (
                <button
                  key={source.id}
                  onClick={() => setSourceType(source.id as SourceType)}
                  className="outline-none button-primary flex items-start gap-3 rounded-md border border-border p-3 text-left transition-all hover:border-primary/50 hover:bg-secondary/50"
                >
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{source.name}</div>
                    <div className="text-xs text-muted-foreground">{source.description}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </section>
      ) : (
        <div className="space-y-4 h-full">

          {sourceType === "file" && (
            <FileDrop />
          )}

          {sourceType === "http" && (
            <div className="space-y-3">
              <div>
                <label htmlFor="http-url" className="text-xs">
                  Endpoint URL
                </label>
                <input id="http-url" placeholder="https://api.example.com/data" className="mt-1" />
              </div>
              <div>
                <label htmlFor="http-method" className="text-xs">
                  Method
                </label>
                <select
                  id="http-method"
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option>GET</option>
                  <option>POST</option>
                </select>
              </div>
              <button
                onClick={() => handleConnect("http", { url: "example", method: "GET" })}
                className="w-full"

              >
                Connect
              </button>
            </div>
          )}

          {sourceType === "websocket" && (
            <div className="space-y-3">
              <div>
                <label htmlFor="ws-url" className="text-xs">
                  WebSocket URL
                </label>
                <input id="ws-url" placeholder="wss://stream.example.com" className="mt-1" />
              </div>
              <button onClick={() => handleConnect("websocket", { url: "example" })} className="w-full">
                Connect
              </button>
            </div>
          )}

          {sourceType === "database" && (
            <div className="space-y-3">
              <div>
                <label htmlFor="db-type" className="text-xs">
                  Database Type
                </label>
                <select
                  id="db-type"
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option>PostgreSQL</option>
                  <option>MySQL</option>
                  <option>SQLite</option>
                </select>
              </div>
              <div>
                <label htmlFor="db-connection" className="text-xs">
                  Connection String
                </label>
                <input
                  id="db-connection"
                  placeholder="postgresql://user:pass@host:5432/db"
                  className="mt-1"
                  type="password"
                />
              </div>
              <button
                onClick={() => handleConnect("database", { type: "postgresql", connection: "example" })}
                className="w-full"
              >
                Connect
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
