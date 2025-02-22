import { lazy } from "react";
import { ThemeProvider } from "./context/theme-provider";
import { ArtistProvider } from "./context/artistContext";
const Dashboard = lazy(() => import("@/components/dashboard/Dashboard"));

function App() {
  return (
    <ArtistProvider>
      <ThemeProvider defaultTheme="dark" storageKey="streamify-theme">
        <div className="min-h-screen bg-background">
          <Dashboard />
        </div>
      </ThemeProvider>
    </ArtistProvider>
  );
}

export default App;
