import { Command } from "@tauri-apps/plugin-shell";
import { TransformationStep } from "../models/TransformationStep";
import { Transformation } from "../models/Transformation";

export class Pipeline {
    private steps: TransformationStep[] = [];

    private normalizeStep(transformation: Transformation): TransformationStep {
        let normalizedStep: TransformationStep = {
            params: {},
            id: transformation.id,
            icon: transformation.icon,
            name: transformation.name,
            type: transformation.type,
            key: `step_${this.steps.length}`,
        }

        switch (transformation.identifier) {
            case "add_property":
                {
                    normalizedStep.pipeline_ref = "AddProperty";
                    normalizedStep.params = { property_name: "", value: "" };
                }
        }

        return normalizedStep;
    }

    public asPipelineDefinition(): string {
        const pipeline = this.steps.map(step => ({
            name: step.pipeline_ref,
            params: { ...step.params }
        }));

        return JSON.stringify(pipeline);
    }

    private validatePipeline(): boolean {
        if (this.steps.length === 0) {
            console.warn("Pipeline validation failed: no steps defined");
            return false;
        }

        if (this.steps.some(step => !step.pipeline_ref)) {
            console.warn("Pipeline validation failed: some steps are missing pipeline_ref");
            return false;
        }

        this.addDecodeStep();
        this.addEncodeStepIfNeeded();
        
        return true;
    }

    private fromStepsToPipelineDefinition(steps: Transformation[]): string {
        const normalizedSteps = steps.map(step => this.normalizeStep(step));

        const pipeline = normalizedSteps.map(step => ({
            name: step.pipeline_ref,
            params: { ...step.params }
        }));

        return JSON.stringify(pipeline);
    }

    public async run(content: string, steps: Transformation[]): Promise<string> {
        this.addDecodeStep();

        const pipeline = this.fromStepsToPipelineDefinition(steps);

        const args = [
            "--input-b64",
            btoa(content),
            "--pipeline-b64",
            btoa(pipeline)
        ];

        const cmd = Command.sidecar("bin/transformation-engine", args);
        try {
            const { stdout, stderr } = await cmd.execute();
            if (stderr) {
                console.warn("transformation-engine stderr:", stderr);
            }
            
            return stdout ?? "";
        } catch (err) {
            console.error("Failed to run transformation-engine", err);
            throw new Error((err as Error)?.message ?? String(err));
        }
    }

    
    private decodeStep(): TransformationStep {
        const decodeStep: TransformationStep = {
            params: {},
            icon: null,
            type: "decode",
            key: "decode_json",
            id: "decode_step",
            name: "Decode JSON",
            pipeline_ref: "DecodeCSV",
        }

        return decodeStep;
    }
    
    private encodeStep(): TransformationStep {
        const encodeStep: TransformationStep = {
            params: {},
            icon: null,
            type: "encode",
            id: "encode_step",
            key: "encode_json",
            name: "Encode JSON",
            pipeline_ref: "EncodeJSON",
        }

        return encodeStep;
    }
}