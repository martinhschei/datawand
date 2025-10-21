import React, { useEffect, useState } from "react";
import { getCurrentWebview } from "@tauri-apps/api/webview";
import { useNavigate } from "react-router-dom";

export default function FileDrop() {
  const [hovering, setHovering] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const [nonProcessableFiles, setNonProcessableFiles] = useState<string[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    let unlisten: (() => void) | undefined;

    const setup = async () => {
      unlisten = await getCurrentWebview().onDragDropEvent((event) => {
        if (event.payload.type === 'over') {
          setHovering(true);
        } else if (event.payload.type === 'drop') {
          if (event.payload.paths.some(isAFolder)) {
            setFiles([]);
            setNonProcessableFiles([]);
            return;
          }
          const processableFiles = event.payload.paths.filter(isADroppableFile).sort((a, b) => a.length - b.length);
          const nonDroppableFiles = event.payload.paths.filter(path => !isADroppableFile(path)).sort((a, b) => a.length - b.length);
          
          setNonProcessableFiles(nonDroppableFiles);
          if (processableFiles.length > 0) {
            setFiles(processableFiles);
            setHovering(false);
          } else {
            setFiles([]);
          }
        } else {
          setHovering(false);
          setFiles([]);
          setNonProcessableFiles([]);
        }
      });
    };

    setup();

    return () => {
      if (unlisten) {
        unlisten();
      }
    };
  }, []);

    const isADroppableFile = (filePath: string) => {
        const droppableExtensions = ['.txt', '.md', '.csv', '.json', '.xml'];
        return droppableExtensions.some(ext => filePath.endsWith(ext));
    }

    const isAFolder = (path: string) => {
        return path.endsWith('/') || path.endsWith('\\');
    }

    const removeFile = (index: number) => {
      const updatedFiles = [...files];
      updatedFiles.splice(index, 1);
      if (updatedFiles.length === 0) {
        setNonProcessableFiles([]);
      }
      setFiles(updatedFiles);
    }

    const clearFiles = () => {
      setFiles([]);
      setNonProcessableFiles([]);
    }

    const gotoTransform = () => {
      const sourceFiles = files.map(filePath => {
        const parts = filePath.split(/[/\\]/);
        return { name: parts[parts.length - 1].toLowerCase(), path: filePath };
      });

      navigate('/transform', { state: { source_data: sourceFiles, source_type: 'filedrop' } });
    }

    return (
        <section className="col-span-12 space-y-4 h-full flex flex-col flex-1 min-h-0">
          <div className="flex-1 flex flex-col min-h-0">
            {files.length === 0 && (
              <div className={`rounded-2xl bg-white text-center h-full flex items-center justify-center
                ${hovering ? "bg-green-100 text-green-700" : "border-gray-500 bg-white text-gray-500"}
                ${nonProcessableFiles.length > 0 ? "border-red-600 bg-red-50 text-red-700" : ""}
              `}>
                {!hovering && (
                  <p>
                    {nonProcessableFiles.length > 0 && files.length === 0
                    ? "Only supported files can be processed. Drop files of type .txt .md .csv .json .xml"
                    : "Drop your files here"}
                  </p>
                )}
                <p>
                  {hovering && "Drop to get started!"}
                </p>
              </div>
            )}

            {files.length > 0 && (
              <div className="rounded-2xl p-2 bg-white overflow-y-auto min-h-0">
                <h2 className="text-xl font-semibold mb-4">
                  {files.length} dropped {files.length === 1 ? 'file' : 'files'} that can be processed
                </h2>
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th className="py-2 px-4">File Name</th>
                      <th className="py-2 px-4 w-32"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((file, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4 break-all">{file}</td>
                        <td className="py-2 px-4">
                          <button
                            className="cursor-pointer bg-orange-600 hover:bg-orange-700 text-white font-bold p-2 px-4 rounded"
                            onClick={() => removeFile(index)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {nonProcessableFiles.length > 0 && (
              <div className="rounded-2xl p-2 bg-white flex-1 overflow-y-auto min-h-0">
                <h2 className="text-xl font-semibold mb-4">
                  {nonProcessableFiles.length} dropped {nonProcessableFiles.length === 1 ? 'file' : 'files'} that cannot be processed
                  <p className="text-gray-500 text-sm">Supported file types are .txt .md .csv .json .xml</p>
                </h2>
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th className="py-2 px-4">File Name</th>
                      <th className="py-2 px-4 w-32"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {nonProcessableFiles.map((file, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4 break-all">{file}</td>
                        <td className="py-2 px-4">
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
          </div>

          {files.length > 0 && (
            <div className="flex justify-center space-x-4">
              <button
                className="cursor-pointer bg-orange-600 hover:bg-orange-700 text-white font-bold p-2 px-4 rounded"
                onClick={() => clearFiles()}
              >
                Remove all files
              </button>
              <button 
                className="cursor-pointer bg-green-600 hover:bg-green-700 text-white font-bold p-2 px-4 rounded"
                onClick={() => gotoTransform()}
              >
                Continue
              </button>
            </div>
          )}
        </section>
    )
}
