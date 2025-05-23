import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const navLinkData = [
  {
    name: 'Projects',
    path: '/dashboard/projects',
  },
  {
    name: 'Issues',
    path: '/dashboard/issues',
  },
  {
    name: 'Profile',
    path: '/dashboard/profile',
  },
];

const Sidebar = () => {
  const location = useLocation();

  const getIsActive = (path) => {
    if (location.pathname === '/dashboard' && path === '/dashboard/projects') {
      return true; // Default highlight for /dashboard
    }
    return location.pathname === path;
  };

  const linkClasses = (isActive) =>
    `block px-4 py-2 rounded-md font-medium ${
      isActive ? 'bg-gray-600 text-white' : 'text-gray-700 hover:bg-gray-200'
    }`;

  return (
    <aside className="w-60 bg-gray-100 p-4 border-r min-h-full font-mono">
      <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
      <nav className="space-y-2">
        {navLinkData.map(({ name, path }) => {
          const isActive = getIsActive(path);
          return (
            <NavLink
              key={path}
              to={path}
              className={() => linkClasses(isActive)}
            >
              {name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
