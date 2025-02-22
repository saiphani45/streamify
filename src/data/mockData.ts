import { UserGrowth, Revenue, Song, Stream, Artist } from "../types";

// Function to generate random avatar URL
const getRandomAvatar = (userId: string) => {
  const styles = [
    "adventurer",
    "adventurer-neutral",
    "avataaars",
    "big-ears",
    "big-smile",
    "bottts",
    "croodles",
    "fun-emoji",
  ];
  const randomStyle = styles[Math.floor(Math.random() * styles.length)];
  return `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${userId}`;
};

// Top songs data with consistent metrics
export const topSongsData: Song[] = [
  {
    name: "Anti-Hero",
    artist: "Taylor Swift",
    artistImage:
      "https://i.scdn.co/image/ab67616d00001e020b04da4f224b51ff86e0a481",
    streams: 850000,
  },
  {
    name: "Rich Flex",
    artist: "Drake",
    artistImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZXXzapxdBBeaPTlK3gPFQax6Kb0VzAaOQRRIMZg-zg6XDNip2514lMQI&usqp=CAE&s",
    streams: 780000,
  },
  {
    name: "Blinding Lights",
    artist: "The Weeknd",
    artistImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu5SA2EL4kumxBvDuAEbE5CImd7jBdz8DjgDtj7lmgByRvB7Eojj9cSkM&usqp=CAE&s",
    streams: 720000,
  },
  {
    name: "Shape of You",
    artist: "Ed Sheeran",
    artistImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnG5AOOcoKtjADlLLc_WE3elRjU2GbXLSAqyjIvc8OZP7uKcJOL6fH8FE&usqp=CAE&s",
    streams: 680000,
  },
  {
    name: "Tití Me Preguntó",
    artist: "Bad Bunny",
    artistImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLQVlLrjp85zK_lJ3oZr70ikE93BTWeDs5EVYX5kgwnolKhQQgTZUrUuQ&usqp=CAE&s",
    streams: 650000,
  },
];

// Generate random streams with consistent total
const generateRandomStreams = (count: number): Stream[] => {
  const streams: Stream[] = [];
  const totalTargetStreams = 2500000; // Consistent with total metrics
  let remainingStreams = totalTargetStreams;

  for (let i = 0; i < count; i++) {
    const streamCount =
      i === count - 1
        ? remainingStreams
        : Math.floor((Math.random() * remainingStreams) / (count - i));

    remainingStreams -= streamCount;

    const randomSong =
      topSongsData[Math.floor(Math.random() * topSongsData.length)];
    streams.push({
      id: `stream-${i + 1}`,
      songName: randomSong.name,
      artist: randomSong.artist,
      artistImage: randomSong.artistImage,
      dateStreamed: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      streamCount,
      userId: `user-${Math.floor(Math.random() * 10000) + 1}`,
    });
  }

  return streams.sort(
    (a, b) =>
      new Date(b.dateStreamed).getTime() - new Date(a.dateStreamed).getTime()
  );
};

// User growth data with consistent progression
export const userGrowthData: UserGrowth[] = [
  { month: "2024-01", totalUsers: 20000, activeUsers: 15000 },
  { month: "2024-02", totalUsers: 25000, activeUsers: 18750 },
  { month: "2024-03", totalUsers: 31250, activeUsers: 23400 },
  { month: "2024-04", totalUsers: 39000, activeUsers: 29250 },
  { month: "2024-05", totalUsers: 48750, activeUsers: 36500 },
  { month: "2024-06", totalUsers: 61000, activeUsers: 45750 },
];

// Revenue data with realistic proportions
export const revenueData: Revenue = {
  Subscriptions: 1250000,
  Advertisements: 750000,
};

// Top artists with consistent metrics
export const artists: Artist[] = [
  {
    id: "1",
    name: "Taylor Swift",
    monthlyListeners: 82500000,
    totalStreams: 7800000000,
    image: "https://i.scdn.co/image/ab67616d00001e020b04da4f224b51ff86e0a481",
  },
  {
    id: "2",
    name: "Drake",
    monthlyListeners: 73800000,
    totalStreams: 7200000000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZXXzapxdBBeaPTlK3gPFQax6Kb0VzAaOQRRIMZg-zg6XDNip2514lMQI&usqp=CAE&s",
  },
  {
    id: "3",
    name: "The Weeknd",
    monthlyListeners: 68400000,
    totalStreams: 6500000000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu5SA2EL4kumxBvDuAEbE5CImd7jBdz8DjgDtj7lmgByRvB7Eojj9cSkM&usqp=CAE&s",
  },
  {
    id: "4",
    name: "Ed Sheeran",
    monthlyListeners: 65200000,
    totalStreams: 6200000000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnG5AOOcoKtjADlLLc_WE3elRjU2GbXLSAqyjIvc8OZP7uKcJOL6fH8FE&usqp=CAE&s",
  },
  {
    id: "5",
    name: "Bad Bunny",
    monthlyListeners: 62100000,
    totalStreams: 5800000000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLQVlLrjp85zK_lJ3oZr70ikE93BTWeDs5EVYX5kgwnolKhQQgTZUrUuQ&usqp=CAE&s",
  },
];

// Streaming data by genre with consistent numbers
export const streamingData = [
  { name: "Pop", streams: 1000000, growth: 15 },
  { name: "Hip Hop", streams: 800000, growth: 22 },
  { name: "R&B", streams: 600000, growth: 12 },
  { name: "Rock", streams: 500000, growth: 8 },
  { name: "Electronic", streams: 400000, growth: 18 },
];

// User status data matching growth metrics
export const userStatusData = userGrowthData.map(
  ({ month, totalUsers, activeUsers }) => ({
    month,
    activeUsers,
    inactiveUsers: Math.round(totalUsers * 0.25),
    removedAccounts: Math.round(totalUsers * 0.05),
  })
);

// Key metrics using consistent data
export const keyMetrics = {
  totalUsers: userGrowthData[userGrowthData.length - 1].totalUsers,
  activeUsers: userGrowthData[userGrowthData.length - 1].activeUsers,
  totalStreams: streamingData.reduce((acc, curr) => acc + curr.streams, 0),
  totalRevenue: revenueData.Subscriptions + revenueData.Advertisements,
  averageEngagement: 85,
};

// Generate streams data for display
export const recentStreamsData = generateRandomStreams(50);

// All users data with consistent metrics
export const allUsers = Array.from({ length: 8 }).map((_, index) => ({
  id: `user-${index + 1}`,
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  status: index % 2 === 0 ? "active" : "inactive",
  avatarUrl: getRandomAvatar(`user-${index + 1}`),
  department: ["Engineering", "Marketing", "Sales", "Support"][index % 4],
  location: ["San Francisco, CA", "New York, NY", "London, UK", "Toronto, CA"][
    index % 4
  ],
  joinDate: userGrowthData.map((d) => d.month)[index % userGrowthData.length],
  phone: `+1 (555) ${String(index + 1).padStart(3, "0")}-${String(
    Math.floor(Math.random() * 10000)
  ).padStart(4, "0")}`,
}));
