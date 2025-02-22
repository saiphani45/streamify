import { CardContent } from "@/components/ui/card";
import Card3D from "@/components/ui/Card3d";
import { TabsContent } from "@/components/ui/tabs";
import { enhancedUserData, streamingData } from "@/data/mockData";
import LineChartGraph from "@/components/charts/LineChart";
import GenericChart from "@/components/charts/GenericChart";

interface StreamingData {
  name: string;
  streams: number;
  growth: number;
}

const AnalyticsTab = () => {
  // Calculate actual month-over-month growth rates
  const dataWithGrowth = enhancedUserData.map((item, index, arr) => {
    if (index === 0) {
      return { ...item, growthRate: 0 };
    }
    const previousMonth = arr[index - 1].activeUsers;
    const currentMonth = item.activeUsers;
    const growthRate = ((currentMonth - previousMonth) / previousMonth) * 100;

    return {
      ...item,
      growthRate: parseFloat(growthRate.toFixed(1)),
    };
  });

  // Configuration for user engagement line chart
  const userEngagementConfigs = [
    {
      dataKey: "activeUsers",
      stroke: "#0ea5e9",
      name: "Monthly Active Users",
    },
    {
      dataKey: "growthRate",
      stroke: "#14b8a6",
      name: "Growth Rate %",
    },
  ];

  // Configuration for genre performance bar chart
  const genreConfigs = [
    {
      dataKey: "streams",
      stroke: "#0ea5e9",
      name: "Streams",
    },
  ];

  return (
    <TabsContent value="analytics" className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Engagement Chart */}
        <Card3D className="lg:col-span-2">
          <CardContent className="p-6">
            <h2
              className="text-lg font-semibold mb-4 bg-gradient-to-r from-sky-600 to-teal-600 
                dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent"
            >
              User Growth & Engagement
            </h2>
            <div className="h-[300px] relative z-10">
              <LineChartGraph
                data={dataWithGrowth}
                lineConfigs={userEngagementConfigs}
                areaChart={true}
              />
            </div>
          </CardContent>
        </Card3D>

        {/* Genre Performance Chart */}
        <Card3D>
          <CardContent className="p-6">
            <h2
              className="text-lg font-semibold mb-4 bg-gradient-to-r from-sky-600 to-teal-600 
                dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent"
            >
              Genre Performance
            </h2>
            <div className="h-[300px] relative z-10">
              <GenericChart
                data={streamingData}
                configs={genreConfigs}
                type="bar"
                showLegend={false}
              />
            </div>
          </CardContent>
        </Card3D>

        {/* Streaming Trends List */}
        <Card3D>
          <CardContent className="p-6">
            <h2
              className="text-lg font-semibold mb-4 bg-gradient-to-r from-sky-600 to-teal-600 
                dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent"
            >
              Streaming Trends
            </h2>
            <div className="space-y-4">
              {streamingData.map((genre: StreamingData, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg 
                    hover:bg-sky-50/50 dark:hover:bg-sky-900/20 transition-colors"
                >
                  <div>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {genre.name}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-sky-600/60 dark:text-sky-400/60">
                        {genre.streams.toLocaleString()} streams
                      </span>
                      <span
                        className={`text-sm ${
                          genre.growth > 10
                            ? "text-emerald-500"
                            : "text-orange-500"
                        }`}
                      >
                        {genre.growth > 0 ? "+" : ""}
                        {genre.growth}%
                      </span>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-24 h-2 bg-sky-100 dark:bg-sky-900/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-500 to-teal-500"
                      style={{
                        width: `${(genre.streams / 5000) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card3D>
      </div>
    </TabsContent>
  );
};

export default AnalyticsTab;
