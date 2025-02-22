import { TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { LayoutDashboard, Music2, Users, TrendingUp } from "lucide-react";

const TabsLists = () => {
  return (
    <div className="flex justify-center w-full">
      <TabsList
        className="grid grid-cols-2 lg:grid-cols-4 gap-2 bg-white/50 dark:bg-slate-900/50 
      p-1 rounded-xl border border-sky-100 dark:border-sky-900/50"
      >
        <TabsTrigger
          value="overview"
          className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r 
          data-[state=active]:from-sky-500 data-[state=active]:to-teal-500 
          data-[state=active]:text-white rounded-lg"
        >
          <LayoutDashboard className="h-4 w-4" />
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="artists"
          className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r 
          data-[state=active]:from-sky-500 data-[state=active]:to-teal-500 
          data-[state=active]:text-white rounded-lg"
        >
          <Music2 className="h-4 w-4" />
          Artists
        </TabsTrigger>
        <TabsTrigger
          value="users"
          className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r 
          data-[state=active]:from-sky-500 data-[state=active]:to-teal-500 
          data-[state=active]:text-white rounded-lg"
        >
          <Users className="h-4 w-4" />
          Users
        </TabsTrigger>
        <TabsTrigger
          value="analytics"
          className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r 
          data-[state=active]:from-sky-500 data-[state=active]:to-teal-500 
          data-[state=active]:text-white rounded-lg"
        >
          <TrendingUp className="h-4 w-4" />
          Analytics
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default TabsLists;
