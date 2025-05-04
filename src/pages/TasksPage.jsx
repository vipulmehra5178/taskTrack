import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TasksPage = () => {
  const { projectId } = useParams();
  const token = localStorage.getItem('token');
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE}/task/${projectId}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('❌ Error fetching tasks:', error);
    }
  };

  // Create or update task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTaskId) {
        await axios.put(
          `${API_BASE}/task/${editingTaskId}/updateTask`,
          { title, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEditingTaskId(null);
      } else {
        await axios.post(
          `${API_BASE}/task/${projectId}/createTask`,
          { title, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (error) {
      console.error('❌ Error submitting task:', error);
    }
  };

  // Delete task
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`${API_BASE}/task/${taskId}/deleteTask`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error('❌ Error deleting task:', error);
    }
  };

  // Toggle completion status
  const toggleTaskStatus = async (task) => {
    try {
      await axios.put(
        `${API_BASE}/task/${task._id}/updateTask`,
        { isCompleted: !task.isCompleted },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTasks();
    } catch (error) {
      console.error('❌ Error updating task status:', error);
    }
  };

  // Start editing task
  const handleEdit = (task) => {
    setEditingTaskId(task._id);
    setTitle(task.title);
    setDescription(task.description);
  };

  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
      return;
    }
    fetchTasks();
  }, [projectId]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">
        {editingTaskId ? 'Edit Task' : 'Create Task'}
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-6 max-w-md space-y-3">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {editingTaskId ? 'Update Task' : 'Create Task'}
        </button>
      </form>

      {/* Tasks */}
      <div className="grid gap-4">
        {tasks.length === 0 ? (
          <p className="text-gray-600">No tasks found.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className={`p-4 rounded shadow bg-white space-y-1 border-l-4 ${
                task.isCompleted ? 'border-green-500' : 'border-yellow-500'
              }`}
            >
              <h3 className="font-bold text-lg flex justify-between">
                {task.title}
                <button
                  onClick={() => toggleTaskStatus(task)}
                  className={`ml-2 px-2 py-1 text-xs rounded ${
                    task.isCompleted ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                  }`}
                >
                  {task.isCompleted ? 'Completed' : 'Mark Complete'}
                </button>
              </h3>
              <p>{task.description}</p>
              <p className="text-sm text-gray-500">
                Created: {new Date(task.createdAt).toLocaleString()}
              </p>
              <div className="space-x-2 mt-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TasksPage;
