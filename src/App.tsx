import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ProjectsPage from "./pages/ProjectsPage";
import AdminLogin from "./pages/AdminLogin";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/login" element={<AdminLogin />} />

      {/* Redirection de /folio vers / */}
      <Route path="/folio" element={<Navigate to="/" replace />} />
    </Routes>
  );
}