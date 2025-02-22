import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import Card3D from "@/components/ui/Card3d";
import { Input } from "@/components/ui/input";
import { useArtists } from "@/context/artistContext";
import { Artist } from "@/types";
import { Avatar } from "@radix-ui/react-avatar";
import { TabsContent } from "@radix-ui/react-tabs";
import { useState } from "react";
import ArtistDialog from "./artistDialog";
import AddArtistDialog from "./addArtistDialog";

const ArtistsTab = () => {
  const { artists } = useArtists();
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (artist: Artist) => {
    setSelectedArtist(artist);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedArtist(null);
  };

  return (
    <TabsContent value="artists" className="space-y-6">
      <Card3D>
        <CardContent className="p-6">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <h2
              className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 
                    dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent"
            >
              Artist Management
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <Input
                placeholder="Search artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 bg-white/50 dark:bg-slate-900/50 border-sky-100 
                        dark:border-sky-900/50 focus:border-sky-200 dark:focus:border-sky-800"
              />
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="whitespace-nowrap bg-gradient-to-r from-sky-500 to-teal-500 text-white
                        hover:from-sky-600 hover:to-teal-600"
              >
                Add New Artist
              </Button>
            </div>
          </div>

          {/* Artists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtists.map((artist) => (
              <Card3D
                key={artist.id}
                className="hover:scale-[1.02] transition-transform backdrop-blur-lg"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-teal-500 rounded-xl blur-lg opacity-50" />
                      <Avatar className="h-24 w-24 rounded-xl ring-2 ring-sky-100 dark:ring-sky-900 relative overflow-hidden">
                        <img
                          src={artist.image}
                          alt={artist.name}
                          className="object-cover w-24 h-24 rounded-xl"
                          loading="lazy"
                          width="96"
                          height="96"
                        />
                      </Avatar>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-semibold text-lg bg-gradient-to-r from-sky-600 to-teal-600 
                              dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent truncate"
                      >
                        {artist.name}
                      </h3>
                      <p className="text-sm text-sky-600/60 dark:text-sky-400/60 mt-1">
                        {(artist.monthlyListeners / 1000000).toFixed(1)}M
                        monthly listeners
                      </p>
                      <p className="text-sm text-sky-600/60 dark:text-sky-400/60 mt-1">
                        {(artist.totalStreams / 1000000000).toFixed(1)}B total
                        streams
                      </p>
                      {artist.genres && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {artist.genres.slice(0, 2).map((genre, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 text-xs rounded-full bg-sky-100 dark:bg-sky-900/50 
                                text-sky-600 dark:text-sky-400"
                            >
                              {genre}
                            </span>
                          ))}
                          {artist.genres.length > 2 && (
                            <span className="text-xs text-sky-600/60 dark:text-sky-400/60">
                              +{artist.genres.length - 2} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button
                      onClick={() => handleViewDetails(artist)}
                      className="w-full bg-gradient-to-r from-sky-500 to-teal-500 text-white 
                              hover:from-sky-600 hover:to-teal-600"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card3D>
            ))}
          </div>
        </CardContent>
      </Card3D>

      {/* View Artist Details Modal */}
      <ArtistDialog
        artist={selectedArtist}
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
      />

      {/* Add Artist Modal */}
      <AddArtistDialog
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </TabsContent>
  );
};

export default ArtistsTab;
