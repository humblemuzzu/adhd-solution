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

interface InboxProps {
  className?: string;
}

export function Inbox({ className }: InboxProps) {
  const { items, removeItem, convertToTask } = useInbox();
  const unprocessedItems = items.filter((item) => !item.isProcessed);

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Inbox</CardTitle>
        <CardDescription>
          Process your captured thoughts and convert them into actionable tasks
        </CardDescription>
      </CardHeader>
      <CardContent>
        {unprocessedItems.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Your inbox is empty. Use the Brain Dump to capture new thoughts!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {unprocessedItems.map((item) => (
              <InboxItemCard
                key={item.id}
                item={item}
                onDelete={removeItem}
                onConvert={convertToTask}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface InboxItemCardProps {
  item: InboxItem;
  onDelete: (id: string) => void;
  onConvert: (id: string) => void;
}

function InboxItemCard({ item, onDelete, onConvert }: InboxItemCardProps) {
  return (
    <div className="group flex items-center justify-between gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{item.content}</p>
        <p className="text-xs text-muted-foreground">
          {new Date(item.createdAt).toLocaleString()}
        </p>
      </div>
      <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(item.id)}
          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete thought</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onConvert(item.id)}
          className="h-8 w-8"
        >
          <ArrowRight className="h-4 w-4" />
          <span className="sr-only">Convert to task</span>
        </Button>
      </div>
    </div>
  );
} 