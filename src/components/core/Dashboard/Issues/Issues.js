import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, IconButton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PieChartCard from './components/PieChartCard';
import LineChartCard from './components/LineChartCard';
import NoDataMessage from './components/NoDataMessage';
import ErrorDisplay from './components/errordisplay';
import LoadingIndicator from './components/LoadingIndicator';
import { transformDataForPieChart, transformDataForLineChart } from './components/chartDataTransform';

const IssueChart = ({ onClose }) => {
  const theme = useTheme();
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/data.json'); // Ensure this path is correct
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setRawData(jsonData || []);
      } catch (e) {
        console.error("Failed to fetch chart data:", e);
        setError(e.message || 'An unknown error occurred while fetching data.');
        setRawData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const pieData = useMemo(() =>transformDataForPieChart(rawData), [rawData]);
  const lineData = useMemo(() => transformDataForLineChart(rawData), [rawData]);

  if (loading) {
    return <LoadingIndicator message="Loading issues overview..." />;
  }

  if (error) {
    return <ErrorDisplay errorMessage={error} />;
  }

  if (rawData.length === 0) {
    return <NoDataMessage message="No project data available to display charts." />;
  }

  if (pieData.length === 0 && lineData.length === 0) {
    return <NoDataMessage message="Project data loaded, but no suitable data to display charts (e.g., no issues found or no relevant statuses/dates)." />;
  }

  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
      maxWidth: 1000,
      mx: 'auto',
      p: { xs: 1, sm: 2 },
      pb: { xs: 2, sm: 4 },
      mt: 2,
    }}>
      {onClose && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          size="small"
          sx={{ position: 'absolute', top: { xs: 8, sm: 12 }, right: { xs: 8, sm: 12 }, zIndex: 10, color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}

      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        align="left"
        sx={{
          mb: 4,
          color: theme.palette.text.primary,
          fontWeight: 'medium',
          pr: onClose ? { xs: 5, sm: 6 } : 0 // Add padding to right if close button is present
        }}
      >
        📊 Issues Overview (All Projects)
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 3, md: 4 } }}>
        <PieChartCard data={pieData} />
        <LineChartCard data={lineData} />
      </Box>
    </Box>
  );
};

IssueChart.propTypes = {
  onClose: PropTypes.func,
};

export default IssueChart;