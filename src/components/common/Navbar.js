import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-600 text-white px-6 py-4 shadow-md font-mono">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold ">PM AI Tool</h1>
        <div className="space-x-4">
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
