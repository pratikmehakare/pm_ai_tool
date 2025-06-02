import React from 'react';
import { Paper, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ListAlt as ListAltIcon } from '@mui/icons-material';
import { CHART_COLORS, ChartCustomTooltip } from './ChartUtils'; // Adjust path

export const StatusDistributionChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 2.5, height: '100%', textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <ListAltIcon sx={{mr:1, color: 'primary.main'}} />Issue Status Distribution
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 5 }}>No status data available.</Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 2.5, height: '100%' }}>
      <Typography variant="h6" gutterBottom sx={{display: 'flex', alignItems: 'center'}}>
        <ListAltIcon sx={{mr:1, color: 'primary.main'}} />Issue Status Distribution
      </Typography>
      <ResponsiveContainer width={400} height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<ChartCustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
};
// Add PropTypes
