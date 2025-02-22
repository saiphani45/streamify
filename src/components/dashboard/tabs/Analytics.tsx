import LineChartGraph from "@/components/charts/LineChart";
import { CardContent } from "@/components/ui/card";
import Card3D from "@/components/ui/Card3d";
import { topSongsData, userGrowthData } from "@/data/mockData";
import { engagementLineConfig } from "@/lib/constants";
import { TabsContent } from "@radix-ui/react-tabs";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  BarChart,
} from "recharts";

const AnalyticsTab = () => {
  return (
    <TabsContent value="analytics">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card3D>
          <CardContent className="p-6">
            <h2
              className="text-lg font-semibold mb-4 bg-gradient-to-r from-sky-600 to-teal-600 
                    dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent"
            >
              Listening Trends
            </h2>
            <div className="h-[300px] relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topSongsData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                    }}
                  />
                  <Bar dataKey="streams" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card3D>

        <Card3D>
          <CardContent className="p-6">
            <h2
              className="text-lg font-semibold mb-4 bg-gradient-to-r from-sky-600 to-teal-600 
                    dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent"
            >
              Engagement Metrics
            </h2>
            <div className="h-[300px] relative z-10">
              <LineChartGraph
                userGrowthData={userGrowthData}
                lineConfigs={engagementLineConfig}
              />
            </div>
          </CardContent>
        </Card3D>
      </div>
    </TabsContent>
  );
};
export default AnalyticsTab;
