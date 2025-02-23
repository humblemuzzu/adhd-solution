"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bold, Italic, Link, List, MoreHorizontal, ChevronLeft } from "lucide-react";
import { type InboxItem } from "@/lib/inbox-context";

interface NoteEditorProps {
  note: InboxItem;
  onClose: () => void;
}

export function NoteEditor({ note, onClose }: NoteEditorProps) {
  const [title, setTitle] = React.useState(note.content);
  const [content, setContent] = React.useState("");

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b shrink-0">
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg font-semibold bg-transparent border-none h-8 px-0 focus-visible:ring-0"
        />
      </div>

      {/* Toolbar */}
      <div className="border-b px-4 py-2 flex items-center gap-1 shrink-0">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Link className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <List className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 w-full p-6 bg-transparent border-none resize-none focus:outline-none text-base"
          placeholder="Start writing..."
        />
      </div>
    </div>
  );
} 