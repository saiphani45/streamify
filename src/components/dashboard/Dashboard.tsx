import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend, Line, LineChart } from 'recharts';
import { Search, Bell, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ModeToggle } from '../layout/ModeToggle';
import { userGrowthData, revenueData, topSongsData, recentStreamsData, keyMetrics } from '@/data/mockData';
import MetricCards from './MetricCards';

const Dashboard = () => {
  // State for table sorting and filtering
  const [sortColumn, setSortColumn] = useState('dateStreamed');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterArtist, setFilterArtist] = useState('');
  const [filterSong, setFilterSong] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  const COLORS = ['#4F46E5', '#38BDF8'];
  
  // Format revenue data for pie chart
  const formattedRevenueData = [
    { name: 'Subscriptions', value: revenueData.Subscriptions },
    { name: 'Advertisements', value: revenueData.Advertisements }
  ];

  // Sort and filter table data
  const sortedAndFilteredData = useMemo(() => {
    return recentStreamsData
      .filter(stream => 
        stream.artist.toLowerCase().includes(filterArtist.toLowerCase()) &&
        stream.songName.toLowerCase().includes(filterSong.toLowerCase())
      )
      .sort((a, b) => {
        if (sortDirection === 'asc') {
          return a[sortColumn] > b[sortColumn] ? 1 : -1;
        }
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      });
  }, [sortColumn, sortDirection, filterArtist, filterSong]);

  const totalPages = Math.ceil(sortedAndFilteredData.length / itemsPerPage);
  const paginatedData = sortedAndFilteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const formattedUserGrowthData = userGrowthData.map(data => ({
    ...data,
    activeUsers: data.activeUsers,
    totalUsers: data.totalUsers,
  }));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      {/* Modern Header */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">Streamify Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search..."
                className="w-64 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
            </div>
            <Button size="icon" variant="ghost" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="mb-6">
      <MetricCards/>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* User Growth Chart  */}
        <Card className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">User Growth</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Last 12 months</p>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formattedUserGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#94a3b8"
                  />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="totalUsers" 
                    stroke="#4F46E5" 
                    strokeWidth={2}
                    name="Total Users"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="activeUsers" 
                    stroke="#38BDF8" 
                    strokeWidth={2}
                    name="Active Users"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        {/* Revenue Distribution Chart */}
        <Card className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Revenue Distribution</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">By Source</p>
              </div>
              <div className="text-sm text-slate-500">
                Total: {formatCurrency(keyMetrics.totalRevenue)}
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={formattedRevenueData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
                    onClick={(data) => {
                      // Handle pie segment click
                      console.log('Segment clicked:', data);
                    }}
                  >
                    {formattedRevenueData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        className="hover:opacity-80 cursor-pointer transition-opacity"
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => formatCurrency(value as number)}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top 5 Streamed Songs Chart */}
        <Card className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Top 5 Streamed Songs</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Last 30 days</p>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topSongsData.slice(0, 5)}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="name" 
                    tickFormatter={(value) => value.split(' - ')[1]}
                    stroke="#94a3b8"
                  />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    cursor={{ fill: 'rgba(79, 70, 229, 0.1)' }}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="streams" 
                    fill="#4F46E5"
                    radius={[4, 4, 0, 0]}
                    className="hover:opacity-80 cursor-pointer"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Streams Table */}
      <Card className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Recent Streams</h3>
            <div className="flex space-x-4">
              <Input
                placeholder="Filter by song..."
                value={filterSong}
                onChange={(e) => setFilterSong(e.target.value)}
                className="w-48"
              />
              <Input
                placeholder="Filter by artist..."
                value={filterArtist}
                onChange={(e) => setFilterArtist(e.target.value)}
                className="w-48"
              />
              <Select
                value={sortColumn}
                onValueChange={(value) => handleSort(value)}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dateStreamed">Date Streamed</SelectItem>
                  <SelectItem value="streamCount">Stream Count</SelectItem>
                  <SelectItem value="songName">Song Name</SelectItem>
                  <SelectItem value="artist">Artist</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">
                    <Button 
                      variant="ghost" 
                      className="h-8 flex items-center gap-2"
                      onClick={() => handleSort('songName')}
                    >
                      Song Name
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">
                    <Button 
                      variant="ghost" 
                      className="h-8 flex items-center gap-2"
                      onClick={() => handleSort('artist')}
                    >
                      Artist
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">
                    <Button 
                      variant="ghost" 
                      className="h-8 flex items-center gap-2"
                      onClick={() => handleSort('dateStreamed')}
                    >
                      Date Streamed
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">
                    <Button 
                      variant="ghost" 
                      className="h-8 flex items-center gap-2"
                      onClick={() => handleSort('streamCount')}
                    >
                      Stream Count
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">User ID</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((stream, index) => (
                  <tr 
                    key={index} 
                    className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm">{stream.songName}</td>
                    <td className="py-3 px-4 text-sm">{stream.artist}</td>
                    <td className="py-3 px-4 text-sm">
                      {new Date(stream.dateStreamed).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="py-3 px-4 text-sm text-right">{stream.streamCount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs">
                        {stream.userId}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-slate-500">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedAndFilteredData.length)} of {sortedAndFilteredData.length} entries
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;