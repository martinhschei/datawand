import { ArrowRightLeft, Filter, Plus } from "lucide-react";

const TransformationDefinitions = [
    { identifier: "add_property",  name: "Add property", icon: Plus, type: "transform", description: "Adds a new property to each item in the dataset.", params: { property_name: "", value: "" } },
    { identifier: "extract_property", name: "Extract property", icon: Filter, type: "transform", description: "Extracts the same property from each item in the dataset.",  params: { property_name: "" } },
    { identifier: "rename_property", name: "Rename property", icon: ArrowRightLeft, type: "transform", description: "Renames a property for each item in the dataset.", params: { old_name: "", new_name: "" } },
]

export { TransformationDefinitions };