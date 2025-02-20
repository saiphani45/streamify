import { Card, CardContent } from '@/components/ui/card';
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
  iconColor?: string;
  iconBgColor?: string;
}

const MetricCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend,
  iconColor = "text-indigo-600 dark:text-indigo-400",
  iconBgColor = "bg-indigo-100 dark:bg-indigo-900/30"
}: MetricCardProps) => {
  return (
    <Card className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {trend && (
              <p className={cn(
                "text-xs mt-1",
                trend.isPositive ? "text-green-500" : "text-red-500"
              )}>
                {trend.isPositive ? '+' : '-'}{trend.value}% since last month
              </p>
            )}
          </div>
          <div className={cn(
            "h-12 w-12 rounded-full flex items-center justify-center",
            iconBgColor
          )}>
            <Icon className={cn("h-6 w-6", iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;