import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IssueStatusPieChart from './components/issueStatusPie'
import IssueCreationLineChart from './components/issueCreationLine'

const ProjectDetail = () => {
const { id } = useParams();
const navigate = useNavigate();
const [project, setProject] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
const loadData = async () => {
try {
if (window.fs && window.fs.readFile) {
try {
const fileContent = await window.fs.readFile('data.json', { encoding: 'utf8' });
const data = JSON.parse(fileContent);

const foundProject = data.find((p) =>
String(p.id) === String(id) ||
(p.id && String(p.id) === String(id))
);

setProject(foundProject || null);
} catch (fileError) {
console.warn('File reading failed, falling back to fetch:', fileError);
const response = await fetch("/data.json");
if (!response.ok) throw new Error("Failed to fetch data");
const data = await response.json();

const foundProject = data.find((p) =>
String(p.id) === String(id) ||
(p.id && String(p.id) === String(id))
);

setProject(foundProject || null);
}
} else {
const response = await fetch("/data.json");
if (!response.ok) throw new Error("Failed to fetch data");
const data = await response.json();

const foundProject = data.find((p) =>
String(p.id) === String(id) ||
(p.id && String(p.id) === String(id))
);

setProject(foundProject || null);
}
} catch (err) {
setError(err.message);
} finally {
setLoading(false);
}
};

loadData();
}, [id]);



const getProjectName = (project) => {
return project["Project Name"] ||
project["project_name"] ||
project.name ||
project.title ||
`Project ${project.id}` ||
"Unnamed Project";
};

const getIssues = (project) => {
return project.Issues ||
project.issues ||
project.Items ||
project.items ||
(Array.isArray(project.data) ? project.data : []);
};

if (loading) return (
<div className="flex items-center justify-center min-h-64">
<div className="text-lg">Loading project details...</div>
</div>
); 

if (error) return (
<div className="p-6 max-w-5xl mx-auto">
<div className="bg-red-50 border border-red-200 rounded-lg p-4">
<div className="text-red-800 font-medium">Error loading project data</div>
<div className="text-red-600 mt-1">{error}</div>
</div>
</div>
);

if (!project) return (
<div className="p-6 max-w-5xl mx-auto">
<Link to="/dashboard/projects" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
<ArrowBackIcon fontSize="small" />
<span className="ml-1">Back to Project List</span>
</Link>
<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
<div className="text-yellow-800 font-medium">Project not found</div>
<div className="text-yellow-600 mt-1">No project found with ID: {id}</div>
</div>
</div>
);

const issues = getIssues(project);
const projectName = getProjectName(project);

return (
<div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg font-mono">
<Link
to="/dashboard/projects"
className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
>
<ArrowBackIcon fontSize="small" />
<span className="ml-1">Back to Project List</span>
</Link>

<div className="mb-8">
<h1 className="text-3xl font-bold text-gray-900 mb-2">{projectName}</h1>
<div className="text-sm text-gray-600">Project ID: {project.id}</div>
</div>

{/* Charts Section */}
{issues && issues.length > 0 && (
<div className="mb-8">
<h2 className="text-2xl font-bold mb-6 text-gray-900">Project Insights</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
{/* CHART COMPONENTS ARE NOW IMPORTED AND USED HERE */}
<IssueStatusPieChart issues={issues} projectId={id} navigate={navigate} />
<IssueCreationLineChart issues={issues} projectId={id} navigate={navigate} />
</div>
</div>
)}

{/* Issues Section - Simplified or moved to a separate page */}
{issues && issues.length > 0 ? (
<div>
<h2 className="text-2xl font-bold mb-6 text-gray-900">
All Issues ({issues.length})
</h2>
<p className="text-gray-600 mb-4">
For a detailed table view of all issues,
<Link
to={`/dashboard/projects/${id}/issues-table`}
className="text-blue-600 hover:text-blue-800 ml-1 font-semibold"
>
click here
</Link>.
</p>
</div>
) : (
<div className="text-center py-12">
<div className="text-gray-500 text-lg">No issues found for this project</div>
</div>
)}
</div>
);
};

export default ProjectDetail;