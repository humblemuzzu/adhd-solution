"use client";

import * as React from "react";
import { Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useInbox } from "@/lib/inbox-context";

interface BrainDumpProps {
  className?: string;
}

export function BrainDump({ className }: BrainDumpProps) {
  const { addItem } = useInbox();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [thought, setThought] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (thought.trim()) {
      addItem(thought.trim());
      setThought("");
      setIsExpanded(false);
    }
  };

  return (
    <Card className={cn("w-full transition-all", className)}>
      <CardHeader className="pb-3">
        <CardTitle>Brain Dump</CardTitle>
        <CardDescription>
          Quickly capture your thoughts before they slip away
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div
            className={cn(
              "flex items-center gap-2 transition-all",
              isExpanded ? "flex-col" : "flex-row"
            )}
          >
            {!isExpanded ? (
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start text-muted-foreground"
                onClick={() => {
                  setIsExpanded(true);
                  setTimeout(() => inputRef.current?.focus(), 100);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Capture a thought...
              </Button>
            ) : (
              <>
                <Input
                  ref={inputRef}
                  placeholder="What's on your mind?"
                  value={thought}
                  onChange={(e) => setThought(e.target.value)}
                  className="w-full"
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setIsExpanded(false);
                      setThought("");
                    }
                  }}
                />
                <div className="flex w-full gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setIsExpanded(false);
                      setThought("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={!thought.trim()}
                  >
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                </div>
              </>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 