"use client";

import * as React from "react";
import { ListTodo, Brain, Timer, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export function Nav({ currentView, onViewChange }: NavProps) {
  const navItems = [
    {
      title: "Tasks",
      icon: ListTodo,
      view: "tasks",
      description: "Manage your daily tasks",
    },
    {
      title: "Brain Dump",
      icon: Brain,
      view: "brain-dump",
      description: "Capture your thoughts",
    },
    {
      title: "Focus Timer",
      icon: Timer,
      view: "timer",
      description: "Start a focus session",
    },
  ];

  return (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <div className="space-y-1">
          <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
            Navigation
          </h2>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.view}
                variant={currentView === item.view ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  currentView === item.view && "bg-secondary"
                )}
                onClick={() => onViewChange(item.view)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Button>
            ))}
          </nav>
        </div>
      </div>
      <div className="px-3 py-2">
        <div className="space-y-1">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Settings
          </h2>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => onViewChange("settings")}
          >
            <Settings className="h-4 w-4" />
            <span>Preferences</span>
          </Button>
        </div>
      </div>
    </div>
  );
} 