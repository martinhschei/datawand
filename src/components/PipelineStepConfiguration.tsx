import { Transformation } from "../models/Transformation";

export function PipelineStepConfiguration({ index, transformation: step, onChange }: { index: number, transformation: Transformation | undefined, onChange?: (transformation: Transformation) => void }) {
  
  const changeValue = (key: string, value: string) => {
    if (!step) return;
    step.params[key] = value;
    onChange?.(step);
  }

  if (!step) return null;

  return (
    <div className="pr-4 space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <p className="text-sm text-muted-foreground">#{index+1} - {step.name}</p>
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <p className="text-sm text-muted-foreground">{step.description}</p>
        </div>
        <div>
          <label className="mb-1 block font-medium">Step config parameters</label>
          {step.params && Object.keys(step.params).length === 0 && (
            <p className="text-sm text-muted-foreground">No parameters</p>
          )}
          {step.params && Object.keys(step.params).length > 0 && (
            <div>
              {Object.entries(step.params)
                .map(([key, value]) => (
                    <div key={key} className="mb-2">
                        <label className="text-sm text-muted-foreground uppercase">{key.split("_").join(" ")}</label>
                        <input type="text" className="w-full bg-white focus:bg-gray-100 border border-gray-300 rounded py-2 px-4" name={key} value={value} onChange={(e) => changeValue(e.target.name, e.target.value as string)}/>
                    </div>
                ))}
            </div>
          )}
      </div>
    </div>
  );
}
