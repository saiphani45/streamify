import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useArtists } from "@/context/artistContext";

interface AddArtistDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddArtistDialog = ({ isOpen, onClose }: AddArtistDialogProps) => {
  const { addArtist } = useArtists();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    monthlyListeners: 0,
    totalStreams: 0,
    genres: "",
    topSongs: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addArtist({
      name: formData.name,
      image: formData.image,
      monthlyListeners: Number(formData.monthlyListeners),
      totalStreams: Number(formData.totalStreams),
      genres: formData.genres.split(",").map((g) => g.trim()),
      topSongs: formData.topSongs.split(",").map((s) => s.trim()),
      joinedDate: new Date().toISOString(),
    });

    setFormData({
      name: "",
      image: "",
      monthlyListeners: 0,
      totalStreams: 0,
      genres: "",
      topSongs: "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-sky-100 dark:border-sky-900 max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            <span
              className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 
              dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent"
            >
              Add New Artist
            </span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Artist Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter artist name"
                className="bg-white/50 dark:bg-slate-900/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, image: e.target.value }))
                }
                placeholder="Enter image URL"
                className="bg-white/50 dark:bg-slate-900/50"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyListeners">Monthly Listeners</Label>
                <Input
                  id="monthlyListeners"
                  type="number"
                  value={formData.monthlyListeners}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      monthlyListeners: Number(e.target.value),
                    }))
                  }
                  placeholder="Enter monthly listeners"
                  className="bg-white/50 dark:bg-slate-900/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalStreams">Total Streams</Label>
                <Input
                  id="totalStreams"
                  type="number"
                  value={formData.totalStreams}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      totalStreams: Number(e.target.value),
                    }))
                  }
                  placeholder="Enter total streams"
                  className="bg-white/50 dark:bg-slate-900/50"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="genres">Genres (comma-separated)</Label>
              <Input
                id="genres"
                value={formData.genres}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, genres: e.target.value }))
                }
                placeholder="Pop, Rock, Jazz"
                className="bg-white/50 dark:bg-slate-900/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="topSongs">Top Songs (comma-separated)</Label>
              <Input
                id="topSongs"
                value={formData.topSongs}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, topSongs: e.target.value }))
                }
                placeholder="Song 1, Song 2, Song 3"
                className="bg-white/50 dark:bg-slate-900/50"
              />
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-sky-200 dark:border-sky-800 hover:bg-sky-50 
                dark:hover:bg-sky-900/50 text-sky-600 dark:text-sky-400"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-sky-500 to-teal-500 text-white
                hover:from-sky-600 hover:to-teal-600"
            >
              Add Artist
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddArtistDialog;
