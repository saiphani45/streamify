import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import Card3D from "@/components/ui/Card3d";
import { Input } from "@/components/ui/input";
import { Avatar } from "@radix-ui/react-avatar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { TabsContent } from "@radix-ui/react-tabs";

const UsersTab = () => {
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
              <Input
                placeholder="Search users..."
                className="w-full sm:w-64 bg-white/50 dark:bg-slate-900/50 border-sky-100 
                        dark:border-sky-900/50 focus:border-sky-200 dark:focus:border-sky-800"
              />
              <Select defaultValue="all">
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
            {Array.from({ length: 5 }).map((_, index) => (
              <Card3D
                key={index}
                className="hover:scale-[1.01] transition-transform"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-teal-500 rounded-full blur-sm opacity-50" />
                      <Avatar className="h-10 w-10 ring-2 ring-sky-100 dark:ring-sky-900 relative">
                        <img
                          src="/api/placeholder/40/40"
                          alt="User"
                          className="object-cover"
                        />
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-slate-900 dark:text-white">
                          User {index + 1}
                        </h3>
                        <span className="px-2 py-1 rounded-full bg-teal-100 text-teal-600 text-xs">
                          Active
                        </span>
                      </div>
                      <p className="text-sm text-sky-600/60 dark:text-sky-400/60">
                        user{index + 1}@example.com
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-sky-200 dark:border-sky-800 hover:bg-sky-50 dark:hover:bg-sky-900/50"
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
    </TabsContent>
  );
};
export default UsersTab;
