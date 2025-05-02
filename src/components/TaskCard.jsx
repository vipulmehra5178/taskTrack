// src/components/TaskCard.jsx
import React from 'react';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg mb-4">
      <h3 className="text-xl font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <div className="mt-2">
        <span
          className={`px-2 py-1 rounded-full ${
            task.status === 'ToDo'
              ? 'bg-yellow-200'
              : task.status === 'In Progress'
              ? 'bg-blue-200'
              : 'bg-green-200'
          }`}
        >
          {task.status}
        </span>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
          onClick={() => onUpdate(task)}
        >
          Update
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
