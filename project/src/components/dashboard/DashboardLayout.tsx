import React from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { Footer } from '../Footer';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen ml-[72px] transition-all duration-300 relative">
        {/* Grid background */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] dark:opacity-[0.05]" />
        
        {/* Content */}
        <main className="flex-1 p-8 relative">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}