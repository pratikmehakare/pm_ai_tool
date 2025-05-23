import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Dashboard from "./pages/Dashboard";
import Project from "./components/core/Dashboard/Project/Project";
import ProjectList from "./components/core/Dashboard/Project/ProjectList";
import ProjectDetail from "./components/core/Dashboard/Project/ProjectDetail";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Redirect root to /dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Dashboard Layout */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* ✅ Default content when visiting /dashboard */}
          <Route index element={<ProjectList />} />

          {/* Subroutes */}
          <Route path="projects" element={<ProjectList />} />
          <Route path="issues" element={<Project />} />
          <Route path="profile" element={<Project />} />
          <Route path="project/:id" element={<ProjectDetail />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
