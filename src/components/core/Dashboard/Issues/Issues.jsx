import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, LineChart, Line, CartesianGrid,
  XAxis, YAxis,
} from 'recharts';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import {
  Box,
  Typography,
  Paper, 
  useTheme, 
} from '@mui/material';

// Use theme colors for chart consistency
const COLORS = [
  '#2563eb', 
  '#f59e0b', 
  '#10b981',
  '#ef4444',
  '#a855f7', 
  '#06b6d4', 
  '#f43f5e', 
  '#8b5cf6', 
  '#14b8a6', 
  '#eab308',
];


const pieData = [
  { name: 'Open', value: 14 },
  { name: 'In Progress', value: 8 },
  { name: 'Closed', value: 21 },
  { name: 'Blocked', value: 5 },
  { name: 'Review', value: 4 },
];


const lineData = [
  { day: 'Mon', Open: 5, Closed: 2, 'In Progress': 3 },
  { day: 'Tue', Open: 8, Closed: 4, 'In Progress': 2 },
  { day: 'Wed', Open: 10, Closed: 5, 'In Progress': 4 },
  { day: 'Thu', Open: 12, Closed: 10, 'In Progress': 6 },
  { day: 'Fri', Open: 14, Closed: 21, 'In Progress': 8 },
];


const CustomTooltip = ({ active, payload }) => {
  const theme = useTheme();
  if (active && payload && payload.length) {
    return (
      <Paper elevation={3} sx={{ p: 1.5, borderRadius: 1, backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
        {payload.map((data, i) => (
          <Typography key={i} variant="body2" sx={{ color: theme.palette.text.primary }}>
            <strong style={{ color: data.color || theme.palette.text.secondary }}>
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

const IssueChart = () => {
  const theme = useTheme(); // Access the theme object for consistent styling

  return (
    <Box sx={{ width: '100%', maxWidth: 1000, mx: 'auto', p: 2, pb: 4, mt: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom align="left" sx={{ mb: 4, color: theme.palette.text.primary, fontWeight: 'medium' }}>
        📊 Issues Overview
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        {/* Pie Chart Card (Issue Status Overview) */}
        <Paper elevation={4} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h6" component="h3" gutterBottom sx={{ mb: 3, color: theme.palette.text.primary, fontWeight: 'medium' }}>
            Issue Status Overview
          </Typography>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={120}
                dataKey="value"
              >
                {pieData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </Paper>

        {/* Line Chart Card (Issue Trend) */}
        <Paper elevation={4} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <TrendingUpIcon sx={{ fontSize: '28px', color: theme.palette.success.main, mr: 1 }} />
            <Typography variant="h6" component="h3" sx={{ color: theme.palette.text.primary, fontWeight: 'medium' }}>
              Issue Trend (Week)
            </Typography>
          </Box>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} /> {/* Use theme divider color */}
              <XAxis dataKey="day" stroke={theme.palette.text.secondary} />
              <YAxis allowDecimals={false} stroke={theme.palette.text.secondary} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="Open" stroke={COLORS[0]} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="In Progress" stroke={COLORS[2]} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Closed" stroke={COLORS[1]} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default IssueChart;