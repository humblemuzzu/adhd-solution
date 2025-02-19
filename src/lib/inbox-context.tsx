"use client";

import * as React from "react";

export interface InboxItem {
  id: string;
  content: string;
  createdAt: Date;
  isProcessed: boolean;
}

interface InboxContextType {
  items: InboxItem[];
  addItem: (content: string) => void;
  removeItem: (id: string) => void;
  markAsProcessed: (id: string) => void;
  convertToTask: (id: string) => void;
}

const InboxContext = React.createContext<InboxContextType | undefined>(undefined);

export function InboxProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<InboxItem[]>([]);

  const addItem = React.useCallback((content: string) => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        content,
        createdAt: new Date(),
        isProcessed: false,
      },
    ]);
  }, []);

  const removeItem = React.useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const markAsProcessed = React.useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isProcessed: true } : item
      )
    );
  }, []);

  const convertToTask = React.useCallback((id: string) => {
    // TODO: Implement task conversion
    markAsProcessed(id);
  }, [markAsProcessed]);

  const value = React.useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      markAsProcessed,
      convertToTask,
    }),
    [items, addItem, removeItem, markAsProcessed, convertToTask]
  );

  return (
    <InboxContext.Provider value={value}>{children}</InboxContext.Provider>
  );
}

export function useInbox() {
  const context = React.useContext(InboxContext);
  if (context === undefined) {
    throw new Error("useInbox must be used within an InboxProvider");
  }
  return context;
} 