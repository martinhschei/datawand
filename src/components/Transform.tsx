import useAppState from "../stores/app";
import SourceLibrary from "./SourceLibrary";
import { useEffect, useState } from "react";
import { Pipeline } from "../logic/Pipeline";
import { useLocation } from 'react-router-dom';
import { PipelineStack } from "./PipelineStack";
import { PipelineHeader } from "./PipelineHeader";
import { Transformation } from "../models/Transformation";
import { TransformationLibrary } from "./TransformationsLibrary";
import { PipelineStepConfiguration } from "./PipelineStepConfiguration";

export function Transform() {
  const location = useLocation();
  const pipeline = new Pipeline();
  const [selectedNode, setSelectedNode] = useState("");
  const [steps, setSteps] = useState<Transformation[]>([]);
  const originalContent = useAppState((state: any) => state.originalContent);
  const transformedContent = useAppState((state: any) => state.transformedContent);
  const { source_data, source_type } = location.state || { source_data: [], source_type: null };

  useEffect(() => {
    console.log("Steps changed, running pipeline:", steps);
    runPipeline(steps);
  }, [steps]);

  const onAddStepNode = (node: Transformation) => {
    console.log("Adding step node:", node);
     const newStep = createStepFromTemplate(node, steps.length);
    const newSteps = [...steps, newStep];
    setSteps(newSteps);
  }
  
  const onRemoveStepNode = (id: string) => {
    const index = steps.findIndex(step => step.id === id);
    console.log("Removing step at index:", index);
    if (index !== -1) {
      const newSteps = [...steps];
      newSteps.splice(index, 1)
      setSteps(newSteps);
    }
  }

  const runPipeline = (steps: Transformation[]) => {
    (async () => {
      pipeline.run(originalContent, steps)
        .then((output) => {
          console.log("Pipeline Output:", output);
        })
        .catch((error) => {
          console.error("Pipeline Execution Error:", error);
        });
    })();
  }

  function onStepConfigurationChanged(step: Transformation): void {
    const index = steps.findIndex(s => s.id === step.id);
    if (index === -1) return;
    const newSteps = [...steps];
    newSteps[index] = step;
    setSteps(newSteps);
  }

  function createStepFromTemplate(t: Transformation, index: number): Transformation {
    return {
      id: crypto.randomUUID(),
      icon: t.icon,
      name: t.name,
      type: t.type,
      identifier: t.identifier,
      key: `step_${index + 1}`,
      description: t.description,
      params: JSON.parse(JSON.stringify(t.params ?? {})),
    };
  }

  return (
    <div>
    <PipelineHeader />
      <section className="min-h-screen bg-background p-4">
        <div className="flex w-full">
          <div className="w-1/5 border-r pr-4 space-y-4">
            <SourceLibrary source_data={source_data} source_type={source_type} />
            <TransformationLibrary onAddNode={onAddStepNode} />
          </div>
          <div className="w-3/5 border-r border-border">
            <h2 className="pl-4 font-semibold text-foreground">Datawand pipeline</h2>
            <PipelineStack steps={steps} selectedNode={selectedNode} 
              onSelectNode={function (id: string): void {
              setSelectedNode(id)
            } } onDeleteNode={function (id: string): void {
              onRemoveStepNode(id);
            } } onMoveNode={function (id: string, direction: "up" | "down"): void {
              console.log(id, direction);
            } } />
          </div>
          <div className="w-1/5 border-r border-border pl-4">
            <h2 className="mb-1 font-semibold text-foreground">Selected step</h2>
            {!selectedNode && (
              <p className="text-sm text-muted-foreground">Select a step to configure</p>
            )}
            {selectedNode && (
              <PipelineStepConfiguration index={steps.findIndex(step => step.id === selectedNode)} transformation={steps.find(step => step.id === selectedNode)} onChange={onStepConfigurationChanged} />
            )}
          </div>
        </div>
        <div className="mt-4 w-full border-t border-border pt-4">
          <h2 className="font-semibold text-foreground">Preview {transformedContent == originalContent ? " (Original)" : " (Transformed)"}</h2>
          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <pre className="whitespace-pre-wrap break-words text-sm text-muted-foreground">
                {transformedContent}
            </pre>
          </div>
        </div>
      </section>
    </div>
  )
}