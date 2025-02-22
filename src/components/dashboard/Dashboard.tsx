import { Tabs } from "@/components/ui/tabs";
import { lazy, Suspense } from "react";
import { LoadingFallback } from "../utils/utils";

const Header = lazy(() => import("../nav/Header"));
const TabsLists = lazy(() => import("./tabs/TabsList"));
const OverViewTab = lazy(() => import("./tabs/Overview/Overview"));
const ArtistsTab = lazy(() => import("./tabs/Artists/Artists"));
const UsersTab = lazy(() => import("./tabs/Users/Users"));
const AnalyticsTab = lazy(() => import("./tabs/Analytics/Analytics"));

const Dashboard = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-sky-50 via-slate-50 to-teal-50/50 
      dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-800/90 
      dark:bg-blend-multiply p-4 lg:p-6"
    >
      {/* Header */}
      <Suspense fallback={<LoadingFallback />}>
        <Header />
      </Suspense>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="overview" className="space-y-6">
          {/* Tab List */}
          <Suspense fallback={<LoadingFallback />}>
            <TabsLists />
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <OverViewTab />
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <ArtistsTab />
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <UsersTab />
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <AnalyticsTab />
          </Suspense>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
