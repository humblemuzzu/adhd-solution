"use client";

import { useTaskContext } from "@/lib/task-context";
import { Progress } from "@/components/ui/progress";

export const DailyProgress = () => {
  const { tasks } = useTaskContext();

  // Calculate completed tasks
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Today's Progress</h3>
        <p className="text-sm text-muted-foreground">Track your daily achievements</p>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{completedTasks} completed</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <Progress
          value={progressPercentage}
          className="h-2 progress-primary animate-shine"
        />
      </div>
    </div>
  );
}; 