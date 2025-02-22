export const COLORS = ["#0ea5e9", "#14b8a6", "#06b6d4", "#0891b2"];
export const userGrowthlineConfigs = [
  {
    dataKey: "activeUsers",
    name: "Active Users",
    stroke: "#0ea5e9",
    activeDot: { r: 8, fill: "#0ea5e9" },
  },
  {
    dataKey: "totalUsers",
    name: "Total Users",
    stroke: "#14b8a6",
    activeDot: { r: 8, fill: "#14b8a6" },
  },
];
export const userStatusConfigs = [
  {
    dataKey: "activeUsers",
    stroke: "#0ea5e9",
    name: "Active Users",
  },
  {
    dataKey: "inactiveUsers",
    stroke: "#f97316", // Orange color for inactive
    name: "Inactive Users",
  },
  {
    dataKey: "removedAccounts",
    stroke: "#ef4444", // Red color for removed
    name: "Removed Accounts",
  },
];


 // Configuration for genre performance bar chart
 export const genreConfigs = [
  {
    dataKey: "streams",
    stroke: "#0ea5e9",
    name: "Streams",
  },
];