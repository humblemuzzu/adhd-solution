"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, Pause, StopCircle, Maximize2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGamificationStore } from "@/lib/stores/gamification-store";
import { useFocusSession } from "@/lib/focus-session-context";

interface FocusTimerProps {
  variant?: "default" | "mini";
  className?: string;
}

export function FocusTimer({ variant = "default", className }: FocusTimerProps) {
  const [isActive, setIsActive] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [selectedDuration, setSelectedDuration] = React.useState("20");
  const [timeLeft, setTimeLeft] = React.useState(20 * 60);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const completeFocusSession = useGamificationStore((state) => state.completeFocusSession);
  const { setIsInFocusSession } = useFocusSession();

  // Calculate progress percentage
  const progress = React.useMemo(() => {
    const totalSeconds = parseInt(selectedDuration) * 60;
    return ((totalSeconds - timeLeft) / totalSeconds) * 100;
  }, [selectedDuration, timeLeft]);

  // Calculate stroke dash offset for circular progress
  const circumference = 2 * Math.PI * 120; // radius = 120
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setIsActive(true);
    setIsPaused(false);
    setTimeLeft(parseInt(selectedDuration) * 60);
    setIsInFocusSession(true);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsActive(false);
          setIsPaused(false);
          setIsInFocusSession(false);
          completeFocusSession();
          return parseInt(selectedDuration) * 60;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsPaused(true);
    setIsInFocusSession(false);
  };

  const resumeTimer = () => {
    setIsPaused(false);
    setIsInFocusSession(true);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsActive(false);
          setIsPaused(false);
          setIsInFocusSession(false);
          completeFocusSession();
          return parseInt(selectedDuration) * 60;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsActive(false);
    setIsPaused(false);
    setIsInFocusSession(false);
    setTimeLeft(parseInt(selectedDuration) * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setIsInFocusSession(false);
    };
  }, [setIsInFocusSession]);

  if (variant === "mini") {
    return (
      <Card className={cn(
        "transition-all duration-300 bg-[#fafafa]/5 dark:bg-[#141414]/3 backdrop-blur-md border-[#e2e2e2]/10 dark:border-[#262626]/5 shadow-sm",
        {
          "w-[320px]": isExpanded,
          "w-[180px]": !isExpanded
        },
        className
      )}>
        <div className="relative p-4 bg-gradient-to-b from-[#fafafa]/10 to-[#f5f5f5]/3 dark:from-[#141414]/5 dark:to-[#0a0a0a]/3 rounded-lg">
          {/* Mini Circular Progress */}
          <div className="relative w-[120px] h-[120px] mx-auto mb-3">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 256 256">
              <circle
                cx="128"
                cy="128"
                r="120"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                className="text-[#e2e2e2]/3 dark:text-[#262626]/5"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className={cn(
                  "transition-all duration-300",
                  isActive && !isPaused ? "text-primary/90" : "text-primary/40"
                )}
                style={{
                  transition: isActive && !isPaused ? "stroke-dashoffset 1s linear" : "none"
                }}
              />
            </svg>

            {/* Timer Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-2xl font-bold tracking-tight text-[#262626]/70 dark:text-[#e2e2e2]/70">
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>

          {/* Duration Pills */}
          {!isActive && (
            <div className="flex justify-center gap-2 mb-4">
              {["5", "10", "20"].map((duration) => (
                <button
                  key={duration}
                  onClick={() => setSelectedDuration(duration)}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm transition-all",
                    selectedDuration === duration
                      ? "bg-primary/90 dark:bg-primary/80 text-[#fafafa] dark:text-[#fafafa] shadow-sm"
                      : "bg-[#f5f5f5]/20 dark:bg-[#1a1a1a]/10 hover:bg-[#f0f0f0]/30 dark:hover:bg-[#262626]/20 text-[#262626]/50 dark:text-[#e2e2e2]/50 backdrop-blur-sm"
                  )}
                >
                  {duration}m
                </button>
              ))}
            </div>
          )}

          {/* Controls */}
          <div className="flex justify-center gap-2">
            {!isActive ? (
              <Button
                size="sm"
                onClick={startTimer}
                className="bg-primary/90 hover:bg-primary/80 dark:bg-primary/80 dark:hover:bg-primary/70 text-[#fafafa] shadow-md hover:shadow-lg transition-all"
              >
                <Play className="h-4 w-4" />
              </Button>
            ) : (
              <>
                <Button
                  size="sm"
                  onClick={isPaused ? resumeTimer : pauseTimer}
                  className="bg-primary/90 hover:bg-primary/80 dark:bg-primary/80 dark:hover:bg-primary/70 text-[#fafafa] shadow-md hover:shadow-lg transition-all"
                >
                  {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={stopTimer}
                  className="bg-destructive/80 hover:bg-destructive/70 dark:bg-destructive/70 dark:hover:bg-destructive/60 shadow-md hover:shadow-lg transition-all"
                >
                  <StopCircle className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>

          {/* Expand Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6 hover:bg-[#f5f5f5]/20 dark:hover:bg-[#262626]/10"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Maximize2 className="h-3 w-3" />
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "max-w-2xl mx-auto bg-[#fafafa]/5 dark:bg-[#141414]/3 backdrop-blur-md border-[#e2e2e2]/10 dark:border-[#262626]/5 shadow-sm",
      className
    )}>
      <div className="p-8 text-center space-y-8 bg-gradient-to-b from-[#fafafa]/10 to-[#f5f5f5]/3 dark:from-[#141414]/5 dark:to-[#0a0a0a]/3 rounded-lg">
        <div className="relative w-[320px] h-[320px] mx-auto">
          {/* Circular Progress Background */}
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 256 256">
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              className="text-[#e2e2e2]/3 dark:text-[#262626]/5"
            />
            {/* Animated Progress */}
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={cn(
                "transition-all duration-300",
                isActive && !isPaused ? "text-primary/90" : "text-primary/40"
              )}
              style={{
                transition: isActive && !isPaused ? "stroke-dashoffset 1s linear" : "none"
              }}
            />
          </svg>

          {/* Timer Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-6xl font-bold tracking-tight text-[#262626]/70 dark:text-[#e2e2e2]/70">
              {formatTime(timeLeft)}
            </div>
            <p className="text-sm text-[#525252]/70 dark:text-[#a3a3a3]/70 mt-2">
              {isActive
                ? isPaused
                  ? "Timer paused"
                  : "Stay focused!"
                : "Ready to focus?"}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          {!isActive && (
            <div className="flex gap-3">
              {["5", "10", "20", "30"].map((duration) => (
                <button
                  key={duration}
                  onClick={() => setSelectedDuration(duration)}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm transition-all",
                    selectedDuration === duration
                      ? "bg-primary/90 dark:bg-primary/80 text-[#fafafa] dark:text-[#fafafa] shadow-sm"
                      : "bg-[#f5f5f5]/20 dark:bg-[#1a1a1a]/10 hover:bg-[#f0f0f0]/30 dark:hover:bg-[#262626]/20 text-[#262626]/50 dark:text-[#e2e2e2]/50 backdrop-blur-sm"
                  )}
                >
                  {duration}m
                </button>
              ))}
            </div>
          )}

          <div className="flex justify-center gap-4">
            {!isActive ? (
              <Button
                size="lg"
                className="px-8 bg-primary/90 hover:bg-primary/80 dark:bg-primary/80 dark:hover:bg-primary/70 text-[#fafafa] shadow-md hover:shadow-lg transition-all"
                onClick={startTimer}
              >
                <Play className="h-5 w-5" />
                Start Focus
              </Button>
            ) : (
              <>
                <Button
                  size="lg"
                  className="px-8 bg-primary/90 hover:bg-primary/80 dark:bg-primary/80 dark:hover:bg-primary/70 text-[#fafafa] shadow-md hover:shadow-lg transition-all"
                  onClick={isPaused ? resumeTimer : pauseTimer}
                >
                  {isPaused ? (
                    <>
                      <Play className="h-5 w-5 mr-2" />
                      Resume
                    </>
                  ) : (
                    <>
                      <Pause className="h-5 w-5 mr-2" />
                      Pause
                    </>
                  )}
                </Button>
                <Button
                  size="lg"
                  variant="destructive"
                  className="bg-destructive/80 hover:bg-destructive/70 dark:bg-destructive/70 dark:hover:bg-destructive/60 shadow-md hover:shadow-lg transition-all"
                  onClick={stopTimer}
                >
                  <StopCircle className="h-5 w-5 mr-2" />
                  Stop
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
} 