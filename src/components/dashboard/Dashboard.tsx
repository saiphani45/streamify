import React, { useState, useMemo } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar } from '@/components/ui/avatar';
import { 
  Search, 
  Bell, 
  LayoutDashboard, 
  Music2, 
  Users, 
  TrendingUp, 
  ArrowUpDown 
} from 'lucide-react';
import { ModeToggle } from '../layout/ModeToggle';
import MetricCards from './MetricCards';
import { 
  userGrowthData, 
  revenueData, 
  topSongsData, 
  recentStreamsData, 
  artists, 
  keyMetrics 
} from '@/data/mockData';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  Legend 
} from 'recharts';
import { cn } from '@/lib/utils';

const Card3D = ({ children, className = "", gradient = false }) => (
  <Card className={cn(
    "relative bg-white/80 dark:bg-slate-900/80 rounded-xl backdrop-blur-lg",
    "shadow-[0_8px_30px_rgb(0,0,0,0.08)]", 
    "hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]",
    "dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)]",
    "dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]",
    "transform hover:-translate-y-1 transition-all duration-300",
    "border border-sky-100/80 dark:border-sky-800/20",
    "before:absolute before:inset-0 before:bg-gradient-to-b before:from-sky-50/30 before:to-transparent before:rounded-xl before:pointer-events-none",
    "after:absolute after:inset-0 after:bg-gradient-to-t after:from-teal-50/30 after:to-transparent after:rounded-xl after:pointer-events-none",
    "dark:before:from-sky-900/10 dark:after:from-teal-900/10",
    className
  )}>
    <div className="relative z-10">
      {children}
    </div>
  </Card>
);

