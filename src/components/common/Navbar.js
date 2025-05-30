import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Menu,    
  MenuItem,   
  useTheme,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate(); 

  const [anchorEl, setAnchorEl] = useState(null); 
  const openMenu = Boolean(anchorEl);

  const userProfileImage = ''; 
  const userName = 'User'; 

 
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget); 
  };

  const handleCloseMenu = () => {
    setAnchorEl(null); 
  };

  const handleProfileClick = () => {
    navigate('/dashboard/profile');
    handleCloseMenu(); 
  };

  const handleLogout = () => {
    //  IMPORTANT: Implement  actual logout logic here 
    // For example:
    // 1. Clear user token from localStorage/sessionStorage
    // localStorage.removeItem('authToken');
    // 2. Clear any user context/state (e.g., from Redux, Context API)
    // dispatch({ type: 'LOGOUT' });
    // 3. Redirect to login page
    console.log('User logged out!'); // Placeholder for actual logout
    navigate('/login'); // Redirect to your login page
    handleCloseMenu(); // Close the menu after logout
  };

  return (
    <AppBar
      position="static"
      elevation={4}
      sx={{
        bgcolor: theme.palette.grey[800],
        fontFamily: 'monospace',
      }}
    >
      <Toolbar sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: { xs: 2, sm: 3, md: 4 },
        py: 1,
      }}>
        {/* Left Section: Logo and Title */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          color: 'white',
        }}>
        <img src="/Short logo.png" alt="Opal Logo" style={{ height: 50, width: 60 }} />
          <Typography
            variant="h5"
            component={Link}
            to="/dashboard"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'medium',
              '&:hover': {
                color: theme.palette.grey[400],
                transition: 'color 0.2s ease-in-out',
              },
            }}
          >
            PM-AI-TOOL
          </Typography>
        </Box>

        {/* Right Section: User Avatar and Menu */}
        <Box>
          <IconButton
            onClick={handleMenu} // This now opens the menu
            color="inherit"
            aria-label="account of current user"
            aria-controls={openMenu ? 'menu-appbar' : undefined} // For accessibility
            aria-haspopup="true" // For accessibility
            sx={{ p: 0 }}
          >
            <Avatar
              alt={userName} 
              src={userProfileImage}
              sx={{
                width: 40,
                height: 40,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                border: `2px solid ${theme.palette.primary.light}`,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              {!userProfileImage && <PersonIcon />}
            </Avatar>
          </IconButton>

          <Menu
            id="menu-appbar" 
            anchorEl={anchorEl} 
            anchorOrigin={{
              vertical: 'bottom', 
              horizontal: 'right', 
            }}
            keepMounted 
            transformOrigin={{
              vertical: 'top',    
              horizontal: 'right', 
            }}
            open={openMenu} 
            onClose={handleCloseMenu} 
          >
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;