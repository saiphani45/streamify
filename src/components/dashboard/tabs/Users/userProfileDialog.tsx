import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Building, Calendar } from "lucide-react";

const ProfileDialog = ({ user, isOpen, onClose }: any) => {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">User Profile</DialogTitle>
          <DialogDescription>
            Detailed information about the user
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-teal-500 rounded-full blur-sm opacity-50" />
                <Avatar className="h-24 w-24 ring-4 ring-sky-100 dark:ring-sky-900 relative">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
              <Badge
                variant={user.status === "default" ? "outline" : "secondary"}
                className="mt-2"
              >
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </Badge>
            </div>

            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
                  <Phone className="h-4 w-4" />
                  <span>{user.phone || "+1 (555) 000-0000"}</span>
                </div>
                <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
                  <Building className="h-4 w-4" />
                  <span>{user.department || "Engineering"}</span>
                </div>
                <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location || "San Francisco, CA"}</span>
                </div>
                <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {user.joinDate || "January 2024"}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-medium mb-2">Recent Activity</h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>• Last login: 2 hours ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
