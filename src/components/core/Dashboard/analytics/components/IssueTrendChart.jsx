import React from 'react';
import { Paper, Typography, useTheme } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// You might want an icon for this chart too, e.g., TrendingUpIcon
import { ChartCustomTooltip } from './ChartUtils'; // Adjust path

export const IssueTrendChart = ({ data }) => {
  const theme = useTheme();

  if (!data || data.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 2.5, height: '100%', textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            Issue Creation vs Resolution Trend (Monthly)
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 5 }}>No trend data available.</Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 2.5, height: '100%' }}>
      <Typography variant="h6" gutterBottom>Issue Creation vs Resolution Trend (Monthly)</Typography>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false}/>
          <Tooltip content={<ChartCustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="created" name="Issues Created" stroke={theme.palette.primary.main} strokeWidth={2} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="resolved" name="Issues Resolved" stroke={theme.palette.success.main} strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};
// Add PropTypes
