import React from 'react';
import { Grid, useTheme } from '@mui/material';
import  KpiCard  from './KpiCard';
import {
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  DonutLarge as DonutLargeIcon,
  WarningAmber as WarningAmberIcon,
  HourglassEmpty as HourglassEmptyIcon,
} from '@mui/icons-material';


 export const KpiSummarySection = ({ kpis }) => {
  const theme = useTheme();

  if (!kpis) return null;

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={6} md={3}>
        <KpiCard title="Total Projects" value={kpis.totalProjects} icon={<DonutLargeIcon />} color={theme.palette.info.main} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <KpiCard title="Total Issues" value={kpis.totalIssues} icon={<AssignmentTurnedInIcon />} color={theme.palette.success.main} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <KpiCard title="Overdue Issues" value={kpis.overdueIssuesCount} icon={<WarningAmberIcon />} color={theme.palette.warning.main} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <KpiCard title="Avg. Delay (Days)" value={kpis.averageDelay} icon={<HourglassEmptyIcon />} color={theme.palette.error.main} />
      </Grid>
    </Grid>
  );
};

// Add PropTypes
// KpiSummarySection.propTypes = {
//   kpis: PropTypes.shape({
//     totalProjects: PropTypes.number,
//     totalIssues: PropTypes.number,
//     overdueIssuesCount: PropTypes.number,
//     averageDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   }).isRequired,
// };

