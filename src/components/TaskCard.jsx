const TaskCard = ({ task, onUpdate, onDelete }) => (
  <div className="border p-4 rounded shadow">
    <h3 className="font-bold">{task.title}</h3>
    <p>{task.description}</p>
    <p>Status: {task.status}</p>

    <div className="flex gap-2 mt-2">
      {task.status !== "Completed" && (
        <button onClick={() => onUpdate(task.taskId, { status: "Completed" })} className="text-green-600">Mark Completed</button>
      )}
      <button onClick={() => onDelete(task.taskId)} className="text-red-600">Delete</button>
    </div>
  </div>
);

export default TaskCard;
