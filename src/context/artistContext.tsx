import { createContext, useContext, useState, ReactNode } from "react";
import { artists as initialArtists } from "@/data/mockData";
import { Artist } from "@/types";

interface ArtistContextType {
  artists: Artist[];
  addArtist: (artist: Omit<Artist, "id">) => void;
  updateArtist: (id: string, artist: Partial<Artist>) => void;
  deleteArtist: (id: string) => void;
}

const ArtistContext = createContext<ArtistContextType | undefined>(undefined);

export function ArtistProvider({ children }: { children: ReactNode }) {
  const [artists, setArtists] = useState<Artist[]>(initialArtists);

  const addArtist = (newArtist: Omit<Artist, "id">) => {
    const artist: Artist = {
      ...newArtist,
      id: crypto.randomUUID(),
      monthlyListeners: newArtist.monthlyListeners || 0,
      totalStreams: newArtist.totalStreams || 0,
    };
    setArtists((prev) => [...prev, artist]);
  };

  const updateArtist = (id: string, updatedArtist: Partial<Artist>) => {
    setArtists((prev) =>
      prev.map((artist) =>
        artist.id === id ? { ...artist, ...updatedArtist } : artist
      )
    );
  };

  const deleteArtist = (id: string) => {
    setArtists((prev) => prev.filter((artist) => artist.id !== id));
  };

  return (
    <ArtistContext.Provider
      value={{ artists, addArtist, updateArtist, deleteArtist }}
    >
      {children}
    </ArtistContext.Provider>
  );
}

export function useArtists() {
  const context = useContext(ArtistContext);
  if (context === undefined) {
    throw new Error("useArtists must be used within an ArtistProvider");
  }
  return context;
}
