"use client";

import * as React from "react";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { Nav } from "@/components/layout/nav";
import { DashboardContainer } from "@/components/dashboard/dashboard-container";
import { BrainDump } from "@/components/brain-dump/brain-dump";
import { Inbox } from "@/components/brain-dump/inbox";
import { FocusTimer } from "@/components/focus/focus-timer";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CombinedProgress } from "@/components/gamification/progress-section";

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  const [currentView, setCurrentView] = React.useState("tasks");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [sidebarWidth, setSidebarWidth] = React.useState(320);
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const isResizing = React.useRef(false);
  const startResizeX = React.useRef(0);
  const startWidth = React.useRef(0);
  const isMobile = React.useRef(typeof window !== 'undefined' && window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      if (mobile !== isMobile.current) {
        isMobile.current = mobile;
        setIsSidebarOpen(!mobile);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startResizing = React.useCallback((e: React.MouseEvent) => {
    if (isMobile.current) return;
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
    <div className="flex h-screen bg-gradient-to-br from-background to-muted/20 overflow-hidden">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "fixed top-4 left-4 z-50 md:hidden",
          isSidebarOpen && "hidden"
        )}
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Sidebar Overlay */}
      {isSidebarOpen && isMobile.current && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        style={{
          width: isSidebarOpen ? (isMobile.current ? '280px' : `${sidebarWidth}px`) : '0px',
          minWidth: isSidebarOpen ? (isMobile.current ? '280px' : `${sidebarWidth}px`) : '0px'
        }}
        className={cn(
          "relative flex-shrink-0 border-r border-border/40 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          "transition-[min-width,width] duration-300 ease-in-out",
          !isSidebarOpen && "w-0 min-w-0",
          isMobile.current && "fixed inset-y-0 left-0 z-50"
        )}
      >
        <div className={cn(
          "h-full overflow-hidden transition-[opacity,transform] duration-300",
          isSidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
        )}>
          <div className="flex h-full flex-col px-4 sm:px-6 py-6">
            {/* App Title */}
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-1">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">FocusFlow Lite</h1>
                <p className="text-sm text-muted-foreground">Stay focused, get more done.</p>
              </div>
              <div className="flex items-center gap-2">
                <ThemeSwitcher />
                {isMobile.current && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Navigation */}
            <Nav currentView={currentView} onViewChange={(view) => {
              setCurrentView(view);
              if (isMobile.current) {
                setIsSidebarOpen(false);
              }
            }} />

            {/* Main Content Area */}
            <div className="flex-grow mt-6">
              {/* Content goes here */}
            </div>
          </div>
        </div>

        {/* Resize Handle */}
        {!isMobile.current && isSidebarOpen && (
          <div
            className={cn(
              "absolute right-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-primary/10",
              "transition-colors",
              isResizing.current && "bg-primary/10"
            )}
            onMouseDown={startResizing}
          />
        )}

        {/* Toggle Button (Desktop only) */}
        {!isMobile.current && (
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
        )}
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 flex flex-col min-h-0",
        isMobile.current && "w-full"
      )}>
        <div className="flex-1 overflow-auto -mb-[57px] pb-[57px]">
          <div className="h-full p-4 md:p-8 pt-16 md:pt-8">
            {renderContent()}
          </div>
        </div>

        {/* Combined Progress Bar */}
        <div className="border-t border-border/40 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4 md:px-8">
            <div className="combined-progress">
              <CombinedProgress />
            </div>
          </div>
        </div>
      </main>

      {/* Mini Timer */}
      {currentView === "tasks" && (
        <div className="fixed bottom-[72px] right-4 animate-in slide-in-from-right-5 duration-300 z-50">
          <FocusTimer variant="mini" />
        </div>
      )}
    </div>
  );
} 