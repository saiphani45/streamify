import LineChartGraph from "@/components/charts/LineChart";
import PieChartGraph from "@/components/charts/pieChart";
import GenericTable from "@/components/tables/genericTable";
import { CardContent } from "@/components/ui/card";
import Card3D from "@/components/ui/Card3d";
import {
  userGrowthData,
  keyMetrics,
  revenueData,
  artists,
  recentStreamsData,
} from "@/data/mockData";
import { userGrowthlineConfigs } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { Avatar } from "@radix-ui/react-avatar";
import { TabsContent } from "@radix-ui/react-tabs";
import MetricCards from "../MetricCards";

const OverViewTab = () => {
  const columns = [
    {
      key: "songName",
      header: "Song Name",
      sortable: true,
      filterable: true,
      render: (value: any, row: any) => (
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-teal-500 rounded-full blur-sm opacity-50" />
            <Avatar className="h-8 w-8 ring-2 ring-sky-100 dark:ring-sky-900 relative">
              <img
                src={row.artistImage}
                alt={row.artist}
                className="object-cover"
              />
            </Avatar>
          </div>
          <span className="font-medium text-slate-900 dark:text-white">
            {value}
          </span>
        </div>
      ),
    },
    {
      key: "artist",
      header: "Artist",
      sortable: true,
      filterable: true,
      render: (value: any) => (
        <span className="text-sky-600 dark:text-sky-400">{value}</span>
      ),
    },
    {
      key: "dateStreamed",
      header: "Date Streamed",
      sortable: true,
      render: (value: any) =>
        new Date(value).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      key: "streamCount",
      header: "Stream Count",
      sortable: true,
      render: (value: any) => (
        <span
          className="bg-gradient-to-r from-sky-600 to-teal-600 
              dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent font-medium"
        >
          {value.toLocaleString()}
        </span>
      ),
    },
    {
      key: "userId",
      header: "User ID",
      render: (value: any) => (
        <span
          className="px-2 py-1 rounded-full bg-sky-50 dark:bg-sky-900/30 
              text-sky-600 dark:text-sky-400 text-xs"
        >
          {value}
        </span>
      ),
    },
  ];

  return (
    <TabsContent value="overview" className="space-y-6">
      <MetricCards />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
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
                userGrowthData={userGrowthData}
                lineConfigs={userGrowthlineConfigs}
              />
            </div>
          </CardContent>
        </Card3D>

        {/* Revenue Distribution */}
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
              <PieChartGraph revenueData={revenueData} />
            </div>
          </CardContent>
        </Card3D>

        {/* Top Artists */}
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
                      <Avatar className="h-10 w-10 ring-2 ring-sky-100 dark:ring-sky-900 relative">
                        <img
                          src={artist.image}
                          alt={artist.name}
                          className="object-cover"
                        />
                      </Avatar>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {artist.name}
                      </p>
                      <p className="text-sm text-sky-600/60 dark:text-sky-400/60">
                        {(artist.monthlyListeners / 1000000).toFixed(1)}M
                        monthly listeners
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className="font-medium bg-gradient-to-r from-sky-600 to-teal-600 
                            dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent"
                    >
                      {(artist.totalStreams / 1000000000).toFixed(1)}B
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

      {/* Recent Streams Table */}
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

export default OverViewTab;
