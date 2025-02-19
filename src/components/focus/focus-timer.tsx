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
import { Play, Pause, StopCircle, Maximize2 } from "lucide-react";
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
  const [selectedDuration, setSelectedDuration] = React.useState("15");
  const [timeLeft, setTimeLeft] = React.useState(15 * 60);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const completeFocusSession = useGamificationStore((state) => state.completeFocusSession);
  const { setIsInFocusSession } = useFocusSession();

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
          // Award gamification points for completing a focus session
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
          // Award gamification points for completing a focus session
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
        "transition-all duration-300",
        {
          "w-[400px]": isExpanded,
          "w-[200px]": !isExpanded
        },
        className
      )}>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {isActive ? formatTime(timeLeft) : "Focus Timer"}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>

          {isExpanded && !isActive && (
            <Select
              value={selectedDuration}
              onValueChange={setSelectedDuration}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 minutes</SelectItem>
                <SelectItem value="10">10 minutes</SelectItem>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="20">20 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
              </SelectContent>
            </Select>
          )}

          <div className="flex justify-end space-x-2">
            {!isActive ? (
              <Button
                size="sm"
                onClick={startTimer}
                className="shadow hover:shadow-md transition-shadow"
              >
                <Play className="h-4 w-4 mr-1" />
                Start
              </Button>
            ) : (
              <>
                {isPaused ? (
                  <Button
                    size="sm"
                    onClick={resumeTimer}
                    className="shadow hover:shadow-md transition-shadow"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Resume
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={pauseTimer}
                    className="shadow hover:shadow-md transition-shadow"
                  >
                    <Pause className="h-4 w-4 mr-1" />
                    Pause
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={stopTimer}
                  className="shadow hover:shadow-md transition-shadow"
                >
                  <StopCircle className="h-4 w-4 mr-1" />
                  Stop
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn("max-w-2xl mx-auto", className)}>
      <div className="p-8 text-center space-y-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold tracking-tight">
            {isActive ? formatTime(timeLeft) : "Ready to Focus?"}
          </h2>
          <p className="text-muted-foreground">
            {isActive
              ? isPaused
                ? "Timer paused. Resume when ready!"
                : "Stay focused! You're doing great!"
              : "Choose your focus duration and get started"}
          </p>
        </div>

        <div className="flex justify-center items-center space-x-4">
          {!isActive && (
            <Select
              value={selectedDuration}
              onValueChange={setSelectedDuration}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 minutes</SelectItem>
                <SelectItem value="10">10 minutes</SelectItem>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="20">20 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="flex justify-center space-x-4">
          {!isActive ? (
            <Button
              size="lg"
              className="px-8 shadow-lg hover:shadow-xl transition-all"
              onClick={startTimer}
            >
              <Play className="h-5 w-5 mr-2" />
              Start Focus Sprint
            </Button>
          ) : (
            <>
              {isPaused ? (
                <Button
                  size="lg"
                  className="px-8 shadow-lg hover:shadow-xl transition-all"
                  onClick={resumeTimer}
                >
                  <Play className="h-5 w-5 mr-2" />
                  Resume
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="px-8 shadow-lg hover:shadow-xl transition-all"
                  onClick={pauseTimer}
                >
                  <Pause className="h-5 w-5 mr-2" />
                  Pause
                </Button>
              )}
              <Button
                size="lg"
                variant="destructive"
                className="shadow-lg hover:shadow-xl transition-all"
                onClick={stopTimer}
              >
                <StopCircle className="h-5 w-5 mr-2" />
                Stop
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
} 