"use client";

import * as React from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Nav } from "@/components/layout/nav";
import { DashboardContainer } from "@/components/dashboard/dashboard-container";
import { BrainDump } from "@/components/brain-dump/brain-dump";
import { Inbox } from "@/components/brain-dump/inbox";
import { FocusTimer } from "@/components/focus/focus-timer";

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  const [currentView, setCurrentView] = React.useState("tasks");

  const renderContent = () => {
    switch (currentView) {
      case "tasks":
        return <DashboardContainer />;
      case "brain-dump":
        return (
          <div className="grid gap-8 md:grid-cols-2">
            <BrainDump />
            <Inbox />
          </div>
        );
      case "timer":
        return <FocusTimer />;
      default:
        return <DashboardContainer />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Sidebar */}
      <aside className="w-72 border-r border-border/40 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 py-8 hidden md:block">
        <div className="flex h-full flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight">FocusFlow Lite</h1>
                <p className="text-sm text-muted-foreground">Stay focused, get more done.</p>
              </div>
              <ThemeToggle />
            </div>
            <Nav currentView={currentView} onViewChange={setCurrentView} />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="h-full p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
} 