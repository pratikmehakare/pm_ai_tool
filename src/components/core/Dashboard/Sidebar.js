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

const navLinkData = [
  { name: 'Projects', path: '/dashboard/projects', icon: <FolderOpenIcon /> },
  { name: 'Profile', path: '/dashboard/profile', icon: <AccountCircleIcon /> },
   { name: 'Issues', path: '/dashboard/issues', icon: < BugReportIcon/> },
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
              borderRadius: 1,
              mx: 1,
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
              },
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: getIsActive(path)
                  ? theme.palette.primary.contrastText
                  : theme.palette.text.secondary,
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText primary={name} />
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
            bgcolor: 'background.paper',
            borderRight: 1,
            borderColor: 'divider',
            minHeight: '100vh',
            p: 2,
            flexShrink: 0,
            pt: 10,
            boxSizing: 'border-box',
          }}
        >
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
            WorkSpace
          </Typography>
          <Divider sx={{ mb: 2 }} /> 
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