import { lazy, Suspense } from "react";
import { ThemeProvider } from "./components/layout/theme-provider";
import { ArtistProvider } from "./context/artistContext";
import { LoadingFallback } from "./components/utils/utils";

// Lazyload the Dashboard component
const Dashboard = lazy(() => import("@/components/dashboard/Dashboard"));

function App() {
  return (
    <ArtistProvider>
      <ThemeProvider defaultTheme="dark" storageKey="streamify-theme">
        <div className="min-h-screen bg-background">
          <Suspense fallback={<LoadingFallback />}>
            <Dashboard />
          </Suspense>
        </div>
      </ThemeProvider>
    </ArtistProvider>
  );
}

export default App;
