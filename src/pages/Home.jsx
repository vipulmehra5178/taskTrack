// src/pages/Home.jsx
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Welcome to Task Tracker</h1>
      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default Home;
