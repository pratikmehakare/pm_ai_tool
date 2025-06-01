import React from 'react';
import { Paper, Typography } from '@mui/material';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Person as PersonIcon } from '@mui/icons-material';
import { CHART_COLORS, ChartCustomTooltip } from './ChartUtils'; // Adjust path

export const AssigneeWorkLoadChart = ({ data, topN = 10 }) => {
 
  const chartData = data.slice(0, topN);


  if (!chartData || chartData.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 2.5, height: '100%', textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <PersonIcon sx={{mr:1, color: 'success.dark'}} />Workload by Assignee (Top {topN})
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 5 }}>No assignee data available.</Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 2.5, height: '100%' }}>
      <Typography variant="h6" gutterBottom sx={{display: 'flex', alignItems: 'center'}}>
        <PersonIcon sx={{mr:1, color: 'success.dark'}} />Workload by Assignee (Top {topN})
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 70 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} tick={{fontSize: 10}} />
          <YAxis allowDecimals={false} />
          <Tooltip content={<ChartCustomTooltip />} />
          <Bar dataKey="Issues" name="No. of Issues">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};
// Add PropTypes
export default AssigneeWorkLoadChart;