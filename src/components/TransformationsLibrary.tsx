import { Transformation } from "../models/Transformation";
// @ts-ignore: Could not find a declaration file for module '../models/TransformationsDefinitions'
import { TransformationDefinitions } from "../models/TransformationsDefinitions";

type TransformationLibraryProps = {
  onAddNode: (transformation: Transformation) => void
}

const transformations: { category: string; file_types: string[]; items: Transformation[] }[] = [
  {
    category: "Transformations",
    file_types: [".csv", ".json", ".xml"],
    items: TransformationDefinitions
  }
]

export function TransformationLibrary({ onAddNode }: TransformationLibraryProps) {
  return (
    <div>
      {transformations.map((category) => (
        <div key={category.category}>
          <h2 className="font-semibold text-foreground">
            {category.category}
          </h2>
          <div className="space-y-1">
            {category.items.map((item) => {
              const Icon = item.icon
              return (
                <button key={item.identifier} onClick={() => onAddNode(item) } className="button-primary cursor-pointer flex w-full items-center gap-3 rounded-md border border-border p-2 text-left text-sm transition-colors focus:outline-none">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-secondary-foreground">{item.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}