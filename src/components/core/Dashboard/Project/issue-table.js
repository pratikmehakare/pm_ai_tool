import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import TableCellRenderer from './components/tableCellRenderer'; 

const IssueTableDetail = () => {
  const { id: projectId } = useParams();
  const location = useLocation();
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterInfo, setFilterInfo] = useState("");

  useEffect(() => {
    const loadIssues = async () => {
      try {
        let data;
        if (window.fs && window.fs.readFile) {
          const fileContent = await window.fs.readFile("data.json", {
            encoding: "utf8",
          });
          data = JSON.parse(fileContent);
        } else {
          const response = await fetch("/data.json");
          if (!response.ok) throw new Error("Failed to fetch data");
          data = await response.json();
        }

        const foundProject = data.find((p) => String(p.id) === String(projectId));
        if (foundProject) {
          const projectIssues = foundProject.Issues || foundProject.issues || foundProject.Items || foundProject.items || (Array.isArray(foundProject.data) ? foundProject.data : []);
          setIssues(projectIssues);
        } else {
          setIssues([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadIssues();
  }, [projectId]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const statusFilter = queryParams.get("status");
    const createdDateFilter = queryParams.get("createdDate");

    let currentFilteredIssues = issues;
    let info = "";

    if (statusFilter) {
      currentFilteredIssues = currentFilteredIssues.filter(
        (issue) => issue.Status && issue.Status === statusFilter
      );
      info = ` (Filtered by Status: "${statusFilter}")`;
    } else if (createdDateFilter) {
      currentFilteredIssues = currentFilteredIssues.filter((issue) => {
        const dateString = issue["Created Date"] || issue.Created || issue.created || "";
        if (dateString) {
          const dateObj = new Date(dateString);
          if (!isNaN(dateObj.getTime())) {
            const issueDate = dateObj.toISOString().split("T")[0];
            return issueDate === createdDateFilter;
          }
        }
        return false;
      });
      info = ` (Filtered by Creation Date: "${createdDateFilter}")`;
    }

    setFilteredIssues(currentFilteredIssues);
    setFilterInfo(info);
  }, [issues, location.search]);


  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '64vh' }}>
        <Typography variant="h6">Loading issues...</Typography>
      </Box>
    );

  if (error)
    return (
      <Box sx={{ p: 3, maxWidth: 'md', mx: 'auto', bgcolor: 'error.50', border: '1px solid', borderColor: 'error.200', borderRadius: 2 }}>
        <Typography variant="h6" color="error.main" fontWeight="medium">Error loading issues data</Typography>
        <Typography variant="body1" color="error.dark" mt={1}>{error}</Typography>
      </Box>
    );

  if (!issues.length && !loading)
    return (
      <Box sx={{ p: 3, maxWidth: 'md', mx: 'auto' }}>
        <Link to={`/dashboard/projects/${projectId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, color: 'primary.main', '&:hover': { color: 'primary.dark' } }}>
            <ArrowBackIcon fontSize="small" />
            <Typography variant="body2" ml={1}>Back to Project Details</Typography>
          </Box>
        </Link>
        <Box sx={{ bgcolor: 'warning.50', border: '1px solid', borderColor: 'warning.200', borderRadius: 2, p: 2 }}>
          <Typography variant="h6" color="warning.main" fontWeight="medium">No issues found</Typography>
          <Typography variant="body1" color="warning.dark" mt={1}>There are no issues for this project.</Typography>
        </Box>
      </Box>
    );

  const allKeys = new Set();
  issues.forEach((issue) => {
    Object.keys(issue).forEach((key) => allKeys.add(key));
  });
  const headers = Array.from(allKeys).sort();

  return (
    <Box sx={{ p: 3, maxWidth: 'lg', mx: 'auto', bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2, fontFamily: 'monospace' }}>
      <Link to={`/dashboard/project/${projectId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, color: 'primary.main', '&:hover': { color: 'primary.dark' } }}>
          <ArrowBackIcon fontSize="small" />
          <Typography variant="body2" ml={1}>Back to Project Details</Typography>
        </Box>
      </Link>

      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'text.primary', fontWeight: 'bold' }}>
        Issues for Project ID: {projectId}
        <Typography component="span" variant="h5" color="text.secondary" ml={1}>{filterInfo}</Typography>
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 4, border: '1px solid #e0e0e0', borderRadius: 1}}>
        {filteredIssues.length > 0 ? (
          <Table stickyHeader aria-label="issues table">
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                {headers.map((key) => (
                  <TableCell
                    key={key}
                    sx={{
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      fontSize: '0.75rem',
                      color: 'text.secondary',
                      whiteSpace: 'nowrap',
                      py: 1.5,
                      px:2,
                      minWidth: (key === 'Summary' || key === 'Description') ? 200 : 100,
                    }}
                  >
                    {key.replace(/[_-]/g, " ")}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredIssues.map((issue, index) => (
                <TableRow key={issue.id || issue["Issue Key"] || index} hover>
                  {headers.map((key) => (
                    <TableCell
                      key={key}
                      sx={{
                        fontSize: '0.875rem',
                        color: 'text.primary',
                        py: 1,
                        px: 2,
                        minWidth: (key === 'Summary' || key === 'Description') ? 200 : 100,
                        maxWidth: (key === 'Summary' || key === 'Description') ? 300 : 'none',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      <TableCellRenderer columnKey={key} value={issue[key]} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
            <Typography variant="body1">No issues found matching the criteria.</Typography>
          </Box>
        )}
      </TableContainer>
    </Box>
  );
};
export default IssueTableDetail;