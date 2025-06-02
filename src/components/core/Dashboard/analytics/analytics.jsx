import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';

import {
  calculateKPIs,
  transformDataForPriorityChart,
  transformDataForTypeChart,
  transformDataForAssigneeChart,
  transformDataForStatusPieChart,
  transformDataForCreatedResolvedTrend
} from './components/analyticsTransformations'; // Ensure this path is correct

// Make sure these paths correctly point to where the component files are.
// For example, if they are in './components/charts/', the path should reflect that.
import { KpiSummarySection } from './components/KpiSummary'; // Or './components/KpiSummarySection' if that's the filename
import { StatusDistributionChart } from './components/StatusDistributionChart';
import { PriorityIssuesChart } from './components/PriorityIssuesChart';
import { TypeIssuesChart } from './components/TypeIssueChart'; // Assuming filename is TypeIssueChart.jsx
import { AssigneeWorkLoadChart } from './components/AssigneeWorkLoadChart';
import { IssueTrendChart } from './components/IssueTrendChart';


const AnalyticsPage = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setProjectsData(jsonData || []);
      } catch (e) {
        console.error("Failed to fetch analytics data:", e);
        setError(e.message || 'An unknown error occurred.');
        setProjectsData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const kpis = useMemo(() => calculateKPIs(projectsData), [projectsData]);
  const priorityData = useMemo(() => transformDataForPriorityChart(projectsData), [projectsData]);
  const typeData = useMemo(() => transformDataForTypeChart(projectsData), [projectsData]);
  const assigneeData = useMemo(() => transformDataForAssigneeChart(projectsData), [projectsData]);
  const statusPieData = useMemo(() => transformDataForStatusPieChart(projectsData), [projectsData]);
  const createdResolvedTrendData = useMemo(() => transformDataForCreatedResolvedTrend(projectsData), [projectsData]);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}><CircularProgress /><Typography sx={{ml:2}}>Loading Analytics...</Typography></Box>;
  }
  if (error) {
    return <Box sx={{ p: 3 }}><Alert severity="error">Failed to load analytics data: {error}</Alert></Box>;
  }
  if (projectsData.length === 0 && !loading) {
    return <Box sx={{ p: 3 }}><Alert severity="info">No project data found to generate analytics.</Alert></Box>;
  }

  return (
    <Box sx={{ flexGrow: 1, p: {xs: 2, md: 3} }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Project Analytics Dashboard
      </Typography>

      {/* KPI Section */}
      <KpiSummarySection kpis={kpis} />

      {/* Charts Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={6}> 
          <StatusDistributionChart data={statusPieData} />
        </Grid>
        <Grid item xs={12} md={12} lg={12}> 
          <PriorityIssuesChart data={priorityData} />
        </Grid>
        <Grid item xs={12} md={12} lg={12}> 
          <TypeIssuesChart data={typeData} />
        </Grid>
        <Grid item xs={12} md={6} lg={6}> 
          <AssigneeWorkLoadChart data={assigneeData} topN={10}/>
        </Grid>
        <Grid item xs={12} md={6} lg={12}> 
          <IssueTrendChart data={createdResolvedTrendData} />
        </Grid>
        {/* If you have an odd number of charts, the last one will take lg={6} or you can make it lg={12} */}
        {/* Example: if IssueTrendChart was the last and only one in its 'row' of two:
        <Grid item xs={12} md={6} lg={12}>
          <IssueTrendChart data={createdResolvedTrendData} />
        </Grid>
        */}
      </Grid>
    </Box>
  );
};

export default AnalyticsPage;