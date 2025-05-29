import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-600 text-white py-4 shadow-md font-mono">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
  
        <div className="flex items-center gap-x-3 text-2xl font-semibold">
          <img
            src="/opal-logo.svg"
            alt="logo"
            className="h-10 w-10"
          />
          <Link  className="hover:text-gray-300 transition">PM-AI-TOOL</Link>
        </div>

        <div className="flex gap-x-2 items-center">
          <Link
            to="/dashboard"
            className="bg-[#2563eb] text-white py-2 px-5 rounded-full font-semibold text-md  transition duration-200"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
