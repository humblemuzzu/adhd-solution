/**
 * Core gamification types for the FocusKing app
 */

/**
 * Experience points and level calculation constants
 */
export const GAMIFICATION_CONSTANTS = {
  BASE_XP_PER_TASK: 50,
  BASE_FP_PER_TASK: 10,
  FOCUS_SESSION_MULTIPLIER: 1.5,
  STREAK_MULTIPLIER_INCREMENT: 0.1,
  MAX_STREAK_MULTIPLIER: 2.0,
  XP_PER_LEVEL: 1000,
} as const;

/**
 * User's gamification progress
 */
export interface GamificationProgress {
  xp: number;
  level: number;
  focusPoints: number;
  streak: number;
  multiplier: number;
  tasksCompleted: number;
  focusSessionsCompleted: number;
}

/**
 * Reward types that can be earned
 */
export type RewardType =
  | 'TASK_COMPLETE'
  | 'FOCUS_SESSION_COMPLETE'
  | 'DAILY_STREAK'
  | 'LEVEL_UP';

/**
 * Structure for a reward earned
 */
export interface Reward {
  type: RewardType;
  xp: number;
  focusPoints: number;
  message: string;
  timestamp: number;
}

/**
 * Daily progress tracking
 */
export interface DailyProgress {
  date: string;
  tasksCompleted: number;
  focusSessionsCompleted: number;
  xpEarned: number;
  focusPointsEarned: number;
  rewards: Reward[];
}

/**
 * Achievement status
 */
export interface Achievement {
  id: string;
  name: string;
  description: string;
  isUnlocked: boolean;
  progress: number;
  maxProgress: number;
  reward: {
    xp: number;
    focusPoints: number;
  };
} 