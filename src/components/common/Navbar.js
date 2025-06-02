import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const userProfileImage = "";
  const userName = "User";

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate("/dashboard/profile");
    handleCloseMenu();
  };

  const handleLogout = () => {
    console.log("User logged out!");
    navigate("/login");
    handleCloseMenu();
  };

  return (
    <AppBar
      position="static"
      elevation={4}
      sx={{
        bgcolor: "#001F3F", // Dark blue
        fontFamily: "monospace",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2, sm: 3, md: 4 },
          py: 1,
        }}
      >
        {/* Left Section: Logo and Title */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            color: "white",
          }}
        >
          <img
            src="/logo.png"
            alt="Opal Logo"
            style={{ height: 50, width: 60 }}
          />
          <Typography
            variant="h5"
            component={Link}
            to="/dashboard"
            sx={{
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "1.6rem",
              letterSpacing: "0.05em",
              color: "#b0fffb",
              fontFamily: "monospace",
              textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                color: theme.palette.secondary.light,
              },
            }}
          >
            PM-AI-TOOL
          </Typography>
        </Box>

        {/* Right Section: User Avatar and Menu */}
        <Box>
          <IconButton
            onClick={handleMenu}
            color="inherit"
            aria-label="account of current user"
            aria-controls={openMenu ? "menu-appbar" : undefined}
            aria-haspopup="true"
            sx={{ p: 0 }}
          >
            <Avatar
              alt={userName}
              src={userProfileImage}
              sx={{
                width: 40,
                height: 40,
                bgcolor: theme.palette.primary.contrastText,
                color: "#0D47A1", // dark blue text if image not loaded
                border: `2px solid ${theme.palette.primary.light}`,
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
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
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
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