const Dashboard = () => {
  // State for table sorting and filtering
  const [sortColumn, setSortColumn] = useState('dateStreamed');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterArtist, setFilterArtist] = useState('');
  const [filterSong, setFilterSong] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const formatCurrency = (value) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  const COLORS = ['#0ea5e9', '#14b8a6', '#06b6d4', '#0891b2'];
  
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

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-slate-50 to-teal-50/50 
      dark:from-slate-950 dark:via-sky-950/20 dark:to-teal-950/20 p-4 lg:p-6">
      
      {/* Header */}
      <Card3D className="mb-6">
        <div className="p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-xl 
                bg-gradient-to-br from-sky-100 to-teal-100 
                dark:from-sky-900/30 dark:to-teal-900/30 
                flex items-center justify-center transform hover:scale-110 transition-transform duration-200
                before:absolute before:inset-0 before:bg-gradient-to-t before:from-white/40 before:to-transparent before:rounded-xl">
                <Music2 className="h-5 w-5 text-sky-600 dark:text-sky-400 relative z-10" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 
                dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent">
                Streamify Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:flex-none">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full lg:w-64 rounded-xl bg-white/50 dark:bg-slate-900/50 
                    border-sky-100 dark:border-sky-900/50 focus:border-sky-200 
                    dark:focus:border-sky-800 pl-10"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-sky-500/60" />
              </div>
              <Button 
                size="icon" 
                variant="outline"
                className="relative bg-white/50 dark:bg-slate-900/50 border-sky-100 
                  dark:border-sky-900/50 hover:border-sky-200 dark:hover:border-sky-800 rounded-xl"
              >
                <Bell className="h-5 w-5 text-sky-500/60" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-teal-500 rounded-full" />
              </Button>
              <ModeToggle />
            </div>
          </div>
        </div>
      </Card3D>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="overview" className="space-y-6">
          {/* Tab List */}
          <div className="flex justify-center w-full">
            <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-2 bg-white/50 dark:bg-slate-900/50 
              p-1 rounded-xl border border-sky-100 dark:border-sky-900/50">
              <TabsTrigger value="overview" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r 
                  data-[state=active]:from-sky-500 data-[state=active]:to-teal-500 
                  data-[state=active]:text-white rounded-lg">
                <LayoutDashboard className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="artists"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r 
                  data-[state=active]:from-sky-500 data-[state=active]:to-teal-500 
                  data-[state=active]:text-white rounded-lg">
                <Music2 className="h-4 w-4" />
                Artists
              </TabsTrigger>
              <TabsTrigger value="users"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r 
                  data-[state=active]:from-sky-500 data-[state=active]:to-teal-500 
                  data-[state=active]:text-white rounded-lg">
                <Users className="h-4 w-4" />
                Users
              </TabsTrigger>
              <TabsTrigger value="analytics"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r 
                  data-[state=active]:from-sky-500 data-[state=active]:to-teal-500 
                  data-[state=active]:text-white rounded-lg">
                <TrendingUp className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab Content */}
          <TabsContent value="overview" className="space-y-6">
            <MetricCards />
            
            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Growth Chart */}
              <Card3D className="lg:col-span-2">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-sky-600 to-teal-600 
                        dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent">
                        User Growth
                      </h3>
                      <p className="text-sm text-sky-600/60 dark:text-sky-400/60">Last 12 months</p>
                    </div>
                  </div>
                  <div className="h-[300px] relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={userGrowthData}>
                        <defs>
                          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="month" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                          }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="totalUsers" 
                          stroke="#0ea5e9" 
                          strokeWidth={2}
                          fill="url(#colorUv)"
                          activeDot={{ r: 8, fill: "#0ea5e9" }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="activeUsers" 
                          stroke="#14b8a6" 
                          strokeWidth={2}
                          fill="url(#colorPv)"
                          activeDot={{ r: 8, fill: "#14b8a6" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card3D>

              {/* Revenue Distribution */}
              <Card3D gradient>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-sky-600 to-teal-600 
                        dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent">
                        Revenue Distribution
                      </h3>
                      <p className="text-sm text-sky-600/60 dark:text-sky-400/60">By Source</p>
                    </div>
                    <div className="text-sm text-sky-600/60 dark:text-sky-400/60">
                      Total: {formatCurrency(keyMetrics.totalRevenue)}
                    </div>
                  </div>
                  <div className="h-[300px] relative z-10">
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
                        >
{formattedRevenueData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => formatCurrency(value)}
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card3D>

              {/* Top Artists */}
              <Card3D gradient>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-sky-600 to-teal-600 
                    dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent">
                    Top Artists
                  </h3>
                  <div className="space-y-4">
                    {artists.slice(0, 5).map((artist, index) => (
                      <div key={artist.id} 
                        className="flex items-center justify-between p-3 rounded-lg 
                          hover:bg-sky-50/50 dark:hover:bg-sky-900/20 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-sky-500 dark:text-sky-400 w-4">{index + 1}</span>
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-teal-500 rounded-full blur-sm opacity-50"/>
                            <Avatar className="h-10 w-10 ring-2 ring-sky-100 dark:ring-sky-900 relative">
                              <img src={artist.image} alt={artist.name} className="object-cover" />
                            </Avatar>
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">{artist.name}</p>
                            <p className="text-sm text-sky-600/60 dark:text-sky-400/60">
                              {(artist.monthlyListeners / 1000000).toFixed(1)}M monthly listeners
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium bg-gradient-to-r from-sky-600 to-teal-600 
                            dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent">
                            {(artist.totalStreams / 1000000000).toFixed(1)}B
                          </p>
                          <p className="text-sm text-sky-600/60 dark:text-sky-400/60">total streams</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card3D>
            </div>

            {/* Recent Streams Table */}
            <Card3D gradient>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-sky-600 to-teal-600 
                    dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent">
                    Recent Streams
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                      placeholder="Filter by song..."
                      value={filterSong}
                      onChange={(e) => setFilterSong(e.target.value)}
                      className="w-full sm:w-48 bg-white/50 dark:bg-slate-900/50 border-sky-100 
                        dark:border-sky-900/50 focus:border-sky-200 dark:focus:border-sky-800"
                    />
                    <Input
                      placeholder="Filter by artist..."
                      value={filterArtist}
                      onChange={(e) => setFilterArtist(e.target.value)}
                      className="w-full sm:w-48 bg-white/50 dark:bg-slate-900/50 border-sky-100 
                        dark:border-sky-900/50 focus:border-sky-200 dark:focus:border-sky-800"
                    />
                    <Select
                      value={sortColumn}
                      onValueChange={handleSort}
                    >
                      <SelectTrigger className="w-full sm:w-48 bg-white/50 dark:bg-slate-900/50 border-sky-100 
                        dark:border-sky-900/50">
                        <SelectValue placeholder="Sort by..." />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-slate-900 border-sky-100 dark:border-sky-900/50">
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
                      <tr className="border-b border-sky-200 dark:border-sky-800">
                        <th className="text-left py-3 px-4">
                          <Button 
                            variant="ghost" 
                            className="h-8 flex items-center gap-2 text-slate-700 dark:text-slate-200 
                              hover:text-sky-600 dark:hover:text-sky-400"
                            onClick={() => handleSort('songName')}
                          >
                            Song Name
                            <ArrowUpDown className="h-4 w-4" />
                          </Button>
                        </th>
                        <th className="text-left py-3 px-4">
                          <Button 
                            variant="ghost" 
                            className="h-8 flex items-center gap-2 text-slate-700 dark:text-slate-200 
                              hover:text-sky-600 dark:hover:text-sky-400"
                            onClick={() => handleSort('artist')}
                          >
                            Artist
                            <ArrowUpDown className="h-4 w-4" />
                          </Button>
                        </th>
                        <th className="text-left py-3 px-4">
                          <Button 
                            variant="ghost" 
                            className="h-8 flex items-center gap-2 text-slate-700 dark:text-slate-200 
                              hover:text-sky-600 dark:hover:text-sky-400"
                            onClick={() => handleSort('dateStreamed')}
                          >
                            Date Streamed
                            <ArrowUpDown className="h-4 w-4" />
                          </Button>
                        </th>
                        <th className="text-right py-3 px-4">
                          <Button 
                            variant="ghost" 
                            className="h-8 flex items-center gap-2 text-slate-700 dark:text-slate-200 
                              hover:text-sky-600 dark:hover:text-sky-400"
                            onClick={() => handleSort('streamCount')}
                          >
                            Stream Count
                            <ArrowUpDown className="h-4 w-4" />
                          </Button>
                        </th>
                        <th className="text-left py-3 px-4">User ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.map((stream, index) => (
                        <tr 
                          key={index} 
                          className="border-b border-sky-100 dark:border-sky-900/50 
                            hover:bg-sky-50/50 dark:hover:bg-sky-900/20"
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-teal-500 rounded-full blur-sm opacity-50"/>
                                <Avatar className="h-8 w-8 ring-2 ring-sky-100 dark:ring-sky-900 relative">
                                  <img src={stream.artistImage} alt={stream.artist} className="object-cover" />
                                </Avatar>
                              </div>
                              <span className="font-medium text-slate-900 dark:text-white">{stream.songName}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sky-600 dark:text-sky-400">{stream.artist}</td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                            {new Date(stream.dateStreamed).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className="bg-gradient-to-r from-sky-600 to-teal-600 
                              dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent font-medium">
                              {stream.streamCount.toLocaleString()}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 rounded-full bg-sky-50 dark:bg-sky-900/30 
                              text-sky-600 dark:text-sky-400 text-xs">
                              {stream.userId}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-sky-600/60 dark:text-sky-400/60">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedAndFilteredData.length)} of {sortedAndFilteredData.length} entries
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                      disabled={currentPage === 1}
                      className="border-sky-200 dark:border-sky-800 hover:bg-sky-50 dark:hover:bg-sky-900/50
                        disabled:opacity-50"
                    >
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => {
                        const nearCurrent = Math.abs(page - currentPage) <= 1;
                        return page === 1 || page === totalPages || nearCurrent;
                      })
                      .map((page, i, filteredPages) => (
                        <React.Fragment key={page}>
                          {i > 0 && filteredPages[i - 1] !== page - 1 && (
                            <span className="px-2 py-1 text-sky-600 dark:text-sky-400">...</span>
                          )}
                          <Button
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className={`
                              ${currentPage === page 
                                ? 'bg-gradient-to-r from-sky-500 to-teal-500 text-white' 
                                : 'border-sky-200 dark:border-sky-800 hover:bg-sky-50 dark:hover:bg-sky-900/50'}
                            `}
                          >
                            {page}
                          </Button>
                        </React.Fragment>
                      ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                      disabled={currentPage === totalPages}
                      className="border-sky-200 dark:border-sky-800 hover:bg-sky-50 dark:hover:bg-sky-900/50
                        disabled:opacity-50"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card3D>
          </TabsContent>

          {/* Artists Tab */}
          <TabsContent value="artists">
            <Card3D gradient>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 
                    dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent">
                    Artist Management
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    <Input
                      placeholder="Search artists..."
                      className="w-full sm:w-64 bg-white/50 dark:bg-slate-900/50 border-sky-100 
                        dark:border-sky-900/50 focus:border-sky-200 dark:focus:border-sky-800"
                    />
                    <Button 
                      className="whitespace-nowrap bg-gradient-to-r from-sky-500 to-teal-500 text-white
                        hover:from-sky-600 hover:to-teal-600"
                    >
                      Add New Artist
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {artists.map((artist) => (
                    <Card3D key={artist.id} className="hover:scale-[1.02] transition-transform backdrop-blur-lg">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-teal-500 rounded-lg blur-lg opacity-50"/>
                            <Avatar className="h-16 w-16 rounded-lg ring-2 ring-sky-100 dark:ring-sky-900 relative">
                              <img src={artist.image} alt={artist.name} className="object-cover rounded-lg" />
                            </Avatar>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg bg-gradient-to-r from-sky-600 to-teal-600 
                              dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent">
                              {artist.name}
                            </h3>
                            <p className="text-sm text-sky-600/60 dark:text-sky-400/60">
                              {(artist.monthlyListeners / 1000000).toFixed(1)}M monthly listeners
                            </p>
                            <p className="text-sm text-sky-600/60 dark:text-sky-400/60">
                              {(artist.totalStreams / 1000000000).toFixed(1)}B total streams
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <Button 
                            variant="outline" 
                            className="w-full border-sky-200 dark:border-sky-800 hover:bg-sky-50 
                              dark:hover:bg-sky-900/50 text-sky-600 dark:text-sky-400"
                          >
                            View Details
                          </Button>
                          <Button 
                            className="w-full bg-gradient-to-r from-sky-500 to-teal-500 text-white 
                              hover:from-sky-600 hover:to-teal-600"
                          >
                            Edit Profile
                          </Button>
                        </div>
                      </CardContent>
                    </Card3D>
                  ))}
                </div>
              </CardContent>
            </Card3D>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card3D gradient>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 
                    dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent">
                    User Management
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    <Input
                      placeholder="Search users..."
                      className="w-full sm:w-64 bg-white/50 dark:bg-slate-900/50 border-sky-100 
                        dark:border-sky-900/50 focus:border-sky-200 dark:focus:border-sky-800"
                    />
                    <Select defaultValue="all">
                      <SelectTrigger className="w-full sm:w-48 bg-white/50 dark:bg-slate-900/50 border-sky-100 
                        dark:border-sky-900/50">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Card3D key={index} className="hover:scale-[1.01] transition-transform">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-teal-500 rounded-full blur-sm opacity-50"/>
                            <Avatar className="h-10 w-10 ring-2 ring-sky-100 dark:ring-sky-900 relative">
                              <img src="/api/placeholder/40/40" alt="User" className="object-cover" />
                            </Avatar>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-slate-900 dark:text-white">User {index + 1}</h3>
                              <span className="px-2 py-1 rounded-full bg-teal-100 text-teal-600 text-xs">
                                Active
                              </span>
                            </div>
                            <p className="text-sm text-sky-600/60 dark:text-sky-400/60">user{index + 1}@example.com</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-sky-200 dark:border-sky-800 hover:bg-sky-50 dark:hover:bg-sky-900/50"
                          >
                            View Profile
                          </Button>
                        </div>
                      </CardContent>
                    </Card3D>
                  ))}
                </div>
              </CardContent>
            </Card3D>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card3D gradient>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-sky-600 to-teal-600 
                    dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent">
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
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                          }}
                        />
                        <Bar dataKey="streams" fill="#0ea5e9" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card3D>

              <Card3D gradient>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-sky-600 to-teal-600 
                    dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent">
                    Engagement Metrics
                  </h2>
                  <div className="h-[300px] relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={userGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="activeUsers" 
                          stroke="#0ea5e9"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card3D>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;