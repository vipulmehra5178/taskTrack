import { useEffect, useState } from "react";
import { getUserProjects, deleteProject } from "../utils/api";
import CreateProject from "../pages/CreateProject";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const userId = localStorage.getItem("userId");
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const loadProjects = async () => {
    try {
      const res = await getUserProjects(userId);
      setProjects(res.data.projects);
    } catch (err) {
      console.error(err);
      alert("Failed to load projects");
    }
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await deleteProject(userId, projectId);
      loadProjects();
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleViewTasks = (projectId) => {
    navigate(`/project/${projectId}/tasks`);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">User ID: <strong>{userId}</strong></p>
        </div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <p className="mb-4 text-gray-700">Welcome to Task Tracker! Manage your projects below.</p>
      <CreateProject userId={userId} onProjectCreated={loadProjects} />

      <h2 className="text-xl font-semibold mt-8 mb-4">Your Projects</h2>

      {projects.length === 0 ? (
        <p className="text-gray-500">No projects found. Create one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div
              key={project.projectId}
              className="p-4 border rounded-lg shadow bg-white flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-lg">{project.title}</h3>
                <p className="text-gray-600 mt-1">{project.description}</p>
                <p className="text-sm text-gray-400 mt-2">
                  Created: {new Date(project.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDelete(project.projectId)}
                >
                  Delete
                </button>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  onClick={() => handleViewTasks(project.projectId)}
                >
                  View Tasks
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
