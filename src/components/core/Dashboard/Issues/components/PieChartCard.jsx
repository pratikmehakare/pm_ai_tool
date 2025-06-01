import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, useTheme, useMediaQuery } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CustomTooltip from './CustomTooltip';
import { COLORS } from './constants';

const PieChartCard = ({ data }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  if (!data || data.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: { xs: 200, md: 250 } }}>
        <Typography variant="body1" color="text.secondary">No data for Issue Status Distribution.</Typography>
      </Paper>
    );
  }

  const chartHeight = isSmallScreen ? 280 : 320; 
  const outerRadius = isSmallScreen ? 75 : 105; 
  const baseLabelFontSize = isSmallScreen ? '0.7rem' : '0.75rem'; 

  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius: pieOuterRadius, percent, name, value }) => {
    const RADIAN = Math.PI / 180;
    const isVerySmallSlice = percent < 0.06;
    const isModeratelySmallSlice = percent < 0.12 && !isVerySmallSlice;

    let labelText;
    let currentRadiusFactor;
    let currentFontSize = baseLabelFontSize;
    let textAnchorOverride = null;

    if (isSmallScreen) {
      currentRadiusFactor = 1.12;
      if (isVerySmallSlice) {
        labelText = `${(percent * 100).toFixed(0)}%`;
        currentRadiusFactor = 1.22;
        currentFontSize = '0.6rem';
      } else if (isModeratelySmallSlice) {
        labelText = `${name.substring(0, 6)}: ${(percent * 100).toFixed(0)}%`;
        currentFontSize = '0.65rem';
      } else {
        labelText = `${name.substring(0, 8)}: ${(percent * 100).toFixed(0)}%`;
      }
    } else { 
      currentRadiusFactor = 1.08;
      if (isVerySmallSlice) {
        labelText = `${name.substring(0,15)}: ${(percent * 100).toFixed(0)}%`;
        currentFontSize = '0.65rem';
        currentRadiusFactor = 1.12;
        
        const angleDegrees = (midAngle + 360) % 360;
        if (angleDegrees < 15 || angleDegrees > 345 || (angleDegrees > 165 && angleDegrees < 195)) {
          
            if (cx + (pieOuterRadius * currentRadiusFactor * Math.cos(-midAngle * RADIAN)) > cx) { // right side
      
            } else { 
            
            }
        }


      } else if (isModeratelySmallSlice) {
        labelText = `${name}: ${(percent * 100).toFixed(0)}%`;
        currentFontSize = '0.7rem';
      } else {
        labelText = `${name}: ${value} (${(percent * 100).toFixed(0)}%)`;
      }
    }

    const radius = pieOuterRadius * currentRadiusFactor;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={theme.palette.text.primary}
        textAnchor={textAnchorOverride || (x > cx ? 'start' : 'end')}
        dominantBaseline="central"
        style={{ fontSize: currentFontSize, fontWeight: 400, pointerEvents: 'none' }}
      >
        {labelText}
      </text>
    );
  };

  return (
    <Paper elevation={4} sx={{ p: { xs: 1, sm: 2, md: 3 }, borderRadius: 2, overflow: 'hidden' }}>
      <Typography
        variant={isSmallScreen ? "subtitle1" : "h6"}
        component="h3"
        gutterBottom
        sx={{
          mb: { xs: 2, md: 2.5 }, 
          color: theme.palette.text.primary,
          fontWeight: 'medium',
          textAlign: 'center'
        }}
      >
        Issue Status Distribution
      </Typography>
      <ResponsiveContainer width="100%" height={chartHeight}>
        <PieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={outerRadius}
            dataKey="value"
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            wrapperStyle={{
              paddingTop: isSmallScreen ? 20 : 30, 
              fontSize: isSmallScreen ? '0.75rem' : '0.8rem',
              paddingLeft: 10,
              paddingRight: 10,
            }}
            formatter={(value) => <span style={{ color: theme.palette.text.secondary }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
};

PieChartCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default PieChartCard;