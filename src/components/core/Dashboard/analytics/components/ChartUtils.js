import React from 'react';
import { Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Ensure correct import for useTheme

export const CHART_COLORS = [
  '#2563eb', '#f59e0b', '#10b981', '#ef4444', '#a855f7', '#06b6d4',
  '#f43f5e', '#8b5cf6', '#14b8a6', '#eab308', '#6366f1', '#ec4899'
];

export const ChartCustomTooltip = ({ active, payload, label }) => {
  const theme = useTheme();
  if (active && payload && payload.length) {
    return (
      <Paper elevation={3} sx={{ p: 1.5, borderRadius: 1, backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
        <Typography variant="subtitle2" sx={{ color: theme.palette.text.primary, mb: 0.5 }}>{label}</Typography>
        {payload.map((data, i) => (
          <Typography key={i} variant="body2" sx={{ color: theme.palette.text.primary }}>
            <strong style={{ color: data.color || data.fill || theme.palette.text.secondary }}>
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

// Consider adding PropTypes if not using TypeScript
// ChartCustomTooltip.propTypes = {
//   active: PropTypes.bool,
//   payload: PropTypes.array,
//   label: PropTypes.string,
// };