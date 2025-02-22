import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/lib/utils";
import { useEffect } from "react";
import { CustomTooltip } from "../utils/utils";

interface Revenue {
  Subscriptions: number;
  Advertisements: number;
}

interface PieChartGraphProps {
  data: Revenue;
  colors?: string[];
  formatValue?: (value: number) => string;
  innerRadius?: number;
  outerRadius?: number;
}

interface ChartData {
  name: string;
  value: number;
  percentage: string;
}

const PieChartGraph = ({
  data,
  colors = ["#0ea5e9", "#14b8a6", "#f43f5e", "#a855f7"],
  formatValue = formatCurrency,
  innerRadius = 60,
  outerRadius = 80,
}: PieChartGraphProps) => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .pie-sector {
        transition: transform 0.3s ease;
        transform-origin: center center;
      }
      .pie-sector:hover {
        transform: scale(1.03);
        filter: brightness(0.9);
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Calculate total using object values
  const totalValue = (Object.values(data) as number[]).reduce(
    (a, b) => a + b,
    0
  );

  // Format data for the chart
  const formattedData: ChartData[] = Object.entries(data).map(
    ([name, value]) => ({
      name,
      value,
      percentage: ((value / totalValue) * 100).toFixed(1),
    })
  );

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1" style={{ minHeight: "200px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={formattedData}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={5}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {formattedData.map((index: any) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                  stroke="none"
                  className="pie-sector"
                  id={`pie-sector-${index}`}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-2">
        {formattedData.map((entry, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                {entry.name}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-slate-900 dark:text-white">
                {formatValue(entry.value)}
              </span>
              <span className="text-xs text-slate-500">
                {entry.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartGraph;
