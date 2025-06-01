import React from 'react';
import PropTypes from 'prop-types';
import { Box, Alert } from '@mui/material';

const ErrorDisplay = ({ errorMessage, suggestion }) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 1000, mx: 'auto', p: { xs: 2, sm: 4 }, mt: 2 }}>
      <Alert severity="error" sx={{ width: '100%' }}>
        Failed to load chart data: {errorMessage}
        {suggestion && <><br />{suggestion}</>}
      </Alert>
    </Box>
  );
};

ErrorDisplay.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  suggestion: PropTypes.string,
};

ErrorDisplay.defaultProps = {
    suggestion: "Please ensure data is accessible, and contains valid JSON."
}

export default ErrorDisplay;