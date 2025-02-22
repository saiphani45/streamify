import { CardContent } from "@/components/ui/card";
import Card3D from "@/components/ui/Card3d";
import { TabsContent } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import GenericTable from "@/components/tables/genericTable";
import MetricCards from "../../MetricCards";
import {
  artists,
  keyMetrics,
  recentStreamsData,
  revenueData,
  userGrowthData,
} from "@/data/mockData";
import { userGrowthlineConfigs } from "@/lib/constants";
import PieChartGraph from "@/components/charts/pieChart";
import LineChartGraph from "@/components/charts/lineChart";
import { columns } from "@/components/utils/utils";

const OverviewTab = () => {

  return (
    <TabsContent value="overview" className="space-y-6">
      <MetricCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card3D className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3
                  className="text-lg font-semibold bg-gradient-to-r from-sky-600 to-teal-600 
                    dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent"
                >
                  User Growth
                </h3>
                <p className="text-sm text-sky-600/60 dark:text-sky-400/60">
                  Last 12 months
                </p>
              </div>
            </div>
            <div className="h-[300px] relative z-10">
              <LineChartGraph
                data={userGrowthData}
                lineConfigs={userGrowthlineConfigs}
                areaChart={true}
              />
            </div>
          </CardContent>
        </Card3D>

        <Card3D>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3
                  className="text-lg font-semibold bg-gradient-to-r from-sky-600 to-teal-600 
                    dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent"
                >
                  Revenue Distribution
                </h3>
                <p className="text-sm text-sky-600/60 dark:text-sky-400/60">
                  By Source
                </p>
              </div>
              <div className="text-sm text-sky-600/60 dark:text-sky-400/60">
                Total: {formatCurrency(keyMetrics.totalRevenue)}
              </div>
            </div>
            <div className="h-[300px] relative z-10">
              <PieChartGraph
                data={revenueData}
                colors={["#0ea5e9", "#14b8a6"]}
                innerRadius={60}
                outerRadius={80}
              />
            </div>
          </CardContent>
        </Card3D>

        <Card3D>
          <CardContent className="p-6">
            <h3
              className="text-lg font-semibold mb-4 bg-gradient-to-r from-sky-600 to-teal-600 
                dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent"
            >
              Top Artists
            </h3>
            <div className="space-y-4">
              {artists.slice(0, 5).map((artist, index) => (
                <div
                  key={artist.id}
                  className="flex items-center justify-between p-3 rounded-lg 
                      hover:bg-sky-50/50 dark:hover:bg-sky-900/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-sky-500 dark:text-sky-400 w-4">
                      {index + 1}
                    </span>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-teal-500 rounded-full blur-sm opacity-50" />
                      <Avatar className="h-10 w-10 ring-2 ring-sky-100 dark:ring-sky-900 relative overflow-hidden">
                        <img
                          src={artist.image}
                          alt={artist.name}
                          className="object-cover w-10 h-10"
                          loading="lazy"
                          width="40"
                          height="40"
                        />
                      </Avatar>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {artist.name}
                      </p>
                      <p className="text-sm text-sky-600/60 dark:text-sky-400/60">
                        {((artist as any).monthlyListeners / 1000000).toFixed(
                          1
                        )}
                        M monthly listeners
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className="font-medium bg-gradient-to-r from-sky-600 to-teal-600 
                          dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent"
                    >
                      {((artist as any).totalStreams / 1000000000).toFixed(1)}B
                    </p>
                    <p className="text-sm text-sky-600/60 dark:text-sky-400/60">
                      total streams
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card3D>
      </div>

      <Card3D>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3
              className="text-lg font-semibold bg-gradient-to-r from-sky-600 to-teal-600 
                dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent"
            >
              Recent Streams
            </h3>
          </div>
          <GenericTable
            data={recentStreamsData}
            columns={columns}
            itemsPerPage={10}
            showFilters={true}
          />
        </CardContent>
      </Card3D>
    </TabsContent>
  );
};

export default OverviewTab;
