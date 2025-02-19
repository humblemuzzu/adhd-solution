'use client';

import { GAMIFICATION_CONSTANTS } from '@/types/gamification';
import { useGamificationStore } from '@/lib/stores/gamification-store';
import { Progress } from '@/components/ui/progress';
import { Trophy, Zap, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';

export const GamificationProgress = () => {
  const { progress } = useGamificationStore();

  // Calculate progress to next level
  const xpInCurrentLevel = progress.xp % GAMIFICATION_CONSTANTS.XP_PER_LEVEL;
  const progressPercentage = (xpInCurrentLevel / GAMIFICATION_CONSTANTS.XP_PER_LEVEL) * 100;

  // Determine level class (cycles through available gradients)
  const levelClass = `xp-level-${progress.level % 6}`;

  return (
    <div className="space-y-4">
      {/* Level and FP Display */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold",
            levelClass
          )}>
            {progress.level}
          </div>
          <div className="space-y-0.5">
            <h4 className="text-sm font-medium leading-none">Level {progress.level}</h4>
            <p className="text-xs text-muted-foreground">
              {xpInCurrentLevel} / {GAMIFICATION_CONSTANTS.XP_PER_LEVEL} XP
            </p>
          </div>
        </div>
        <div className="text-right flex items-center space-x-1">
          <Zap className="w-4 h-4 text-yellow-500" />
          <div>
            <p className="text-sm font-medium">{progress.focusPoints}</p>
            <p className="text-xs text-muted-foreground">Focus Points</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <Progress
          value={progressPercentage}
          className={cn(
            "h-2",
            levelClass
          )}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
        <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
          <Trophy className="w-4 h-4 mb-1 text-yellow-500" />
          <span className="font-medium">{progress.streak}</span>
          <span>day streak</span>
        </div>
        <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
          <Zap className="w-4 h-4 mb-1 text-emerald-500" />
          <span className="font-medium">{progress.tasksCompleted}</span>
          <span>tasks done</span>
        </div>
        <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
          <Timer className="w-4 h-4 mb-1 text-blue-500" />
          <span className="font-medium">{progress.focusSessionsCompleted}</span>
          <span>sessions</span>
        </div>
      </div>
    </div>
  );
}; 