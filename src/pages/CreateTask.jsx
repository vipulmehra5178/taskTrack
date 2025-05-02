import React, { useState, useEffect } from 'react';
import { createTask, getProjects } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('ToDo');
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [projectsList, setProjectsList] = useState([]);
  const [taskError, setTaskError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getProjects();
        setProjectsList(res.data.projects);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };

    fetchProjects();
  }, []);

  const handleTaskSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProjectId || !taskTitle) {
      return setTaskError('Project and Title are required');
    }

    try {
      await createTask(selectedProjectId, {
        title: taskTitle,
        description: taskDescription,
        status: taskStatus,
      });

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setTaskError('Failed to create task');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Create New Task</h2>
      {taskError && <p className="text-red-500 mb-4">{taskError}</p>}
      <form onSubmit={handleTaskSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Select Project</label>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a project</option>
            {projectsList.map((project) => (
              <option key={project.uuid} value={project._id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Task Title</label>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Enter task description"
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Status</label>
          <select
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ToDo">ToDo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
