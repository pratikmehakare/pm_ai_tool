// components/tables/TableCellRenderer.jsx
import React from 'react';
import { Typography, Box, Chip, Tooltip } from '@mui/material';

const TableCellRenderer = ({ columnKey, value }) => {
  if (value === null || value === undefined || value === '') {
    return <Typography variant="body2" color="text.secondary" fontStyle="italic">Not specified</Typography>;
  }
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(', ') : <Typography variant="body2" color="text.secondary" fontStyle="italic">None</Typography>;
  }
  if (typeof value === 'object') {
    return <Typography variant="body2">{JSON.stringify(value)}</Typography>;
  }

  // Specific rendering based on columnKey (header name)
  switch (columnKey) {
    case 'Status':
      let statusColor = 'default';
      switch (value.toLowerCase()) {
        case 'in progress':
          statusColor = 'info';
          break;
        case 'done':
        case 'closed':
        case 'fixed':
          statusColor = 'success';
          break;
        case 'to do':
          statusColor = 'warning';
          break;
        case 'unresolved':
          statusColor = 'error';
          break;
        default:
          statusColor = 'default';
      }
      return <Chip label={value} color={statusColor} size="small" />;

    case 'Priority':
      let priorityColor = 'default';
      switch (value.toLowerCase()) {
        case 'high':
        case 'critical':
          priorityColor = 'error';
          break;
        case 'medium':
          priorityColor = 'warning';
          break;
        case 'low':
          priorityColor = 'success';
          break;
        default:
          priorityColor = 'default';
      }
      return <Chip label={value} color={priorityColor} size="small" />;

    case 'Labels':
      if (typeof value === 'string') {
        const labels = value.split(',').map(label => label.trim()).filter(label => label);
        return (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {labels.map((label, i) => (
              <Chip key={i} label={label} size="small" variant="outlined" />
            ))}
          </Box>
        );
      }
      break; // Fall through to default if not string

    case 'Linked Issues':
      if (typeof value === 'string') {
        const linkedIssues = value.split(',').map(li => li.trim()).filter(li => li);
        return (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {linkedIssues.map((li, i) => (
              <Chip key={i} label={li} size="small" variant="outlined" color="primary" />
            ))}
          </Box>
        );
      }
      break; // Fall through to default if not string

    case 'Description':
      if (typeof value === 'string' && value.length > 100) {
        return <Tooltip title={value} placement="top-start"><Typography variant="body2">{value.substring(0, 97)}...</Typography></Tooltip>;
      }
      break; // Fall through to default

    case 'Created Date':
    case 'Updated Date':
    case 'Due Date':
      if (typeof value === 'string') {
        try {
          const date = new Date(value);
          if (!isNaN(date.getTime())) {
            return <Typography variant="body2">{date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</Typography>;
          }
        } catch (e) {
          // Fallback to original string if date parsing fails
        }
      }
      break; // Fall through to default

    default:
      // No special rendering, just display as text
      break;
  }

  return <Typography variant="body2">{String(value)}</Typography>;
};

export default TableCellRenderer;