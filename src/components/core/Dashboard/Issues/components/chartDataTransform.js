 export const transformDataForPieChart = (projectsData) => {
  if (!projectsData || projectsData.length === 0) return [];
  const statusCounts = {};

  projectsData.forEach(project => {
    if (project.Issues && Array.isArray(project.Issues)) {
      project.Issues.forEach(issue => {
        const status = issue.Status || 'Unknown';
        statusCounts[status] = (statusCounts[status] || 0) + 1;
      });
    }
  });

  return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
};

 export const transformDataForLineChart = (projectsData) => {
  if (!projectsData || projectsData.length === 0) return [];
  const dailyIssueCreationStats = {};

  projectsData.forEach(project => {
    if (project.Issues && Array.isArray(project.Issues)) {
      project.Issues.forEach(issue => {
        const createdDate = issue['Created Date'];
        if (!createdDate) return;

        if (!dailyIssueCreationStats[createdDate]) {
          dailyIssueCreationStats[createdDate] = { Open: 0, 'In Progress': 0, Closed: 0, Review: 0, Blocked: 0, ToDo: 0 };
        }

        switch (issue.Status) {
          case 'To Do':
            dailyIssueCreationStats[createdDate].ToDo = (dailyIssueCreationStats[createdDate].ToDo || 0) + 1;
            break;
          case 'In Progress':
            dailyIssueCreationStats[createdDate]['In Progress'] = (dailyIssueCreationStats[createdDate]['In Progress'] || 0) + 1;
            break;
          case 'Done':
          case 'Fixed':
            dailyIssueCreationStats[createdDate].Closed = (dailyIssueCreationStats[createdDate].Closed || 0) + 1;
            break;
          case 'Review':
            dailyIssueCreationStats[createdDate].Review = (dailyIssueCreationStats[createdDate].Review || 0) + 1;
            break;
          case 'Blocked':
            dailyIssueCreationStats[createdDate].Blocked = (dailyIssueCreationStats[createdDate].Blocked || 0) + 1;
            break;
          case 'Open':
            dailyIssueCreationStats[createdDate].Open = (dailyIssueCreationStats[createdDate].Open || 0) + 1;
            break;
          default:
            break;
        }
      });
    }
  });

  return Object.entries(dailyIssueCreationStats)
    .map(([date, counts]) => ({
      date,
      Open: (counts.Open || 0) + (counts.ToDo || 0),
      'In Progress': counts['In Progress'] || 0,
      Closed: counts.Closed || 0,
      Review: counts.Review || 0,
      Blocked: counts.Blocked || 0
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};