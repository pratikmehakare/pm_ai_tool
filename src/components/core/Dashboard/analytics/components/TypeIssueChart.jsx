import React from 'react';
import { Paper, Typography } from '@mui/material';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BugReport as BugReportIcon } from '@mui/icons-material';
import { CHART_COLORS, ChartCustomTooltip } from './ChartUtils'; // Adjust path

export const TypeIssuesChart = ({ data }) => {
  

  if (!data || data.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 2.5, height: '100%', textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <BugReportIcon sx={{mr:1, color: 'warning.dark'}} />Issues by Type
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 5 }}>No issue type data available.</Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 2.5, height: '100%' }}>
      <Typography variant="h6" gutterBottom sx={{display: 'flex', alignItems: 'center'}}>
        <BugReportIcon sx={{mr:1, color: 'warning.dark'}} />Issues by Type
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={80} />
          <Tooltip content={<ChartCustomTooltip />} />
          <Legend />
          <Bar dataKey="Issues" name="No. of Issues">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};
// Add PropTypes
export default TypeIssuesChart