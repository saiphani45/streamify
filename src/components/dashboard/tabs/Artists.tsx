import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import Card3D from "@/components/ui/Card3d";
import { Input } from "@/components/ui/input";
import { artists } from "@/data/mockData";
import { Avatar } from "@radix-ui/react-avatar";
import { TabsContent } from "@radix-ui/react-tabs";

const ArtistsTab = () => {
  return (
    <TabsContent value="artists">
      <Card3D>
        <CardContent className="p-6">
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
              <Card3D
                key={artist.id}
                className="hover:scale-[1.02] transition-transform backdrop-blur-lg"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-teal-500 rounded-lg blur-lg opacity-50" />
                      <Avatar className="h-16 w-16 rounded-lg ring-2 ring-sky-100 dark:ring-sky-900 relative">
                        <img
                          src={artist.image}
                          alt={artist.name}
                          className="object-cover rounded-lg"
                        />
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <h3
                        className="font-semibold text-lg bg-gradient-to-r from-sky-600 to-teal-600 
                              dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent"
                      >
                        {artist.name}
                      </h3>
                      <p className="text-sm text-sky-600/60 dark:text-sky-400/60">
                        {(artist.monthlyListeners / 1000000).toFixed(1)}M
                        monthly listeners
                      </p>
                      <p className="text-sm text-sky-600/60 dark:text-sky-400/60">
                        {(artist.totalStreams / 1000000000).toFixed(1)}B total
                        streams
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
  );
};
export default ArtistsTab;