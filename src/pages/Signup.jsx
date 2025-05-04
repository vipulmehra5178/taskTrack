import { useState } from 'react';
import { signup } from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', country: '' });
  const navigate = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await signup(formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      alert('Signup failed!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4 w-full max-w-md">
        <h2 className="text-xl font-semibold">Sign Up</h2>
        <input name="name" onChange={handleChange} placeholder="Name" required className="input" />
        <input name="email" onChange={handleChange} placeholder="Email" type="email" required className="input" />
        <input name="password" onChange={handleChange} placeholder="Password" type="password" required className="input" />
        <input name="country" onChange={handleChange} placeholder="Country" required className="input" />
        <button type="submit" className="btn">Sign Up</button>
      </form>
    </div>
  );
}
