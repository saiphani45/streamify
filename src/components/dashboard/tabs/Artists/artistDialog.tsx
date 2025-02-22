// ArtistDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Artist } from "@/types";
import { Avatar } from "@radix-ui/react-avatar";

interface ArtistDialogProps {
  artist: Artist | null;
  isOpen: boolean;
  onClose: () => void;
}

const ArtistDialog = ({ artist, isOpen, onClose }: ArtistDialogProps) => {
  if (!artist) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-sky-100 dark:border-sky-900 max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            <span
              className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 
                dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent"
            >
              {artist.name}
            </span>
          </DialogTitle>
          <DialogDescription className="text-sky-600/60 dark:text-sky-400/60">
            Artist Details
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-teal-500 rounded-xl blur-lg opacity-50" />
            <Avatar className="h-48 w-48 rounded-xl ring-2 ring-sky-100 dark:ring-sky-900 relative overflow-hidden">
              <img
                src={artist.image}
                alt={artist.name}
                className="object-cover w-48 h-48 rounded-xl"
                loading="lazy"
                width="192"
                height="192"
              />
            </Avatar>
          </div>

          <div className="flex-1 space-y-6">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-sky-600/60 dark:text-sky-400/60">
                Monthly Listeners
              </h4>
              <p
                className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 
                  dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent"
              >
                {((artist as any).monthlyListeners / 1000000).toFixed(1)}M
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-medium text-sky-600/60 dark:text-sky-400/60">
                Total Streams
              </h4>
              <p
                className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 
                  dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent"
              >
                {((artist as any).totalStreams / 1000000000).toFixed(1)}B
              </p>
            </div>

            {artist.genres && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-sky-600/60 dark:text-sky-400/60">
                  Genres
                </h4>
                <div className="flex flex-wrap gap-2">
                  {artist.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm bg-sky-100 dark:bg-sky-900/50 
                          text-sky-600 dark:text-sky-400"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {artist.topSongs && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-sky-600/60 dark:text-sky-400/60">
                  Top Songs
                </h4>
                <ul className="space-y-2">
                  {artist.topSongs.map((song, index) => (
                    <li key={index} className="text-sky-600 dark:text-sky-400">
                      {song}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {artist.joinedDate && (
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-sky-600/60 dark:text-sky-400/60">
                  Joined
                </h4>
                <p className="text-sky-600 dark:text-sky-400">
                  {artist.joinedDate}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArtistDialog;
