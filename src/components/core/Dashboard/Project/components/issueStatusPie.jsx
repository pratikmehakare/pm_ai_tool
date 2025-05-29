import React from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

const IssueStatusPieChart = ({ issues, projectId, navigate }) => {
    if (!issues || issues.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow mb-8 text-center text-gray-500">
                No issue status data available.
            </div>
        );
    }

    const statusData = issues.reduce((acc, issue) => {
        const status = issue.Status || 'No Status';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});

    const pieChartData = Object.entries(statusData).map(([name, value]) => ({ name, value }));

    const COLORS = ['#0088FE', '#FFBB28', '#00C49F', '#FF8042', '#AF19FF', '#FF19A0', '#82ca9d', '#ffc658'];

    const handlePieClick = (data, index) => {
        navigate(`/dashboard/projects/${projectId}/issues-table?status=${encodeURIComponent(data.name)}`);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Issues by Status</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        onClick={handlePieClick}
                    >
                        {
                            pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))
                        }
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-600 mt-2">Click on a pie slice to see all issues with that status in a table.</p>
        </div>
    );
};

export default IssueStatusPieChart;