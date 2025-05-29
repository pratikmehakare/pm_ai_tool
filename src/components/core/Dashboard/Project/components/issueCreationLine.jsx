import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const IssueCreationLineChart = ({ issues, projectId, navigate }) => {
    if (!issues || issues.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow mb-8 text-center text-gray-500">
                No issue creation data available.
            </div>
        );
    }

    const dailyCounts = issues.reduce((acc, issue) => {
        const dateString = issue["Created Date"] || issue.Created || issue.created || '';

        if (dateString) {
            const dateObj = new Date(dateString);
            if (!isNaN(dateObj.getTime())) {
                const dateKey = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD
                acc[dateKey] = (acc[dateKey] || 0) + 1;
            } else {
                console.warn(`IssueCreationLineChart: Invalid date format for issue (ID/Key: ${issue.id || issue["Issue Key"] || 'N/A'}): "${dateString}"`);
            }
        } else {
            console.warn(`IssueCreationLineChart: Missing "Created Date" or other common date field for issue (ID/Key: ${issue.id || issue["Issue Key"] || 'N/A'})`);
        }
        return acc;
    }, {});

    const lineChartData = Object.entries(dailyCounts)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    if (lineChartData.length < 2) {
         console.warn("IssueCreationLineChart: Not enough data points to draw a meaningful line chart (less than 2 points). Data:", lineChartData);
        return (
            <div className="bg-white p-6 rounded-lg shadow mb-8 text-center text-gray-500">
                Not enough data points to display creation trend.
            </div>
        );
    }

    const handleLineClick = (data) => {
        if (data && data.activePayload && data.activePayload.length > 0) {
            const clickedDate = data.activePayload[0].payload.date;
            navigate(`/dashboard/projects/${projectId}/issues-table?createdDate=${encodeURIComponent(clickedDate)}`);
        } else {
            navigate(`/dashboard/projects/${projectId}/issues-table`);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Issue Creation Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={lineChartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    onClick={handleLineClick}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} domain={[0, 'dataMax']} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-600 mt-2">Click on the chart to see issues created on that date in a table.</p>
        </div>
    );
};

export default IssueCreationLineChart;