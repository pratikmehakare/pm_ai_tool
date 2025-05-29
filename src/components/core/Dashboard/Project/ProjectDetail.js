import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        // Find project by id (id is string in JSON, parseInt for safety)
        const foundProject = data.find((p) => p.id === id || p.id === parseInt(id));
        setProject(foundProject || null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!project)
    return <div className="p-4 text-red-500">Project not found.</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-lg font-mono">
      <Link to="/dashboard/projects" className="flex items-center text-[#2563eb] mb-4">
        <ArrowBackIcon fontSize="small" />
        <span className="ml-1">Project List</span>
      </Link>

      <h2 className="text-2xl font-bold mb-6">{project["Project Name"]}</h2>

      <h3 className="text-xl font-semibold mb-4">Issues</h3>

      <div className="space-y-6">
        {project.Issues.map((issue) => (
          <div
            key={issue.id}
            className="border rounded-lg p-4 shadow-sm bg-gray-50"
          >
            <h4 className="font-semibold text-lg mb-1">
              {issue["Issue Key"]} - {issue.Summary}
            </h4>
            <p>
              <strong>Type:</strong> {issue["Issue Type"]} |{" "}
              <strong>Status:</strong> {issue.Status} |{" "}
              <strong>Priority:</strong> {issue.Priority}
            </p>
            <p>
              <strong>Assignee:</strong> {issue.Assignee} |{" "}
              <strong>Reporter:</strong> {issue.Reporter}
            </p>
            <p>
              <strong>Labels:</strong> {issue.Labels}
            </p>
            <p className="mt-2">
              <strong>Description:</strong> {issue.Description}
            </p>
            <p className="mt-2">
              <strong>Comments:</strong> {issue.Comments}
            </p>
            <p className="mt-2">
              <strong>Attachments:</strong> {issue.Attachments}
            </p>
            <p className="mt-2">
              <strong>Created Date:</strong> {issue["Created Date"]} |{" "}
              <strong>Updated Date:</strong> {issue["Updated Date"]} |{" "}
              <strong>Due Date:</strong> {issue["Due Date"]}
            </p>
            <p>
              <strong>Linked Issues:</strong> {issue["Linked Issues"]}
            </p>
            <p>
              <strong>Sprint:</strong> {issue.Sprint} |{" "}
              <strong>Story Points:</strong> {issue["Story Points"]} |{" "}
              <strong>Components:</strong> {issue.Components}
            </p>
            <p>
              <strong>Fix Version(s):</strong> {issue["Fix Version(s)"]} |{" "}
              <strong>Resolution:</strong> {issue.Resolution} |{" "}
              <strong>Delay (Days):</strong> {issue["Delay (Days)"]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetail;
