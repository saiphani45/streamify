import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { COLORS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

const PieChartGraph = ({ revenueData }: any) => {
  const formattedRevenueData = [
    { name: "Subscriptions", value: revenueData.Subscriptions },
    { name: "Advertisements", value: revenueData.Advertisements },
  ];

  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%" minHeight={300}>
        <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <Pie
            data={formattedRevenueData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
          >
            {formattedRevenueData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="white"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => formatCurrency(value)}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartGraph;
