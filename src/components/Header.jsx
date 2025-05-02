// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isAuthenticated, onLogout }) => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Task Tracker</Link>
        <div>
          {isAuthenticated ? (
            <button
              className="px-4 py-2 bg-red-500 rounded-lg"
              onClick={onLogout}
            >
              Logout
            </button>
          ) : (
            <div>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
