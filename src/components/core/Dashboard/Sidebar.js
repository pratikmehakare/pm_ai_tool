import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Drawer, IconButton, Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';

const navLinkData = [
  { name: 'Projects', path: '/dashboard/projects' },
  { name: 'Issues', path: '/dashboard/issues' },
  { name: 'Profile', path: '/dashboard/profile' },
];

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const getIsActive = (path) => {
    if (location.pathname === '/dashboard' && path === '/dashboard/projects') {
      return true;
    }
    return location.pathname === path;
  };

  const linkClasses = (isActive) =>
    `block px-4 py-2 rounded-md font-medium ${
      isActive ? 'bg-gray-600 text-white' : 'text-gray-700 hover:bg-gray-200'
    }`;

  return (
    <>
    
      <Box
        className="fixed top-[64px] left-4 z-50 md:hidden" 
      >
        <IconButton
          onClick={() => setIsOpen(true)}
          color="inherit"
          aria-label="open sidebar"
        >
          <MenuIcon className='text-3xl text-gray-800'/>
        </IconButton>
      </Box>

      {/* Sidebar for desktop */}
      <Box className="hidden md:block w-60 bg-gray-100 p-4 border-r min-h-screen font-mono">
        <Typography variant="h6" className="mb-6 p-4"><DashboardIcon fontSize="small"/> Dashboard</Typography>
        <nav className="space-y-4">
          {navLinkData.map(({ name, path }) => (
            <NavLink key={path} to={path} className={() => linkClasses(getIsActive(path))}>
              {name}
            </NavLink>
          ))}
        </nav>
      </Box>

      {/* Drawer for mobile */}
      <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
        <Box width={240} role="presentation" p={2}>
          <Typography variant="h6" className="mb-4 p-4"> <DashboardIcon fontSize="small"/> Dashboard</Typography>
          <nav className="space-y-4">
            {navLinkData.map(({ name, path }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={() => linkClasses(getIsActive(path))}
              >
                {name}
              </NavLink>
            ))}
          </nav>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
