
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

  useEffect(() => {
    loadProjects();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
              <p className="mt-2">Your user ID: <strong>{userId}</strong></p>
              <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      <p className="mt-2">Welcome to Task Tracker! Here you can manage your projects.</p>
      <p className="mt-2">Create a new project to get started.</p>
      <CreateProject userId={userId} onProjectCreated={loadProjects} />

      <h2 className="text-xl font-semibold mb-2">Your Projects</h2>
      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <div
            key={project.projectId}
            className="p-4 border rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{project.title}</h3>
              <p className="text-gray-600">{project.description}</p>
              <p className="text-sm text-gray-400">
                Created: {new Date(project.createdAt).toLocaleString()}
              </p>
            </div>
            <button
              className="text-red-600 hover:underline"
              onClick={() => handleDelete(project.projectId)}
            >
              Delete
            </button>
          </div>
        ))}
        {projects.length === 0 && <p>No projects found. Create one!</p>}
      </div>
    </div>
  );
};

export default Dashboard;
