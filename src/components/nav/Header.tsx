import { Music2, Search, Bell } from "lucide-react";
import { ModeToggle } from "../layout/ModeToggle";
import { Button } from "../ui/button";
import Card3D from "../ui/Card3d";
import { Input } from "../ui/input";

const Header = () => {
  return (
    <Card3D className="mb-6">
      <div className="p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center space-x-3">
            <div
              className="relative w-10 h-10 rounded-xl 
                bg-gradient-to-br from-sky-100 to-teal-100 
                dark:from-sky-900/30 dark:to-teal-900/30 
                flex items-center justify-center transform hover:scale-110 transition-transform duration-200
                before:absolute before:inset-0 before:bg-gradient-to-t before:from-white/40 before:to-transparent before:rounded-xl"
            >
              <Music2 className="h-5 w-5 text-sky-600 dark:text-sky-400 relative z-10" />
            </div>
            <h1
              className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 
                dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent"
            >
              Streamify Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:flex-none">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full lg:w-64 rounded-xl bg-white/50 dark:bg-slate-900/50 
                    border-sky-100 dark:border-sky-900/50 focus:border-sky-200 
                    dark:focus:border-sky-800 pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-sky-500/60" />
            </div>
            <Button
              size="icon"
              variant="outline"
              className="relative bg-white/50 dark:bg-slate-900/50 border-sky-100 
                  dark:border-sky-900/50 hover:border-sky-200 dark:hover:border-sky-800 rounded-xl"
            >
              <Bell className="h-5 w-5 text-sky-500/60" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-teal-500 rounded-full" />
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </Card3D>
  );
};

export default Header;
