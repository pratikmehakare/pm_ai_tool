
export const getAllIssues = (projectsData) => {
  if (!projectsData) return [];
  return projectsData.reduce((acc, project) => {
    if (project.Issues && Array.isArray(project.Issues)) {
      return acc.concat(project.Issues);
    }
    return acc;
  }, []);
};

// 1. KPIs
export const calculateKPIs = (projectsData) => {
  const allIssues = getAllIssues(projectsData);
  const totalProjects = projectsData?.length || 0;
  const totalIssues = allIssues.length;

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's date

  const overdueIssuesCount = allIssues.filter(issue => {
    const dueDate = issue['Due Date'] ? new Date(issue['Due Date']) : null;
    return dueDate && dueDate < today && issue.Status !== 'Done' && issue.Status !== 'Fixed' && issue.Status !== 'Closed';
  }).length;

  const issuesWithDelay = allIssues.filter(issue => issue['Delay (Days)'] && parseInt(issue['Delay (Days)'], 10) > 0);
  const totalDelayDays = issuesWithDelay.reduce((sum, issue) => sum + parseInt(issue['Delay (Days)'], 10), 0);
  const averageDelay = issuesWithDelay.length > 0 ? (totalDelayDays / issuesWithDelay.length).toFixed(1) : 0;

  return { totalProjects, totalIssues, overdueIssuesCount, averageDelay };
};

// 2. Issues by Priority
export const transformDataForPriorityChart = (projectsData) => {
  const allIssues = getAllIssues(projectsData);
  const priorityCounts = allIssues.reduce((acc, issue) => {
    const priority = issue.Priority || 'Unknown';
    acc[priority] = (acc[priority] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(priorityCounts).map(([name, value]) => ({ name, Issues: value }));
};

// 3. Issues by Type
export const transformDataForTypeChart = (projectsData) => {
    const allIssues = getAllIssues(projectsData);
    const typeCounts = allIssues.reduce((acc, issue) => {
      const type = issue['Issue Type'] || 'Unknown';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(typeCounts).map(([name, value]) => ({ name, Issues: value }));
};

// 4. Issues per Assignee
export const transformDataForAssigneeChart = (projectsData) => {
    const allIssues = getAllIssues(projectsData);
    const assigneeCounts = allIssues.reduce((acc, issue) => {
      const assignee = issue.Assignee || 'Unassigned';
      acc[assignee] = (acc[assignee] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(assigneeCounts)
            .map(([name, value]) => ({ name, Issues: value }))
            .sort((a, b) => b.Issues - a.Issues);
};

// 5. Issues by Status
export const transformDataForStatusPieChart = (projectsData) => {
    const allIssues = getAllIssues(projectsData);
    const statusCounts = allIssues.reduce((acc, issue) => {
      const status = issue.Status || 'Unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
};

// 6. Trend: Issues Created vs Resolved
export const transformDataForCreatedResolvedTrend = (projectsData) => {
    const allIssues = getAllIssues(projectsData);
    const monthlyStats = {};

    allIssues.forEach(issue => {
        const createdDateStr = issue['Created Date']; // YYYY-MM-DD
        if (!createdDateStr) return;

        const monthYear = createdDateStr.substring(0, 7); // "YYYY-MM"

        if (!monthlyStats[monthYear]) {
            monthlyStats[monthYear] = { date: monthYear, created: 0, resolved: 0 };
        }
        monthlyStats[monthYear].created += 1;

        if (issue.Resolution === 'Fixed' || issue.Status === 'Done' || issue.Status === 'Closed') {
            // Consider using a resolution date if available and accurate for the trend.
            // This example counts resolution within the creation month for simplicity.
            const resolutionDateStr = issue['Resolution Date'] || issue['Updated Date']; // Assuming these fields might exist
            let resolutionMonthYear = monthYear; // Default to creation month

            if (resolutionDateStr) {
                // Ensure the date string is valid before substring
                if (typeof resolutionDateStr === 'string' && resolutionDateStr.length >= 7) {
                    resolutionMonthYear = resolutionDateStr.substring(0,7);
                }
            }
            // If you decide to track resolved issues by their actual resolution month:
            // if (!monthlyStats[resolutionMonthYear]) {
            //    monthlyStats[resolutionMonthYear] = { date: resolutionMonthYear, created: 0, resolved: 0 };
            // }
            // monthlyStats[resolutionMonthYear].resolved += 1;
            // For this example, sticking to original logic:
            monthlyStats[monthYear].resolved += 1;

        }
    });

    return Object.values(monthlyStats).sort((a, b) => a.date.localeCompare(b.date));
};