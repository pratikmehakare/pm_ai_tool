import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Paper,
} from "@mui/material";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        const transformedProjects = data.map((project) => {
          const totalIssues = project.Issues.length;
          const doneIssues = project.Issues.filter(
            (issue) => issue.Status === "Done"
          ).length;

          const completion =
            totalIssues > 0 ? Math.round((doneIssues / totalIssues) * 100) : 0;

          return {
            id: project.id,
            name: project["Project Name"],
            completion,
          };
        });

        setProjects(transformedProjects);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  return (
    <Box sx={{ width: "100%", maxWidth: 800, mx: "auto", p: 2 }}>
      {/* mx: "auto" centers the Box */}
<Typography
  variant="h4"
  component="h2"
  gutterBottom
  align="left"
  sx={{
    background: "linear-gradient(90deg, #3b82f6 0%, #ec4899 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: 'bold',
  }}
>
  Project List
</Typography>

      <List sx={{ pt: 0 }}>
        {projects.map(({ id, name, completion }) => (
          <Paper
            key={id}
            elevation={2}
            sx={{
              mb: 3,
              borderRadius: 2,
              overflow: "hidden",
              backgroundColor: "#001F3F",  // <-- Dark navy blue background
              transition:
                "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 6,
              },
            }}
          >
            <ListItem
              component={Link} // Use ListItem as a Link
              to={`/dashboard/project/${id}`}
              sx={{
                py: 2,
                px: 3,
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="h6" component="h3" color="white">
                    {name}
                  </Typography>
                }
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <Typography
                      variant="body2"
                      color="rgba(255, 255, 255, 0.7)" // lighter text for contrast
                      sx={{ mb: 0.5 }}
                    >
                      Completion: {completion}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={completion}
                      sx={{
                        height: 8,
                        borderRadius: 5,
                        "& .MuiLinearProgress-bar": {
                          background:
                            "linear-gradient(90deg, #3b82f6 0%, #ec4899 100%)",
                        },
                        backgroundColor: "rgba(255, 255, 255, 0.1)", // subtle track color
                      }}
                    />
                  </Box>
                }
              />
            </ListItem>
          </Paper>
        ))}
      </List>
      {projects.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mt: 4 }}
        >
          No projects found.
        </Typography>
      )}
    </Box>
  );
};

export default ProjectList;
