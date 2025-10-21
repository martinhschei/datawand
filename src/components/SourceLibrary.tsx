import useAppState from "../stores/app";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

export default function SourceLibrary({ source_data, source_type }: { source_data: any[], source_type: string | null }) {
    return (
        <section>
            {source_type === 'filedrop' && fileDrop({ files: source_data }) }
        </section>
    )
}

function fileDrop({ files }: { files: { name: string, path: string }[] }) {
    const [selectedSource, setSelectedSource] = useState("")
    const setOriginalContent = useAppState((state: any) => state.setOriginalContent);
    const setTransformedContent = useAppState((state: any) => state.setTransformedContent);

    const onSelectedSource = (source: string) => {
        setSelectedSource(source);
    }

    useEffect(() => {
        (async () => {
            const file = files.find(f => f.name === selectedSource);
            if (file) {
                const text = await invoke<string>('read_text_file', { path: file.path });
                setOriginalContent(text);
                setTransformedContent(text);
            }
        })();
    }, [selectedSource])

    useEffect(() => {
        if (files.length > 0) {
            setSelectedSource(files[0].name);
        }
    }, [])

    return (
        <div>
            <h2 className="font-semibold text-foreground">Source</h2>
            {files.length === 0 ? (
                <p className="text-sm text-muted-foreground">No source selected</p>
            ) : (
                <select value={selectedSource} onChange={(e) => onSelectedSource(e.target.value)} className="w-full rounded-md border border-border bg-background p-2 text-foreground">
                    {files.map((item, index) => (
                        <option key={index} value={item.name}>{item.name}</option>
                    ))}
                </select>
            )}
        </div>
    )
}