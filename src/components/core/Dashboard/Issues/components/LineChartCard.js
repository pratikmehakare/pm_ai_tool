import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CustomTooltip from './CustomTooltip'; 
import { COLORS } from './constants'; 

const LineChartCard = ({ data }) => {
  const theme = useTheme();

  if (!data || data.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: { xs: 250, md: 300 } }}>
        <Typography variant="body1" color="text.secondary">No data for Issue Creation Trend.</Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <TrendingUpIcon sx={{ fontSize: '28px', color: theme.palette.success.main, mr: 1 }} />
        <Typography variant="h6" component="h3" sx={{ color: theme.palette.text.primary, fontWeight: 'medium' }}>
          Issue Creation Trend by Status
        </Typography>
      </Box>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis
            dataKey="date"
            stroke={theme.palette.text.secondary}
            tick={{ fontSize: 10 }}
            tickFormatter={(tick) => new Date(tick).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          />
          <YAxis allowDecimals={false} stroke={theme.palette.text.secondary} tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: 20 }} />
          <Line type="monotone" dataKey="Open" name="New/Open" stroke={COLORS[0]} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="In Progress" name="In Progress" stroke={COLORS[1]} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="Closed" name="Completed" stroke={COLORS[2]} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="Review" name="In Review" stroke={COLORS[3]} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="Blocked" name="Blocked" stroke={COLORS[4]} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

LineChartCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      Open: PropTypes.number,
      'In Progress': PropTypes.number,
      Closed: PropTypes.number,
      Review: PropTypes.number,
      Blocked: PropTypes.number,
    })
  ).isRequired,
};

export default LineChartCard;