// src/components/layout/DashboardLayout.tsx
import React from 'react';
import { Sidebar } from './Sidebar';
import { ModeToggle } from './ModeToggle';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar className="w-64 shrink-0" />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navigation Bar */}
        <div className="sticky top-0 z-10 bg-card border-b">
          <div className="flex h-[60px] items-center px-6 justify-between">
            <h2 className="text-lg font-medium text-card-foreground">
              Welcome back, John Doe
            </h2>
            <ModeToggle />
          </div>
        </div>
        
        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}