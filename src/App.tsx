import { ThemeProvider } from "./components/layout/theme-provider"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import Dashboard from "@/components/dashboard/Dashboard"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="streamify-theme">
      <div className="min-h-screen bg-background">
        <DashboardLayout>
          <Dashboard />
        </DashboardLayout>
      </div>
    </ThemeProvider>
  )
}

export default App