// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home"; // ✅ Make sure you have this file
import ProtectedRoute from "./utils/ProtectedRoute";
import ProjectTasks from "./pages/ProjectTasks"; // ✅ Make sure you have this file
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        // Add this route
        <Route path="/project/:projectId/tasks" element={<ProjectTasks />} />

      </Routes>
    </Router>
  );
}

export default App;
