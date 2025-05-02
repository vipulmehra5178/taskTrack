// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { getProjects } from '../services/api';
import ProjectCard from '../components/ProjectCard';

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await getProjects();
      setProjects(response.data);
    };
    fetchProjects();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Projects</h1>
      <div>
        {projects.map((project) => (
          <ProjectCard key={project.uuid} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Home;
