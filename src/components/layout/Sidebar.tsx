import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Music2,
  Users,
  BarChart3,
  LogOut
} from "lucide-react";
import { 
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const [activeTab, setActiveTab] = React.useState('dashboard');

  return (
    <div className={cn("flex flex-col h-screen border-r bg-card", className)}>
      {/* Logo and Brand */}
      <div className="flex items-center h-[60px] px-6 border-b">
        <h2 className="text-xl font-semibold text-card-foreground">Streamify</h2>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6 space-y-2">
        <Button 
          variant={activeTab === 'dashboard' ? "secondary" : "ghost"} 
          className={cn(
            "w-full justify-start",
            activeTab === 'dashboard' && "bg-secondary"
          )}
          onClick={() => setActiveTab('dashboard')}
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
        <Button 
          variant={activeTab === 'music' ? "secondary" : "ghost"} 
          className={cn(
            "w-full justify-start",
            activeTab === 'music' && "bg-secondary"
          )}
          onClick={() => setActiveTab('music')}
        >
          <Music2 className="mr-2 h-4 w-4" />
          Music
        </Button>
        <Button 
          variant={activeTab === 'users' ? "secondary" : "ghost"} 
          className={cn(
            "w-full justify-start",
            activeTab === 'users' && "bg-secondary"
          )}
          onClick={() => setActiveTab('users')}
        >
          <Users className="mr-2 h-4 w-4" />
          Users
        </Button>
        <Button 
          variant={activeTab === 'analytics' ? "secondary" : "ghost"} 
          className={cn(
            "w-full justify-start",
            activeTab === 'analytics' && "bg-secondary"
          )}
          onClick={() => setActiveTab('analytics')}
        >
          <BarChart3 className="mr-2 h-4 w-4" />
          Analytics
        </Button>
      </div>
      
      {/* User Profile */}
      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-card-foreground">John Doe</p>
              <p className="text-xs text-muted-foreground">admin@streamify.com</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-card-foreground">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}