import { ThemeProvider } from "./components/layout/theme-provider";
import Dashboard from "@/components/dashboard/Dashboard";
import { ArtistProvider } from "./context/artistContext";

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
