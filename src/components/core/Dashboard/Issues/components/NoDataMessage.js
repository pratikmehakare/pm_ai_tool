import PropTypes from 'prop-types';
import { Box, Alert } from '@mui/material';

const NoDataMessage = ({ message, severity }) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 1000, mx: 'auto', p: { xs: 2, sm: 4 }, mt: 2 }}>
      <Alert severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Box>
  );
};

NoDataMessage.propTypes = {
  message: PropTypes.string.isRequired,
  severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
};

NoDataMessage.defaultProps = {
  severity: 'info',
};

export default NoDataMessage;