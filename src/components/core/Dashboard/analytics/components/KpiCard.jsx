import React from 'react';
import { Paper, Box, Typography } from '@mui/material';


const KpiCard = ({ title, value, icon, color = 'primary.main' }) => (
  <Paper elevation={3} sx={{ p: 2.5, display: 'flex', alignItems: 'center', height: '100%' }}>
    <Box sx={{ backgroundColor: color, borderRadius: '50%', p: 1.5, mr: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {React.cloneElement(icon, { sx: { color: 'common.white', fontSize: '2rem' } })}
    </Box>
    <Box>
      <Typography variant="h3" component="p" sx={{ fontWeight: 'bold' }}>
        {value}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {title}
      </Typography>
    </Box>
  </Paper>
);
// create a different schema folder 
// KpiCard.propTypes = {
//   title: PropTypes.string.isRequired,
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//   icon: PropTypes.element.isRequired,
//   color: PropTypes.string,
// };

export default KpiCard;