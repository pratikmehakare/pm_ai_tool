import React from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingIndicator = ({ message }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', width: '100%' }}>
      <CircularProgress />
      <Typography sx={{ ml: 2 }}>{message}</Typography>
    </Box>
  );
};

LoadingIndicator.propTypes = {
  message: PropTypes.string,
};

LoadingIndicator.defaultProps = {
  message: 'Loading chart data...',
};

export default LoadingIndicator;