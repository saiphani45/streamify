import { Card } from '@/components/ui/card';
import MetricCards from './MetricCards';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Streamify Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Track your music streaming analytics and performance
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleString()}
        </p>
      </div>

      {/* Metrics */}
      <MetricCards />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">User Growth</h2>
          <div className="h-[400px]">
            {/* Chart will go here */}
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">Revenue Distribution</h2>
          <div className="h-[400px]">
            {/* Chart will go here */}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold text-card-foreground mb-4">Top 5 Streamed Songs</h2>
        <div className="h-[300px]">
          {/* Chart will go here */}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;