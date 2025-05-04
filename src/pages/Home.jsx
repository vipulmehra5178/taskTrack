import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">Task Tracker App</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
        Welcome to the Task Tracker! Organize your projects, manage tasks,
        and track progress all in one place. Sign up to get started!
      </p>
      <div className="flex space-x-4">
        <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Login</Link>
        <Link to="/signup" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Signup</Link>
      </div>
    </div>
  );
}
