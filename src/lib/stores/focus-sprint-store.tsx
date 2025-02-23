"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface SprintDuration {
  label: string;
  minutes: number;
}

interface State {
  timeRemaining: number;
  selectedDuration: SprintDuration;
  isActive: boolean;
  currentTask: string | null;
  isConfiguring: boolean;
}

type Action =
  | { type: 'START_SPRINT'; taskId: string }
  | { type: 'END_SPRINT' }
  | { type: 'SET_TIME'; time: number }
  | { type: 'SET_DURATION'; duration: SprintDuration };

const DEFAULT_DURATIONS: SprintDuration[] = [
  { label: "5 minutes", minutes: 5 },
  { label: "15 minutes", minutes: 15 },
  { label: "25 minutes", minutes: 25 },
  { label: "45 minutes", minutes: 45 },
];

const initialState: State = {
  timeRemaining: 0,
  selectedDuration: DEFAULT_DURATIONS[1],
  isActive: false,
  currentTask: null,
  isConfiguring: true,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START_SPRINT':
      return {
        ...state,
        isActive: true,
        isConfiguring: false,
        timeRemaining: state.selectedDuration.minutes * 60,
        currentTask: action.taskId,
      };
    case 'END_SPRINT':
      return {
        ...state,
        isActive: false,
        isConfiguring: true,
        timeRemaining: 0,
        currentTask: null,
      };
    case 'SET_TIME':
      return {
        ...state,
        timeRemaining: Math.max(0, action.time),
      };
    case 'SET_DURATION':
      return {
        ...state,
        selectedDuration: action.duration,
      };
    default:
      return state;
  }
}

const SprintContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
  durations: SprintDuration[];
} | null>(null);

export function SprintProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch, durations: DEFAULT_DURATIONS };

  return (
    <SprintContext.Provider value={value}>
      {children}
    </SprintContext.Provider>
  );
}

export function useSprint() {
  const context = useContext(SprintContext);
  if (!context) {
    throw new Error('useSprint must be used within a SprintProvider');
  }
  return context;
} 