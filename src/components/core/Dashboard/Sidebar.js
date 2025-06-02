import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Drawer,
  IconButton,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BugReportIcon from '@mui/icons-material/BugReport';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AnalyticsIcon from '@mui/icons-material/Analytics';
const navLinkData = [
  { name: 'Projects', path: '/dashboard/projects', icon: <FolderOpenIcon /> },
  { name: 'Issues', path: '/dashboard/issues', icon: < BugReportIcon/> },
  { name: 'Analytics', path: '/dashboard/analytics', icon: <AnalyticsIcon /> },
  { name: 'Profile', path: '/dashboard/profile', icon: <AccountCircleIcon /> },
];

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const getIsActive = (path) => {
    if (location.pathname === '/dashboard' && path === '/dashboard/projects') {
      return true;
    }
    return location.pathname === path;
  };

const renderNavLinks = () => (
  <List>
    {navLinkData.map(({ name, path, icon }) => (
      <ListItem key={path} disablePadding>
        <ListItemButton
          component={NavLink}
          to={path}
          onClick={() => setIsOpen(false)}
          selected={getIsActive(path)}
          sx={{
            borderRadius: 2,
            mx: 0.5,              // less horizontal margin outside button
            px: 2,                // reduce horizontal padding inside button (default is more)
            py: 0.8,              // reduce vertical padding inside button
            fontWeight: 'bold',
            fontFamily: "'Poppins', sans-serif",
            textTransform: 'capitalize',
            color: getIsActive(path) ? 'white' : 'inherit',
            width: 'fit-content', // shrink width to content + padding
            background: getIsActive(path)
              ? 'linear-gradient(90deg, #3b82f6 0%, #ec4899 100%)' // blue to pink gradient
              : 'transparent',
            boxShadow: getIsActive(path)
              ? '0 3px 6px rgba(236, 72, 153, 0.4)' // smaller shadow
              : 'none',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(90deg, #60a5fa 0%, #f472b6 100%)', // lighter blue-pink gradient on hover
              color: 'white',
              fontWeight: '700',
              boxShadow: '0 3px 8px rgba(236, 72, 153, 0.5)', // smaller shadow on hover
            },
            '& .MuiListItemIcon-root': {
              color: getIsActive(path) ? 'white' : '#9ca3af',
              minWidth: 40,
              marginRight: 1,
              marginBottom:2

            },
          }}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText
            primary={name}
            primaryTypographyProps={{
              fontWeight: getIsActive(path) ? '900' : 'bold',
              fontFamily: "'Poppins', sans-serif",
            }}
          />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
);




  return (
    <>
     {!isDesktop && (
        <Box
          sx={{
            position: 'fixed',
            top: 70,
            left: 16,
            zIndex: theme.zIndex.appBar + 1,
          }}
        >
          <IconButton
            onClick={() => setIsOpen(true)}
            color="inherit"
            aria-label="open sidebar"
          >
            <MenuIcon sx={{ fontSize: '28px', color: theme.palette.text.primary }} />
          </IconButton>
        </Box>
      )}


      {isDesktop && (
        <Box
          sx={{
            width: 240,
            bgcolor: '#D4D4D4',
            borderRight: 1,
            borderColor: 'divider',
            minHeight: '100vh',
            p: 2,
            flexShrink: 0,
            boxSizing: 'border-box',
          }}
        >
          {renderNavLinks()}
        </Box>
      )}

     
      <Drawer
        anchor="left"
        open={isOpen && !isDesktop}
        onClose={() => setIsOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            bgcolor: 'background.paper',
          },
        }}
      >
        <Box sx={{ p: 2, pt: 3 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2, 
              px: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'text.primary',
              fontWeight: 'medium',
            }}
          >
            <DashboardIcon fontSize="medium" color="primary" />
            Dashboard
          </Typography>
          <Divider sx={{ mb: 2 }} /> 
          {renderNavLinks()}
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;