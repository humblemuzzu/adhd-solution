'use client';

import { useEffect } from 'react';
import { useGamificationStore } from '@/lib/stores/gamification-store';
import { useToast } from '@/hooks/use-toast';
import { Trophy } from 'lucide-react';

export const RewardToast = () => {
  const { recentRewards } = useGamificationStore();
  const { toast } = useToast();

  useEffect(() => {
    if (recentRewards.length > 0) {
      const latestReward = recentRewards[0];

      toast({
        title: latestReward.message,
        description: (
          <div className="flex items-center space-x-2 pt-2">
            <Trophy className="h-4 w-4 text-yellow-400" />
            <span>
              +{latestReward.xp} XP
              {latestReward.focusPoints > 0 && ` • +${latestReward.focusPoints} FP`}
            </span>
          </div>
        ),
        duration: 3000,
      });
    }
  }, [recentRewards, toast]);

  return null;
}; 