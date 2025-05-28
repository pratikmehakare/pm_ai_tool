import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, LineChart, Line, CartesianGrid,
  XAxis, YAxis, 
} from 'recharts';
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const COLORS = [
  '#2563eb', 
  '#10b981', 
  '#f59e0b', 
  '#ef4444',
  '#a855f7', 
  '#06b6d4', 
  '#f43f5e', 
  '#8b5cf6', 
  '#14b8a6', 
  '#eab308',
];


// Bar chart data: current counts by status
const pieData = [
  { name: 'Open', value: 14 },
  { name: 'In Progress', value: 8 },
  { name: 'Closed', value: 21 },
  { name: 'Blocked', value: 5 },
  { name: 'Review', value: 4 },
];

// Line chart data: historical trend
const lineData = [
  { day: 'Mon', Open: 5, Closed: 2, 'In Progress': 3 },
  { day: 'Tue', Open: 8, Closed: 4, 'In Progress': 2 },
  { day: 'Wed', Open: 10, Closed: 5, 'In Progress': 4 },
  { day: 'Thu', Open: 12, Closed: 10, 'In Progress': 6 },
  { day: 'Fri', Open: 14, Closed: 21, 'In Progress': 8 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border shadow-md px-3 py-2 rounded text-sm">
        {payload.map((data, i) => (
          <div key={i}>
            <strong className="text-gray-700">{data.name || data.dataKey}</strong>: {data.value}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const IssueChart = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">📊Issues</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
      <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Issue Status Overview</h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={120}
            dataKey="value"
          >
            {pieData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>

        {/* Line Chart */}
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <ArrowTrendingUpIcon className="w-6 h-6 text-green-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-700">Issue Trend (Week)</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="Open" stroke="#2563eb" strokeWidth={2} />
              <Line type="monotone" dataKey="In Progress" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="Closed" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default IssueChart;
