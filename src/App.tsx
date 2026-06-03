import { Routes, Route, Navigate } from "react-router-dom";
import MyHusqvarna from "./pages/MyHusqvarna";
import EcosystemPresentation from "./pages/EcosystemPresentation";
import HighlightFeature from "./pages/HighlightFeature";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/my-husqvarna" replace />} />
      <Route path="/my-husqvarna" element={<MyHusqvarna />} />
      <Route path="/ecosystem-presentation" element={<EcosystemPresentation />} />
      <Route path="/highlight-feature" element={<HighlightFeature />} />
    </Routes>
  );
}
