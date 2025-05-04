import { useState } from 'react';
import { login } from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await login(formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.userId);
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      alert('Login failed!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4 w-full max-w-md">
        <h2 className="text-xl font-semibold">Login</h2>
        <input name="email" onChange={handleChange} placeholder="Email" type="email" required className="input" />
        <input name="password" onChange={handleChange} placeholder="Password" type="password" required className="input" />
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
}
