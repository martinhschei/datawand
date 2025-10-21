import { TransformationStep } from "../models/TransformationStep";

import {
  Trash,
  ChevronUp,
  ChevronDown,
} from "lucide-react"

type TransformationStepProps = {
    index: number
    step: TransformationStep
    isSelected: boolean
    isFirst: boolean
    isLast: boolean
    onSelect: () => void
    onDelete: () => void
    onMoveUp: () => void
    onMoveDown: () => void
}

export function TransformationNode({index, step, isSelected, isFirst, isLast, onSelect, onDelete, onMoveUp, onMoveDown }: TransformationStepProps) {
  const getNodeColor = () => {
    switch (step.type) {
      case "source":
        return "border-accent"
      case "destination":
        return "border-destructive"
      default:
        return "border-primary"
    }
  }

  return (
    <div className={`rounded-lg border-2 bg-card shadow-sm transition-all cursor-pointer ${isSelected ? `${getNodeColor()} shadow-md` : "border-border" }`} onClick={onSelect}>
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-3">
        <div className="flex items-center gap-3">
          <h1 className="p-1 text-md text-muted-foreground capitalize">{`#${index+1} - ${step.name}`}</h1>
        </div>
        <div className="flex items-center gap-1">
          <button className="button-no-bg rounded-sm outline-none h-7 w-7 p-0" onClick={(e) => {
              e.stopPropagation()
              onMoveUp()
            }}
            disabled={isFirst}>
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
          <button className="button-no-bg outline-none h-7 w-7 p-0" onClick={(e) => {
              e.stopPropagation()
              onMoveDown()
            }}
            disabled={isLast}
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <button className="button-no-bg outline-none h-7 w-7 p-0" onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
          >
            <Trash className="h-2.5 w-2.5" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-2">
          {step.params && Object.keys(step.params).length > 0 && (
            <div className="rounded-md bg-muted/50 p-2 font-mono text-xs text-muted-foreground">
              {Object.entries(step.params)
                .slice(0, 2)
                .map(([key, value]) => (
                  <div key={key}>
                    {key}: {String(value)}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}