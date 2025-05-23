import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const projectData = [
  {
    team: 'Frontend',
    role: 'UI Developer',
    progress: 70,
    risk: 'Low',
    delay: '2 days',
  },
  {
    team: 'Backend',
    role: 'API Developer',
    progress: 45,
    risk: 'Medium',
    delay: '5 days',
  },
  {
    team: 'QA',
    role: 'Tester',
    progress: 90,
    risk: 'Low',
    delay: '0 days',
  },
  {
    team: 'DevOps',
    role: 'Engineer',
    progress: 30,
    risk: 'High',
    delay: '7 days',
  },
];

const getColor = (value) => {
  if (value >= 80) return '#22c55e'; // green
  if (value >= 50) return '#eab308'; // yellow
  return '#ef4444'; // red
};

const Project = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg font-sans">
      <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectData.map((item, index) => (
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
                  textColor: '#374151',
                  trailColor: '#e5e7eb',
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

export default Project;
