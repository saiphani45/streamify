import { Tabs } from "@/components/ui/tabs";

import Header from "../nav/Header";
import TabsLists from "./tabs/TabsList";
import OverViewTab from "./tabs/Overview/Overview";
import ArtistsTab from "./tabs/Artists/Artists";
import UsersTab from "./tabs/Users/Users";
import AnalyticsTab from "./tabs/Analytics/Analytics";

const Dashboard = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-sky-50 via-slate-50 to-teal-50/50 
      dark:from-slate-950 dark:via-sky-950/20 dark:to-teal-950/20 p-4 lg:p-6"
    >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="overview" className="space-y-6">
          {/* Tab List */}
          <TabsLists />

          {/* Overview Tab Content */}
          <OverViewTab />

          {/* Artists Tab */}
          <ArtistsTab />

          {/* Users Tab */}
          <UsersTab />

          {/* Analytics Tab */}
          <AnalyticsTab />
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
