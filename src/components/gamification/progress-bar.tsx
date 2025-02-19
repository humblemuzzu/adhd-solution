'use client';

import { GAMIFICATION_CONSTANTS } from '@/types/gamification';
import { useGamificationStore } from '@/lib/stores/gamification-store';
import { Progress } from '@/components/ui/progress';

export const GamificationProgress = () => {
  const { progress } = useGamificationStore();

  // Calculate progress to next level
  const xpInCurrentLevel = progress.xp % GAMIFICATION_CONSTANTS.XP_PER_LEVEL;
  const progressPercentage = (xpInCurrentLevel / GAMIFICATION_CONSTANTS.XP_PER_LEVEL) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">Level {progress.level}</h4>
          <p className="text-xs text-muted-foreground">
            {xpInCurrentLevel} / {GAMIFICATION_CONSTANTS.XP_PER_LEVEL} XP to next level
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">{progress.focusPoints} FP</p>
          <p className="text-xs text-muted-foreground">Focus Points</p>
        </div>
      </div>
      <Progress value={progressPercentage} className="h-2" />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div>
          <span className="font-medium">{progress.streak}</span> day streak
        </div>
        <div>
          <span className="font-medium">{progress.tasksCompleted}</span> tasks completed
        </div>
        <div>
          <span className="font-medium">{progress.focusSessionsCompleted}</span> focus sessions
        </div>
      </div>
    </div>
  );
}; 