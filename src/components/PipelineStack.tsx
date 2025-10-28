import { ArrowDown } from "lucide-react";
import { TransformationNode } from "./TransformationNode";
import { Transformation } from "../models/Transformation";

type PipelineStackProps = {
    selectedNode: string,
    steps: Transformation[]
    onDeleteNode: (id: string) => void
    onSelectNode: (id: string) => void
    onMoveNode: (id: string, direction: "up" | "down") => void
}

export function PipelineStack({ steps, selectedNode, onSelectNode, onDeleteNode, onMoveNode }: PipelineStackProps) {
  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="mx-auto pl-4 pr-4">
        {steps.map((step: any, index: any) => (
          <div key={step.key}>
            <TransformationNode
              step={step}
              index={index}
              isFirst={index === 0}
              isLast={index === steps.length - 1}
              isSelected={selectedNode === step.id}
              onSelect={() => onSelectNode(step.id)}
              onDelete={() => onDeleteNode(step.id)}
              onMoveUp={() => onMoveNode(step.id, "up")}
              onMoveDown={() => onMoveNode(step.id, "down")}
            />
            {index < steps.length - 1 && (
              <div className="flex justify-center py-2">
                <ArrowDown className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
