import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const [projects, setProjects] = useState([]);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const fetchProjects = async () => {
    if (!userId || !token) {
      console.warn('Missing userId or token');
      navigate('/login');
      return;
    }

    try {
      const res = await axios.get(`${API_BASE}/project/${userId}/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Fetched Projects:', res.data);
      setProjects(Array.isArray(res.data.projects) ? res.data.projects : []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      if (err.response?.status === 401) {
        alert('Unauthorized. Please log in again.');
        localStorage.clear();
        navigate('/login');
      }
      setProjects([]);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Welcome to your Dashboard</h1>

      <Link
        to={`/project/${userId}/createProject`}
        className="btn mb-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create New Project
      </Link>

      <div className="grid gap-4">
        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          projects.map((proj) => (
            <div key={proj._id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold">{proj.title}</h3>
              <p className="text-gray-700">{proj.description}</p>
              <p className="text-sm text-gray-500">
                Created at: {new Date(proj.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
