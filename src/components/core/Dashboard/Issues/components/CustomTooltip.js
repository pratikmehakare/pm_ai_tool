import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, useTheme } from '@mui/material';

const CustomTooltip = ({ active, payload }) => {
  const theme = useTheme();
  if (active && payload && payload.length) {
    return (
      <Paper elevation={3} sx={{ p: 1.5, borderRadius: 1, backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
        {payload.map((data, i) => (
          <Typography key={i} variant="body2" sx={{ color: theme.palette.text.primary }}>
            <strong style={{ color: data.color || data.payload?.fill || theme.palette.text.secondary }}>
              {data.name || data.dataKey}
            </strong>
            : {data.value}
          </Typography>
        ))}
      </Paper>
    );
  }
  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
};

export default CustomTooltip;