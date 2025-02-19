import MetricCard from './MetricCard';
import { Users, UserCheck, Play, DollarSign, Music } from 'lucide-react';
import { keyMetrics } from '@/data/mockData';

const MetricCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      <MetricCard
        title="Total Users"
        value={keyMetrics.totalUsers.toLocaleString()}
        icon={Users}
      />
      <MetricCard
        title="Active Users"
        value={keyMetrics.activeUsers.toLocaleString()}
        icon={UserCheck}
        trend={{
          value: 5.2,
          isPositive: true
        }}
      />
      <MetricCard
        title="Total Streams"
        value={keyMetrics.totalStreams.toLocaleString()}
        icon={Play}
      />
      <MetricCard
        title="Revenue"
        value={`$${keyMetrics.totalRevenue.toLocaleString()}`}
        icon={DollarSign}
        trend={{
          value: 8.1,
          isPositive: true
        }}
      />
      <MetricCard
        title="Top Artist"
        value={keyMetrics.topArtist}
        icon={Music}
      />
    </div>
  );
};

export default MetricCards;