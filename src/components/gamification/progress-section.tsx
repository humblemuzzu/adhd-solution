'use client';

import { GAMIFICATION_CONSTANTS } from '@/types/gamification';
import { useGamificationStore } from '@/lib/stores/gamification-store';
import { useTaskContext } from "@/lib/task-context";
import { Progress } from '@/components/ui/progress';
import { Trophy, Zap, Timer, Sparkles, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from "@/components/ui/card";

const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
};

const getGreeting = () => {
  const timeOfDay = getTimeOfDay();
  const greetings = {
    morning: ['Rise and shine, Muzammil! 🌅', 'Good morning! Ready to conquer today? ☀️', 'Let\'s make today count! 💪'],
    afternoon: ['Keep the momentum going! 🚀', 'You\'re doing great, Muzammil! ✨', 'Stay focused, you\'ve got this! 🎯'],
    evening: ['Final stretch of the day! 🌙', 'You\'ve got this, Muzammil! ⭐', 'Finish strong! 💫']
  };
  return greetings[timeOfDay][Math.floor(Math.random() * 3)];
};

export function CombinedProgress() {
  const { tasks, completedTasks, streak, focusSessionsCompleted } = useTaskContext();

  // Calculate daily progress
  const totalTasks = tasks.length;
  const completedTaskCount = completedTasks.length;
  const dailyProgressPercentage = totalTasks > 0
    ? Math.round((completedTaskCount / totalTasks) * 100)
    : 0;

  // Calculate XP level (example calculation - adjust based on your game design)
  const xpPoints = (completedTaskCount * 10) + (focusSessionsCompleted * 20) + (streak * 5);
  const currentLevel = Math.floor(Math.sqrt(xpPoints / 100)) + 1;
  const xpForCurrentLevel = Math.pow(currentLevel - 1, 2) * 100;
  const xpForNextLevel = Math.pow(currentLevel, 2) * 100;
  const xpProgress = ((xpPoints - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100;

  return (
    <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
      {/* Daily Progress */}
      <div className="flex-1 space-y-2 min-w-[200px]">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-medium leading-none">Today's Progress</h3>
            <p className="text-xs text-muted-foreground">
              {completedTaskCount} of {totalTasks} tasks completed
            </p>
          </div>
          <Target className="h-4 w-4 text-muted-foreground" />
        </div>
        <Progress value={dailyProgressPercentage} className="h-2 progress-primary animate-shine" />
      </div>

      {/* Stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        {/* Level Progress */}
        <div className="w-full sm:w-auto flex-1 min-w-[200px] space-y-2">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-sm font-medium leading-none">Level {currentLevel}</h3>
              <p className="text-xs text-muted-foreground">
                {xpPoints} XP
              </p>
            </div>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </div>
          <Progress value={xpProgress} className="h-2 progress-secondary animate-shine" />
        </div>

        {/* Streak */}
        <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-lg w-full sm:w-auto">
          <Zap className="h-4 w-4 text-yellow-500 shrink-0" />
          <div className="space-y-1 min-w-0">
            <p className="text-sm font-medium leading-none">{streak} Day Streak</p>
            <p className="text-xs text-muted-foreground truncate">Keep it up!</p>
          </div>
        </div>
      </div>
    </div>
  );
} 