import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";

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
      });
  }, []);

  return (
    <div className="w-full max-w-4xl p-4">
      <h2 className="text-3xl font-bold mb-8 text-left px-4">Project List</h2>
      <ul className="space-y-6">
        {projects.map(({ id, name, completion }) => (
          <li
            key={id}
            className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition"
          >
            <Link to={`/dashboard/project/${id}`} className="block">
              <div className="flex justify-between mb-3">
                <span className="text-lg font-medium text-gray-800">
                  {name}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
