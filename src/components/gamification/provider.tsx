'use client';

import { ReactNode, useEffect } from 'react';
import { useGamificationStore } from '@/lib/stores/gamification-store';
import { RewardToast } from './reward-toast';
import { Toaster } from '@/components/ui/toaster';

interface GamificationProviderProps {
  children: ReactNode;
}

export const GamificationProvider = ({ children }: GamificationProviderProps) => {
  const updateStreak = useGamificationStore((state) => state.updateStreak);

  // Check and update streak when component mounts and periodically
  useEffect(() => {
    updateStreak();

    // Check for streak updates every minute
    const interval = setInterval(updateStreak, 60000);
    return () => clearInterval(interval);
  }, [updateStreak]);

  return (
    <>
      {children}
      <RewardToast />
      <Toaster />
    </>
  );
}; 