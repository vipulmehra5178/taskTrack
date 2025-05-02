// src/components/ProjectCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg mb-4">
      <h2 className="text-2xl font-bold">{project.title}</h2>
      <p>{project.description}</p>
      <Link
        to={`/projects/${project.uuid}`}
        className="mt-4 text-blue-500 hover:underline"
      >
        View Tasks
      </Link>
    </div>
  );
};

export default ProjectCard;
