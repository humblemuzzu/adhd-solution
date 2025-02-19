'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface FocusSessionContextType {
  isInFocusSession: boolean;
  setIsInFocusSession: (value: boolean) => void;
}

const FocusSessionContext = createContext<FocusSessionContextType | undefined>(undefined);

export function useFocusSession() {
  const context = useContext(FocusSessionContext);
  if (context === undefined) {
    throw new Error('useFocusSession must be used within a FocusSessionProvider');
  }
  return context;
}

export function FocusSessionProvider({ children }: { children: ReactNode }) {
  const [isInFocusSession, setIsInFocusSession] = useState(false);

  return (
    <FocusSessionContext.Provider value={{ isInFocusSession, setIsInFocusSession }}>
      {children}
    </FocusSessionContext.Provider>
  );
} 