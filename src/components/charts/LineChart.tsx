import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  LineChart,
} from "recharts";

interface LineChartGraphProps {
  userGrowthData: any[];
  lineConfigs: Array<{
    activeDot: any;
    dataKey: string;
    stroke: string;
  }>;
}

const LineChartGraph = ({
  userGrowthData,
  lineConfigs,
}: LineChartGraphProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={userGrowthData}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis dataKey="month" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
          }}
        />
        <Legend />

        {lineConfigs.map((config) => (
          <Line
            key={config.dataKey}
            type="monotone"
            dataKey={config.dataKey}
            stroke={config.stroke}
            fill="url(#colorPv)"
            activeDot={config.activeDot}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartGraph;
