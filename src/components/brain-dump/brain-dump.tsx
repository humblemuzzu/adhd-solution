"use client";

import * as React from "react";
import { Plus, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <div className="w-[280px] min-w-[280px] h-full flex flex-col p-4 border-r bg-muted/5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">My Notes</h2>
      </div>

      {/* Modern Add Note Button/Input */}
      <div className="relative">
        {!isExpanded ? (
          <button
            onClick={() => {
              setIsExpanded(true);
              setTimeout(() => inputRef.current?.focus(), 100);
            }}
            className="w-full text-left px-4 py-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors text-muted-foreground flex items-center gap-2 group"
          >
            <Plus className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span className="group-hover:text-foreground transition-colors">Add new note</span>
          </button>
        ) : (
          <div className="rounded-lg border bg-card shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="p-3">
                <Input
                  ref={inputRef}
                  placeholder="What's on your mind?"
                  value={thought}
                  onChange={(e) => setThought(e.target.value)}
                  className="border-none bg-transparent px-0 text-lg focus-visible:ring-0 placeholder:text-muted-foreground/50"
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setIsExpanded(false);
                      setThought("");
                    }
                  }}
                />
              </div>
              <div className="border-t p-3 flex justify-end gap-2 bg-muted/50">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsExpanded(false);
                    setThought("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={!thought.trim()}
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
} 