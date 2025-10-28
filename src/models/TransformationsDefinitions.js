import { ArrowRightLeft, Filter, Plus } from "lucide-react";

const TransformationDefinitions = [
    { name: "AddProperty", friendly_name: "Add property", icon: Plus, type: "transform", description: "Adds a new property to each item in the dataset.", params: { field: "", value: "" } },
    { name: "ExtractProperty", friendly_name: "Extract property", icon: Filter, type: "transform", description: "Extracts the same property from each item in the dataset.",  params: { field: "" } },
    { name: "RenameProperty", friendly_name: "Rename property", icon: ArrowRightLeft, type: "transform", description: "Renames a property for each item in the dataset.", params: { old_name: "", new_name: "" } },
]

export { TransformationDefinitions };