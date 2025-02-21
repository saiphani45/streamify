export interface UserGrowth {
  month: string;
  totalUsers: number;
  activeUsers: number;
}

export interface Revenue {
  Subscriptions: number;
  Advertisements: number;
}

export interface Artist {
  id: string;
  name: string;
  monthlyListeners: number;
  totalStreams: number;
  image: string;
}

// Update your Song interface to include artist image
export interface Song {
  name: string;
  artist: string;
  artistImage: string;
  streams: number;
}

// Update your Stream interface to include artist image
export interface Stream {
  id: string;
  songName: string;
  artist: string;
  artistImage: string;
  dateStreamed: string;
  streamCount: number;
  userId: string;
}