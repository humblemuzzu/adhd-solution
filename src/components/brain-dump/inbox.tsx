"use client";

import * as React from "react";
import { ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useInbox, type InboxItem } from "@/lib/inbox-context";
import { cn } from "@/lib/utils";
import { NoteEditor } from "./note-editor";

interface InboxProps {
  className?: string;
}

export function Inbox({ className }: InboxProps) {
  const { items, removeItem, convertToTask } = useInbox();
  const unprocessedItems = items.filter((item) => !item.isProcessed);
  const [selectedNote, setSelectedNote] = React.useState<InboxItem | null>(null);

  return (
    <div className="h-full flex">
      {/* Notes List */}
      <div className="w-[280px] min-w-[280px] flex flex-col border-r">
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-semibold">Inbox</h1>
        </div>
        <div className="flex-1 overflow-auto p-4">
          {unprocessedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <p>Your inbox is empty</p>
              <p className="text-sm">Use the Brain Dump to capture new thoughts!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {unprocessedItems.map((item) => (
                <InboxItemCard
                  key={item.id}
                  item={item}
                  onDelete={removeItem}
                  onConvert={convertToTask}
                  onClick={() => setSelectedNote(item)}
                  isSelected={selectedNote?.id === item.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Note Editor */}
      <div className="flex-1 min-w-0 bg-background">
        {selectedNote ? (
          <NoteEditor
            note={selectedNote}
            onClose={() => setSelectedNote(null)}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <p>Select a note to view and edit</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface InboxItemCardProps {
  item: InboxItem;
  onDelete: (id: string) => void;
  onConvert: (id: string) => void;
  onClick: () => void;
  isSelected: boolean;
}

function InboxItemCard({ item, onDelete, onConvert, onClick, isSelected }: InboxItemCardProps) {
  return (
    <div
      className={cn(
        "group px-3 py-2 rounded-md hover:bg-muted/50 cursor-pointer",
        isSelected && "bg-muted/50"
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">{item.content}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(item.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
            className="h-7 w-7 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onConvert(item.id);
            }}
            className="h-7 w-7 text-muted-foreground"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
} 