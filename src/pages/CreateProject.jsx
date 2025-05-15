// src/components/CreateProject.jsx
import { useState } from "react";
import { createProject } from "../utils/api";
import { useNavigate } from "react-router-dom";

const CreateProject = ({ userId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createProject(userId, { title, description });
      setTitle("");
      setDescription("");
      navigate("/dashboard");
    } catch (err) {
      alert(err?.response?.data?.msg || "Error creating project");
    }
  };

  return (
    <form onSubmit={handleCreate} className="mb-6 space-y-4">
      <h2 className="text-xl font-semibold">Create New Project</h2>
      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded p-2 w-full"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create Project
      </button>
    </form>
  );
};

export default CreateProject;
