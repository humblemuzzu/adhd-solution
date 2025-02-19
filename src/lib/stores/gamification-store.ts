import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  GamificationProgress,
  Reward,
  DailyProgress,
  GAMIFICATION_CONSTANTS,
  RewardType,
} from '@/types/gamification';

interface GamificationStore {
  // Core progress state
  progress: GamificationProgress;
  dailyProgress: DailyProgress;
  recentRewards: Reward[];

  // Actions
  addXP: (amount: number) => void;
  addFocusPoints: (amount: number) => void;
  completeTask: (inFocusSession?: boolean) => void;
  completeFocusSession: () => void;
  updateStreak: () => void;
  resetDailyProgress: () => void;
}

type GamificationStorePersist = StateCreator<
  GamificationStore,
  [],
  [["zustand/persist", unknown]],
  GamificationStore
>;

const calculateLevel = (xp: number): number => {
  return Math.floor(xp / GAMIFICATION_CONSTANTS.XP_PER_LEVEL);
};

const getTodayString = () => new Date().toISOString().split('T')[0];

const createInitialDailyProgress = (): DailyProgress => ({
  date: getTodayString(),
  tasksCompleted: 0,
  focusSessionsCompleted: 0,
  xpEarned: 0,
  focusPointsEarned: 0,
  rewards: [],
});

export const useGamificationStore = create<GamificationStore>()(
  persist(
    ((set, get): GamificationStore => ({
      progress: {
        xp: 0,
        level: 0,
        focusPoints: 0,
        streak: 0,
        multiplier: 1,
        tasksCompleted: 0,
        focusSessionsCompleted: 0,
      },
      dailyProgress: createInitialDailyProgress(),
      recentRewards: [],

      addXP: (amount: number) => {
        const { progress } = get();
        const newXP = progress.xp + amount;
        const newLevel = calculateLevel(newXP);

        set((state: GamificationStore) => ({
          progress: {
            ...state.progress,
            xp: newXP,
            level: newLevel,
          },
          dailyProgress: {
            ...state.dailyProgress,
            xpEarned: state.dailyProgress.xpEarned + amount,
          },
        }));

        // Check for level up
        if (newLevel > progress.level) {
          const reward: Reward = {
            type: 'LEVEL_UP',
            xp: 0,
            focusPoints: newLevel * 100, // Bonus FP for leveling up
            message: `Level Up! You're now level ${newLevel}`,
            timestamp: Date.now(),
          };

          get().addFocusPoints(reward.focusPoints);
          set((state: GamificationStore) => ({
            recentRewards: [reward, ...state.recentRewards].slice(0, 5),
          }));
        }
      },

      addFocusPoints: (amount: number) => {
        set((state: GamificationStore) => ({
          progress: {
            ...state.progress,
            focusPoints: state.progress.focusPoints + amount,
          },
          dailyProgress: {
            ...state.dailyProgress,
            focusPointsEarned: state.dailyProgress.focusPointsEarned + amount,
          },
        }));
      },

      completeTask: (inFocusSession = false) => {
        const { progress } = get();
        const baseXP = GAMIFICATION_CONSTANTS.BASE_XP_PER_TASK;
        const baseFP = GAMIFICATION_CONSTANTS.BASE_FP_PER_TASK;

        // Calculate rewards with multipliers
        const multiplier = progress.multiplier *
          (inFocusSession ? GAMIFICATION_CONSTANTS.FOCUS_SESSION_MULTIPLIER : 1);

        const xpEarned = Math.round(baseXP * multiplier);
        const fpEarned = Math.round(baseFP * multiplier);

        // Create reward
        const reward: Reward = {
          type: 'TASK_COMPLETE',
          xp: xpEarned,
          focusPoints: fpEarned,
          message: `Task completed! ${inFocusSession ? '(Focus Session Bonus!)' : ''}`,
          timestamp: Date.now(),
        };

        // Update state
        set((state: GamificationStore) => ({
          progress: {
            ...state.progress,
            tasksCompleted: state.progress.tasksCompleted + 1,
          },
          dailyProgress: {
            ...state.dailyProgress,
            tasksCompleted: state.dailyProgress.tasksCompleted + 1,
            rewards: [...state.dailyProgress.rewards, reward],
          },
          recentRewards: [reward, ...state.recentRewards].slice(0, 5),
        }));

        // Add rewards
        get().addXP(xpEarned);
        get().addFocusPoints(fpEarned);
      },

      completeFocusSession: () => {
        const { progress } = get();
        const baseXP = GAMIFICATION_CONSTANTS.BASE_XP_PER_TASK * 2; // Double XP for focus sessions
        const baseFP = GAMIFICATION_CONSTANTS.BASE_FP_PER_TASK * 2;

        const xpEarned = Math.round(baseXP * progress.multiplier);
        const fpEarned = Math.round(baseFP * progress.multiplier);

        const reward: Reward = {
          type: 'FOCUS_SESSION_COMPLETE',
          xp: xpEarned,
          focusPoints: fpEarned,
          message: 'Focus session completed!',
          timestamp: Date.now(),
        };

        set((state: GamificationStore) => ({
          progress: {
            ...state.progress,
            focusSessionsCompleted: state.progress.focusSessionsCompleted + 1,
          },
          dailyProgress: {
            ...state.dailyProgress,
            focusSessionsCompleted: state.dailyProgress.focusSessionsCompleted + 1,
            rewards: [...state.dailyProgress.rewards, reward],
          },
          recentRewards: [reward, ...state.recentRewards].slice(0, 5),
        }));

        get().addXP(xpEarned);
        get().addFocusPoints(fpEarned);
      },

      updateStreak: () => {
        const today = getTodayString();
        const { dailyProgress } = get();

        if (dailyProgress.date !== today) {
          // It's a new day
          if (dailyProgress.tasksCompleted > 0) {
            // Yesterday had completed tasks, increase streak
            set((state: GamificationStore) => ({
              progress: {
                ...state.progress,
                streak: state.progress.streak + 1,
                multiplier: Math.min(
                  1 + (state.progress.streak + 1) * GAMIFICATION_CONSTANTS.STREAK_MULTIPLIER_INCREMENT,
                  GAMIFICATION_CONSTANTS.MAX_STREAK_MULTIPLIER
                ),
              },
            }));
          } else {
            // Reset streak
            set((state: GamificationStore) => ({
              progress: {
                ...state.progress,
                streak: 0,
                multiplier: 1,
              },
            }));
          }
          // Reset daily progress
          set({ dailyProgress: createInitialDailyProgress() });
        }
      },

      resetDailyProgress: () => {
        set({ dailyProgress: createInitialDailyProgress() });
      },
    })) as GamificationStorePersist,
    {
      name: 'gamification-storage',
    }
  )
); 