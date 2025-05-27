import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Dashboard from "./pages/Dashboard";
import ProjectList from "./components/core/Dashboard/Project/ProjectList";
import ProjectDetail from "./components/core/Dashboard/Project/ProjectDetail";
import Profile from "./components/core/Dashboard/Profile/Profile";
import Issues from "./components/core/Dashboard/Issues/Issues";

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
          <Route path="issues" element={<Issues/>} />
          <Route path="profile" element={<Profile/>} />
          <Route path="project/:id" element={<ProjectDetail />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
