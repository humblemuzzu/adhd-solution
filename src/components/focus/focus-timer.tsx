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
import { Play, Pause, StopCircle } from "lucide-react";

export function FocusTimer() {
  const [isActive, setIsActive] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [selectedDuration, setSelectedDuration] = React.useState("15");
  const [timeLeft, setTimeLeft] = React.useState(15 * 60);
  const timerRef = React.useRef<NodeJS.Timeout>();

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setIsActive(true);
    setIsPaused(false);
    setTimeLeft(parseInt(selectedDuration) * 60);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsActive(false);
          setIsPaused(false);
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
  };

  const resumeTimer = () => {
    setIsPaused(false);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsActive(false);
          setIsPaused(false);
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
    };
  }, []);

  return (
    <Card className="max-w-2xl mx-auto">
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