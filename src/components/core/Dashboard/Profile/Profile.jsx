import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  TextField,
  Button,
  Grid,
  Divider,
  useTheme,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person'; // Fallback icon for Avatar

const Profile = () => {
  const theme = useTheme();

  // Dummy user data (replace with actual data fetched from an API/context)
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Project Manager',
    organization: 'PM-AI Solutions',
    bio: 'Experienced project manager with a passion for agile methodologies and AI-driven tools.',
    profilePicture: 'https://i.pravatar.cc/150?img=68', 
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData); 

  // Handle input changes in edit mode
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  // Save changes
  const handleSave = () => {
    setUserData(editedData);
    setIsEditing(false);
  
    console.log('Profile saved:', editedData);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditedData(userData); 
    setIsEditing(false); 
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      p: 3,
      maxWidth: 800,
      mx: 'auto', 
      minHeight: '80vh', 
    }}>
      {/* Page Title */}
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold', color: theme.palette.text.primary }}>
        My Profile
      </Typography>

      <Paper elevation={4} sx={{
        width: '100%',
        p: { xs: 2, md: 4 },
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
      }}>
    
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Avatar
            alt={userData.name}
            src={userData.profilePicture}
            sx={{
              width: 120,
              height: 120,
              mb: 2,
              border: `3px solid ${theme.palette.primary.main}`,
              boxShadow: theme.shadows[3],
            }}
          >
            {!userData.profilePicture && <PersonIcon sx={{ fontSize: 80 }} />}
          </Avatar>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'medium', color: theme.palette.text.primary }}>
            {userData.name}
          </Typography>
        </Box>

        <Divider sx={{ width: '80%', mb: 2 }} />

        {/* User Details / Edit Form */}
        <Box sx={{ width: '100%' }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'medium', color: theme.palette.text.secondary }}>
            Personal Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {isEditing ? (
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={editedData.name}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
              ) : (
                <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                  <strong>Name:</strong> {userData.name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {isEditing ? (
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={editedData.email}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  type="email"
                />
              ) : (
                <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                  <strong>Email:</strong> {userData.email}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {isEditing ? (
                <TextField
                  fullWidth
                  label="Role"
                  name="role"
                  value={editedData.role}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
              ) : (
                <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                  <strong>Role:</strong> {userData.role}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {isEditing ? (
                <TextField
                  fullWidth
                  label="Organization"
                  name="organization"
                  value={editedData.organization}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
              ) : (
                <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                  <strong>Organization:</strong> {userData.organization}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              {isEditing ? (
                <TextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  value={editedData.bio}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  multiline
                  rows={4}
                />
              ) : (
                <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                  <strong>Bio:</strong> {userData.bio}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>

        {/* Edit/Save/Cancel Buttons */}
        <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end', width: '100%' }}>
          {isEditing ? (
            <>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSave}
              >
                Save
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;