import { TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { LayoutDashboard, Music2, Users, TrendingUp } from "lucide-react";

const TabsLists = () => {
  const className =
    "flex items-center justify-center gap-2 px-3 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky-500 data-[state=active]:to-teal-500 data-[state=active]:text-white data-[state=inactive]:text-slate-600 dark:data-[state=inactive]:text-slate-400 rounded-lg transition-colors";
  return (
    <div className="flex justify-center w-full">
      <TabsList
        className="grid grid-cols-2 lg:grid-cols-4 gap-2 w-full max-w-2xl 
        bg-white/50 dark:bg-slate-900/50 backdrop-blur
        p-1.5 rounded-xl border border-sky-100 dark:border-sky-900"
      >
        <TabsTrigger value="overview" className={className}>
          <LayoutDashboard className="h-4 w-4" />
          <span>Overview</span>
        </TabsTrigger>

        <TabsTrigger value="artists" className={className}>
          <Music2 className="h-4 w-4" />
          <span>Artists</span>
        </TabsTrigger>

        <TabsTrigger value="users" className={className}>
          <Users className="h-4 w-4" />
          <span>Users</span>
        </TabsTrigger>

        <TabsTrigger value="analytics" className={className}>
          <TrendingUp className="h-4 w-4" />
          <span>Analytics</span>
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default TabsLists;
