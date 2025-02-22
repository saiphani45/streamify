import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
  image?: string;
  subtitle?: string;
}

const MetricCard = ({
  title,
  value,
  icon: Icon,
  trend,
  iconColor = "text-indigo-600 dark:text-indigo-400",
  iconBgColor = "bg-indigo-100 dark:bg-indigo-900/30",
  image,
  subtitle,
}: MetricCardProps) => {
  return (
    <Card
      className="relative bg-white dark:bg-slate-800 rounded-xl 
      shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
      hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]
      dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
      dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]
      transform hover:-translate-y-1 transition-all duration-300
      before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent before:rounded-xl
      after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/5 after:to-transparent after:rounded-xl
      dark:before:from-white/10 dark:after:from-black/20"
    >
      <CardContent className="relative p-6 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {title}
            </p>
            <div className="flex items-center gap-3 mt-2">
              {image && (
                <Avatar className="h-12 w-12 rounded-lg shadow-lg">
                  <img
                    src={image}
                    alt={subtitle || ""}
                    className="object-cover"
                  />
                </Avatar>
              )}
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  {value}
                </h3>
                {subtitle && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
            {trend && (
              <div className="mt-3 flex items-center gap-1.5">
                <span
                  className={cn(
                    "flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full",
                    trend.isPositive
                      ? "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30"
                      : "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30"
                  )}
                >
                  {trend.isPositive ? "+" : "-"}
                  {Math.abs(trend.value)}%
                </span>
                <span className="text-xs text-slate-500">since last month</span>
              </div>
            )}
          </div>
          <div
            className={cn(
              "h-14 w-14 rounded-xl flex items-center justify-center ml-4 shadow-lg transform hover:scale-110 transition-transform duration-200",
              iconBgColor,
              "before:absolute before:inset-0 before:bg-gradient-to-t before:from-white/40 before:to-transparent before:rounded-xl"
            )}
          >
            <Icon className={cn("h-7 w-7 relative z-10", iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
