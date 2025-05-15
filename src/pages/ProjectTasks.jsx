import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTasks, createTask, updateTask, deleteTask } from "../utils/api";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

const ProjectTasks = () => {
  const { projectId } = useParams();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await getTasks(userId, projectId, token);
    setTasks(res.data.tasks);
  };

  const handleCreateTask = async (taskData) => {
  try {
    console.log("Creating task with data:", taskData); // Debug line
    await createTask(userId, projectId, taskData, token);
    fetchTasks();
  } catch (error) {
    console.error("Error creating task:", error); // Catch 404 errors
  }
};


  const handleUpdate = async (taskId, updates) => {
    await updateTask(userId, projectId, taskId, updates, token);
    fetchTasks();
  };

  const handleDelete = async (taskId) => {
    await deleteTask(userId, projectId, taskId, token);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Tasks for Project</h1>
      <TaskForm onSubmit={handleCreateTask} />
      <div className="grid gap-4 mt-6">
        {Array.isArray(tasks) && tasks.map(task => (
  <TaskCard key={task._id || task.taskId} task={task} onUpdate={handleUpdate} onDelete={handleDelete} />
))}

      </div>
    </div>
  );
};

export default ProjectTasks;
