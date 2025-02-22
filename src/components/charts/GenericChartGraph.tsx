import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  BarChart,
  Area,
  AreaChart,
  ComposedChart,
  Line,
} from "recharts";
import { CustomTooltip } from "../utils/utils";

interface ChartConfig {
  dataKey: string;
  stroke: string;
  name?: string;
  yAxisId?: string;
  type?: "line" | "bar" | "area";
}

interface GenericChartProps {
  data: any[];
  configs: ChartConfig[];
  type?: "bar" | "area" | "composed";
  xAxisKey?: string;
  showLegend?: boolean;
  dualAxis?: boolean;
}

const GenericChartGraph = ({
  data,
  configs,
  type = "bar",
  xAxisKey = "name",
  showLegend = true,
  dualAxis = false,
}: GenericChartProps) => {
  // Select the appropriate chart type
  const Chart =
    type === "bar" ? BarChart : type === "area" ? AreaChart : ComposedChart;

  // Determine the data element based on type
  const renderDataElement = (config: ChartConfig) => {
    const commonProps = {
      key: config.dataKey,
      dataKey: config.dataKey,
      name: config.name || config.dataKey,
      stroke: config.stroke,
      yAxisId: config.yAxisId || "left",
    };

    if (config.type === "line" || type === "composed") {
      return (
        <Line
          {...commonProps}
          type="monotone"
          dot={{ fill: config.stroke, strokeWidth: 2 }}
          activeDot={{ r: 6, strokeWidth: 2 }}
        />
      );
    }

    const DataElement: any = type === "bar" ? Bar : Area;
    return (
      <DataElement
        {...commonProps}
        type="monotone"
        fill={`url(#gradient-${config.dataKey})`}
        {...(type === "bar" && { radius: [4, 4, 0, 0], maxBarSize: 50 })}
        {...(type === "area" && {
          dot: { fill: config.stroke, strokeWidth: 2 },
          activeDot: { r: 6, strokeWidth: 2 },
        })}
      />
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <Chart data={data}>
        {/* Gradient Definitions */}
        <defs>
          {configs.map((config, index) => (
            <linearGradient
              key={`gradient-${index}`}
              id={`gradient-${config.dataKey}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor={config.stroke} stopOpacity={0.8} />
              <stop offset="95%" stopColor={config.stroke} stopOpacity={0.3} />
            </linearGradient>
          ))}
        </defs>

        {/* Grid and Axes */}
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#94a3b8"
          opacity={0.1}
          vertical={false}
        />
        <XAxis
          dataKey={xAxisKey}
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
          yAxisId="left"
        />
        {dualAxis && (
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            dx={10}
            orientation="right"
            yAxisId="right"
          />
        )}

        {/* Tooltip and Legend */}
        <Tooltip
          content={
            <CustomTooltip
              active={undefined}
              payload={undefined}
              label={undefined}
            />
          }
        />
        {showLegend && (
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
        )}

        {/* Render Data Elements */}
        {configs.map(renderDataElement)}
      </Chart>
    </ResponsiveContainer>
  );
};

export default GenericChartGraph;
