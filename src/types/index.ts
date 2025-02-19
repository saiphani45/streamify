export interface UserGrowth {
  month: string;
  totalUsers: number;
  activeUsers: number;
}

export interface Revenue {
  Subscriptions: number;
  Advertisements: number;
}

export interface Song {
  name: string;
  artist: string;
  streams: number;
}

export interface Stream {
  id: string;
  songName: string;
  artist: string;
  dateStreamed: string;
  streamCount: number;
  userId: string;
}