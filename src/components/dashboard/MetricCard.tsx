import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const MetricCard = ({ title, value, icon: Icon, trend }: MetricCardProps) => {
  return (
    <Card className="p-6 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Icon className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
          </div>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl font-bold text-card-foreground">{value}</h3>
            {trend && (
              <span 
                className={cn(
                  "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                  trend.isPositive 
                    ? "bg-green-500/15 text-green-500" 
                    : "bg-red-500/15 text-red-500"
                )}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;