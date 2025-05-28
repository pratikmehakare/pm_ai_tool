import React from "react";
import { Link } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";

const projects = [
  { id: 1, name: "Project Alpha", completion: 75 },
  { id: 2, name: "Project Beta", completion: 40 },
  { id: 3, name: "Project Gamma", completion: 90 },
  { id: 4, name: "Project Delta", completion: 20 },
];

const ProjectList = () => {
  return (
    <div className="w-full max-w-4xl p-4">
      <h2 className="text-3xl font-bold mb-8 text-left px-4">Project List</h2>
      <ul className="space-y-6">
        {projects.map(({ id, name, completion }) => (
          <li key={id} className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition">
            <Link to={`/dashboard/project/${id}`} className="block">
              <div className="flex justify-between mb-3">
                <span className="text-lg font-medium text-gray-800">{name}</span>
                <span className="text-gray-600">{completion}%</span>
              </div>
              <ProgressBar
                completed={completion}
                height="20px"
                bgColor="#2563eb"
                baseBgColor="#e5e7eb"
                labelAlignment="right"
                labelColor="#374151"
                borderRadius="8px"
                transitionDuration="500ms"
                isLabelVisible={false}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
