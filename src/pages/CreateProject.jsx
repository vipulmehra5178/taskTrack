import React, { useState } from 'react';
import { createProject } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectError, setProjectError] = useState('');
  const navigate = useNavigate();

  const handleCreateProject = async (e) => {
    e.preventDefault();

    if (!projectTitle) {
      return setProjectError('Project title is required');
    }

    try {
      const res = await createProject({
        title: projectTitle,
        description: projectDescription,
      });
      console.log('Created Project:', res.data);
      navigate('/dashboard');
    } catch (err) {
        console.log(err);
      setProjectError('Failed to create project');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6">Create New Project</h2>
      {projectError && <p className="text-red-500 mb-4">{projectError}</p>}
      <form onSubmit={handleCreateProject}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Project Title</label>
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter project title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Project Description</label>
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Enter project description"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
