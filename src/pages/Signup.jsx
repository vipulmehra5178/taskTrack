// src/pages/Signup.jsx
import { useState } from "react";
import { signup } from "../utils/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.userId);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
        <input name="name" placeholder="Name" required className="w-full p-2 border mb-3 rounded" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" required className="w-full p-2 border mb-3 rounded" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" required className="w-full p-2 border mb-3 rounded" onChange={handleChange} />
        <input name="country" placeholder="Country" required className="w-full p-2 border mb-4 rounded" onChange={handleChange} />
        <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
