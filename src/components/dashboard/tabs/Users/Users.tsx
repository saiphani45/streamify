import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import Card3D from "@/components/ui/Card3d";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import ProfileDialog from "./userProfileDialog";
import { allUsers } from "@/data/mockData";

const UsersTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Filter users based on search query and status
  const filteredUsers = useMemo(() => {
    return allUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const handleViewProfile = (user: any) => {
    setSelectedUser(user);
    setIsProfileOpen(true);
  };

  return (
    <TabsContent value="users">
      <Card3D>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <h2
              className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 
                    dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent"
            >
              User Management
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <form onSubmit={handleSearch} className="relative w-full sm:w-64">
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 bg-white/50 dark:bg-slate-900/50 border-sky-100 
                        dark:border-sky-900/50 focus:border-sky-200 dark:focus:border-sky-800"
                />
                <Button
                  type="submit"
                  size="icon"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full px-3 text-sky-600 hover:text-sky-700 dark:text-sky-400"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger
                  className="w-full sm:w-48 bg-white/50 dark:bg-slate-900/50 border-sky-100 
                        dark:border-sky-900/50"
                >
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <Card3D
                key={user.id}
                className="hover:scale-[1.01] transition-transform"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-teal-500 rounded-full blur-sm opacity-50" />
                      <Avatar className="h-10 w-10 ring-2 ring-sky-100 dark:ring-sky-900 relative">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-slate-900 dark:text-white">
                          {user.name}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs
                          ${
                            user.status === "active"
                              ? "bg-teal-100 text-teal-600"
                              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                          }`}
                        >
                          {user.status.charAt(0).toUpperCase() +
                            user.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-sky-600/60 dark:text-sky-400/60">
                        {user.email}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-sky-200 dark:border-sky-800 hover:bg-sky-50 dark:hover:bg-sky-900/50"
                      onClick={() => handleViewProfile(user)}
                    >
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card3D>
            ))}
          </div>
        </CardContent>
      </Card3D>

      <ProfileDialog
        user={selectedUser}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </TabsContent>
  );
};

export default UsersTab;
