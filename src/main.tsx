import Layout from "./Layout";
import ReactDOM from "react-dom/client";
import { Transform } from "./components/Transform";
import { SourcePicker } from "./components/SourcePicker";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
<HashRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<SourcePicker selectedSource={null} onSelectSource={function (sourceId: string, config: any): void {
          throw new Error("Function not implemented.");
        } }  />} />
        <Route element={<Transform />} path="/transform" />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </HashRouter>
);
