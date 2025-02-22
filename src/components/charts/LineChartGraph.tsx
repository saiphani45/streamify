import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  LineChart,
  Area,
  AreaChart,
} from "recharts";
import { CustomTooltip } from "../utils/utils";

interface LineChartGraphProps {
  data: any[];
  lineConfigs: Array<{
    activeDot?: any;
    dataKey: string;
    stroke: string;
    name?: string;
  }>;
  areaChart?: boolean;
}

const LineChartGraph = ({
  data,
  lineConfigs,
  areaChart = false,
}: LineChartGraphProps) => {
  const Chart = areaChart ? AreaChart : LineChart;
  const DataElement = areaChart ? Area : Line;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <Chart data={data}>
        <defs>
          {lineConfigs.map((config, index) => (
            <linearGradient
              key={`gradient-${index}`}
              id={`gradient-${config.dataKey}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor={config.stroke} stopOpacity={0.3} />
              <stop offset="95%" stopColor={config.stroke} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#94a3b8"
          opacity={0.1}
          vertical={false}
        />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#94a3b8", fontSize: 12 }}
          dy={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#94a3b8", fontSize: 12 }}
          dx={-10}
        />
        <Tooltip
          content={
            <CustomTooltip
              active={undefined}
              payload={undefined}
              label={undefined}
            />
          }
        />
        <Legend
          verticalAlign="top"
          height={36}
          iconType="circle"
          formatter={(value) => (
            <span className="text-sm text-slate-700 dark:text-slate-300">
              {value}
            </span>
          )}
        />

        {lineConfigs.map((config) => (
          <DataElement
            key={config.dataKey}
            type="monotone"
            dataKey={config.dataKey}
            name={config.name || config.dataKey}
            stroke={config.stroke}
            fill={areaChart ? `url(#gradient-${config.dataKey})` : "none"}
            activeDot={{
              r: 6,
              strokeWidth: 2,
              fill: config.stroke,
              stroke: "#fff",
            }}
            strokeWidth={2}
            dot={{
              r: 4,
              fill: config.stroke,
              strokeWidth: 2,
              stroke: "#fff",
            }}
          />
        ))}
      </Chart>
    </ResponsiveContainer>
  );
};

export default LineChartGraph;
