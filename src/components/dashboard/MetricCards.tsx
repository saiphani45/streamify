import { Users, PlayCircle, Music, DollarSign, Trophy } from "lucide-react";
import { artists, keyMetrics, userGrowthData } from "@/data/mockData";
import MetricCard from "./MetricCard";

const MetricCards = () => {
  // Calculate growth percentages
  const calculateGrowth = (current: number, previous: number) => {
    return Number((((current - previous) / previous) * 100).toFixed(1));
  };

  // Get previous month's data
  const previousMonth = userGrowthData[userGrowthData.length - 2];
  const currentMonth = userGrowthData[userGrowthData.length - 1];

  // Calculate growth percentages
  const totalUsersGrowth = calculateGrowth(
    currentMonth.totalUsers,
    previousMonth.totalUsers
  );
  const activeUsersGrowth = calculateGrowth(
    currentMonth.activeUsers,
    previousMonth.activeUsers
  );

  // Find top artist
  const topArtist: any = artists.find(
    (artist) => artist.name === keyMetrics.topArtist
  );

  const metrics = [
    {
      title: "Total Users",
      value: keyMetrics.totalUsers.toLocaleString(),
      icon: Users,
      trend: { value: totalUsersGrowth, isPositive: totalUsersGrowth > 0 },
      iconColor: "text-indigo-600 dark:text-indigo-400",
      iconBgColor: "bg-indigo-100 dark:bg-indigo-900/30",
    },
    {
      title: "Active Users",
      value: keyMetrics.activeUsers.toLocaleString(),
      icon: PlayCircle,
      trend: { value: activeUsersGrowth, isPositive: activeUsersGrowth > 0 },
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "Total Streams",
      value: keyMetrics.totalStreams.toLocaleString(),
      icon: Music,
      trend: { value: 15.3, isPositive: true },
      iconColor: "text-green-600 dark:text-green-400",
      iconBgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "Revenue",
      value: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(keyMetrics.totalRevenue),
      icon: DollarSign,
      trend: { value: 23.5, isPositive: true },
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      title: "Top Artist",
      value: topArtist?.name || keyMetrics.topArtist,
      icon: Trophy,
      iconColor: "text-pink-600 dark:text-pink-400",
      iconBgColor: "bg-pink-100 dark:bg-pink-900/30",
      image: topArtist?.image,
      subtitle: `${(topArtist?.monthlyListeners / 1000000).toFixed(
        1
      )}M monthly listeners`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          icon={metric.icon}
          trend={metric.trend}
          iconColor={metric.iconColor}
          iconBgColor={metric.iconBgColor}
          image={metric.image}
          subtitle={metric.subtitle}
        />
      ))}
    </div>
  );
};

export default MetricCards;
