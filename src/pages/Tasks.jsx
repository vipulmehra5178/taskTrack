// src/pages/Tasks.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTasks, createTask, deleteTask, updateTask } from '../utils/api';

const Tasks = () => {
  const { userId, projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const token = localStorage.getItem('token');

  const fetchTasks = async () => {
    const res = await getTasks(userId, projectId, token);
    setTasks(res.data.tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async () => {
    if (!newTask.title.trim()) return;
    await createTask(userId, projectId, newTask, token);
    setNewTask({ title: '', description: '' });
    fetchTasks();
  };

  const handleStatusChange = async (taskId, status) => {
    await updateTask(userId, projectId, taskId, { status }, token);
    fetchTasks();
  };

  const handleDelete = async (taskId) => {
    await deleteTask(userId, projectId, taskId, token);
    fetchTasks();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 mr-2"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          className="border p-2 mr-2"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <button onClick={handleCreateTask} className="bg-blue-500 text-white px-4 py-2">
          Add Task
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.taskId} className="border p-3 mb-2 rounded">
            <div className="font-semibold">{task.title}</div>
            <div className="text-sm text-gray-600">{task.description}</div>
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(task.taskId, e.target.value)}
              className="mt-2 border p-1"
            >
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <button
              onClick={() => handleDelete(task.taskId)}
              className="ml-4 text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
