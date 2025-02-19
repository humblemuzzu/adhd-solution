"use client";

import * as React from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Nav } from "@/components/layout/nav";
import { DashboardContainer } from "@/components/dashboard/dashboard-container";
import { BrainDump } from "@/components/brain-dump/brain-dump";
import { Inbox } from "@/components/brain-dump/inbox";
import { FocusTimer } from "@/components/focus/focus-timer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GamificationProgress } from "@/components/gamification/progress-bar";

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  const [currentView, setCurrentView] = React.useState("tasks");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [sidebarWidth, setSidebarWidth] = React.useState(288);
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const isResizing = React.useRef(false);
  const startResizeX = React.useRef(0);
  const startWidth = React.useRef(0);

  const startResizing = React.useCallback((e: React.MouseEvent) => {
    isResizing.current = true;
    startResizeX.current = e.clientX;
    startWidth.current = sidebarWidth;
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResizing);
  }, [sidebarWidth]);

  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    if (!isResizing.current) return;
    const delta = e.clientX - startResizeX.current;
    const newWidth = Math.min(Math.max(startWidth.current + delta, 240), 480);
    setSidebarWidth(newWidth);
  }, []);

  const stopResizing = React.useCallback(() => {
    isResizing.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopResizing);
  }, [handleMouseMove]);

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
      <aside
        ref={sidebarRef}
        style={{
          width: isSidebarOpen ? `${sidebarWidth}px` : '0px',
          minWidth: isSidebarOpen ? `${sidebarWidth}px` : '0px'
        }}
        className={cn(
          "relative flex-shrink-0 border-r border-border/40 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          "transition-[min-width,width] duration-300 ease-in-out",
          !isSidebarOpen && "w-0 min-w-0"
        )}
      >
        <div className={cn(
          "h-full overflow-hidden transition-[opacity,transform] duration-300",
          isSidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
        )}>
          <div className="h-full px-6 py-8">
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
                <div className="pt-4">
                  <GamificationProgress />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resize Handle */}
        {isSidebarOpen && (
          <div
            className={cn(
              "absolute right-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-primary/10",
              "transition-colors",
              isResizing.current && "bg-primary/10"
            )}
            onMouseDown={startResizing}
          />
        )}

        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-1/2 -translate-y-1/2 rounded-full bg-background border shadow-md",
            "transition-transform duration-300",
            isSidebarOpen ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
          )}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="h-full p-8">
          {renderContent()}
        </div>
      </main>

      {/* Mini Timer */}
      {currentView === "tasks" && (
        <div className="fixed bottom-4 right-4 animate-in slide-in-from-right-5 duration-300">
          <FocusTimer variant="mini" />
        </div>
      )}
    </div>
  );
} 