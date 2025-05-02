// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { getProjects } from '../services/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [dashError, setDashError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        const res = await getProjects();
        if (res.data && Array.isArray(res.data.projects)) {
          setProjects(res.data.projects);
        } else {
          setProjects([]);
        }
      } catch (err) {
        console.error(err);
        setDashError('Failed to load projects.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProjects();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="space-x-4">
          <Link
            to="/create-project"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + New Project
          </Link>
          <Link
            to="/create-task"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + New Task
          </Link>
        </div>
      </div>

      {dashError && <p className="text-red-500 mb-6">{dashError}</p>}

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : Array.isArray(projects) && projects.length === 0 ? (
        <p className="text-gray-600">No projects created yet.</p>
      ) : (
        <div className="grid gap-6">
          {projects.map((project) => (
            <div
              key={project.uuid}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <h2 className="text-xl font-semibold mb-2 text-blue-700">
                {project.title}
              </h2>
              <p className="text-gray-700 mb-3 italic">
                {project.description || 'No description'}
              </p>
              <div>
                <h3 className="font-semibold text-sm mb-2 text-gray-600">Tasks:</h3>
                {Array.isArray(project.tasks) && project.tasks.length > 0 ? (
                  <ul className="space-y-1 list-disc pl-5 text-gray-800">
                    {project.tasks.map((task) => (
                      <li key={task.uuid}>
                        <strong>{task.title}</strong> –{' '}
                        <span className="text-sm text-gray-500">{task.status}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No tasks in this project yet.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
