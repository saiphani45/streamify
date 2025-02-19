import { UserGrowth, Revenue, Song, Stream } from '../types';

export const userGrowthData: UserGrowth[] = [
    {
        month: "2024-03",
        totalUsers: 10000,
        activeUsers: 6437
    },
    {
        month: "2024-04",
        totalUsers: 11500,
        activeUsers: 7711
    },
    {
        month: "2024-05",
        totalUsers: 13000,
        activeUsers: 8655
    },
    {
        month: "2024-06",
        totalUsers: 14500,
        activeUsers: 9066
    },
    {
        month: "2024-07",
        totalUsers: 16000,
        activeUsers: 10002
    },
    {
        month: "2024-08",
        totalUsers: 17500,
        activeUsers: 13229
    },
    {
        month: "2024-09",
        totalUsers: 19000,
        activeUsers: 12220
    },
    {
        month: "2024-10",
        totalUsers: 20500,
        activeUsers: 14207
    },
    {
        month: "2024-11",
        totalUsers: 22000,
        activeUsers: 17554
    },
    {
        month: "2024-12",
        totalUsers: 23500,
        activeUsers: 16338
    },
    {
        month: "2025-01",
        totalUsers: 25000,
        activeUsers: 18704
    },
    {
        month: "2025-02",
        totalUsers: 26500,
        activeUsers: 16474
    }
];

export const revenueData: Revenue = {
    Subscriptions: 929895,
    Advertisements: 385290
};

export const topSongsData: Song[] = [
    {
        name: "The Digital Dreamers - Cosmic Code",
        artist: "The Digital Dreamers",
        streams: 430502
    },
    {
        name: "Electron Echo - Cosmic Code",
        artist: "Electron Echo",
        streams: 407947
    },
    {
        name: "Electron Echo - Tech Trance",
        artist: "Electron Echo",
        streams: 405553
    },
    {
        name: "The Digital Dreamers - Tech Trance",
        artist: "The Digital Dreamers",
        streams: 377959
    },
    {
        name: "The Digital Dreamers - Digital Dawn",
        artist: "The Digital Dreamers",
        streams: 329913
    }
];

// Generate random recent streams
const generateRandomStreams = (count: number): Stream[] => {
    const songs = topSongsData;
    const streams: Stream[] = [];
    
    for (let i = 0; i < count; i++) {
        const randomSong = songs[Math.floor(Math.random() * songs.length)];
        streams.push({
            id: `stream-${i + 1}`,
            songName: randomSong.name.split(' - ')[1],
            artist: randomSong.artist,
            dateStreamed: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            streamCount: Math.floor(Math.random() * 1000) + 1,
            userId: `user-${Math.floor(Math.random() * 10000) + 1}`
        });
    }
    
    return streams.sort((a, b) => new Date(b.dateStreamed).getTime() - new Date(a.dateStreamed).getTime());
};

export const recentStreamsData: Stream[] = generateRandomStreams(50);

// Calculate key metrics
export const keyMetrics = {
    totalUsers: userGrowthData[userGrowthData.length - 1].totalUsers,
    activeUsers: userGrowthData[userGrowthData.length - 1].activeUsers,
    totalStreams: recentStreamsData.reduce((acc, curr) => acc + curr.streamCount, 0),
    totalRevenue: revenueData.Subscriptions + revenueData.Advertisements,
    topArtist: topSongsData[0].artist
};