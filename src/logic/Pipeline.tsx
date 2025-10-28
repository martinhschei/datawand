import { Command } from "@tauri-apps/plugin-shell";
import { Transformation } from "../models/Transformation";

export class Pipeline {
    public async run(content: string, steps: Transformation[]): Promise<string> {
        const pipelineCopy = JSON.parse(JSON.stringify(steps));

        const decodeStep = this.decodeStep();
        const encodeStep = this.encodeStep();

        pipelineCopy.unshift(decodeStep);
        pipelineCopy.push(encodeStep);

        console.log(pipelineCopy);

        const args = [
            "--input-b64",
            btoa(content),
            "--pipeline-b64",
            btoa(JSON.stringify(pipelineCopy))
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

    private decodeStep(): Transformation {
        const decodeStep: Transformation = {
            params: {},
            icon: null,
            type: "decode",
            id: "decode_step",
            name: "DecodeCSV",
            friendly_name: "Decode JSON",
            description: "Decodes a JSON string",
        }

        return decodeStep;
    }
    
    private encodeStep(): Transformation {
        const encodeStep: Transformation = {
            params: {
                indent: "true"
            },
            icon: null,
            type: "encode",
            id: "encode_step",
            name: "EncodeJSON",
            friendly_name: "Encode JSON",
            description: "Encodes data to a JSON string",
        }

        return encodeStep;
    }
}