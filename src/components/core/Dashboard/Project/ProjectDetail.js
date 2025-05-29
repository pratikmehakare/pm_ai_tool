import React from "react";
import { useParams, Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// Example project data with team-level details
const projects = [
  {
    id: 1,
    name: "Project Alpha",
    teams: [
      { team: "Frontend", role: "UI Developer", progress: 70, risk: "Low", delay: "2 days" },
      { team: "Backend", role: "API Developer", progress: 45, risk: "Medium", delay: "5 days" },
      { team: "QA", role: "Tester", progress: 90, risk: "Low", delay: "0 days" },
      { team: "DevOps", role: "Engineer", progress: 30, risk: "High", delay: "7 days" },
    ],
  },
  {
    id: 2,
    name: "Project Beta",
    teams: [
      { team: "Frontend", role: "UI Developer", progress: 50, risk: "Medium", delay: "1 day" },
      { team: "Backend", role: "API Developer", progress: 60, risk: "Low", delay: "0 days" },
    ],
  },
  // Add more projects as needed
];

const getColor = (value) => {
  if (value >= 80) return "#22c55e"; // green
  if (value >= 50) return "#eab308"; // yellow
  return "#ef4444"; // red
};

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) return <div className="p-4 text-red-500">Project not found.</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-lg font-mono">
      <Link to="/dashboard/projects" className=" flex text-[#2563eb] mb-4 ">
         <ArrowBackIcon fontSize="small"/> <h2> Project List</h2>
      </Link>
      <h2 className="text-2xl font-bold mb-6">{project.name} - Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {project.teams.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-6 p-4 border rounded-lg shadow-sm bg-gray-50"
          >
            <div className="w-20 h-20">
              <CircularProgressbar
                value={item.progress}
                text={`${item.progress}%`}
                styles={buildStyles({
                  pathColor: getColor(item.progress),
                  textColor: "#374151",
                  trailColor: "#e5e7eb",
                })}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{item.team}</h3>
              <p className="text-sm text-gray-600">Role: {item.role}</p>
              <p className="text-sm text-gray-600">Risk: {item.risk}</p>
              <p className="text-sm text-gray-600">Delay: {item.delay}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetail;
