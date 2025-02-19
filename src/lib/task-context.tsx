"use client";

import React, { createContext, useContext, useState, type ReactNode, useCallback } from "react";
import { useGamificationStore } from "@/lib/stores/gamification-store";
import { useFocusSession } from "@/lib/focus-session-context";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
  isSubtask: boolean;
  parentId?: string;
  microSteps: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

export interface TaskContextType {
  tasks: Task[];
  completedTasks: Task[];
  streak: number;
  focusSessionsCompleted: number;
  addTask: (
    title: string,
    isSubtask?: boolean,
    parentId?: string,
    microSteps?: { id: string; title: string; completed: boolean }[]
  ) => void;
  toggleTask: (taskId: string) => void;
  toggleMicroStep: (taskId: string, microStepId: string) => void;
  editTask: (
    taskId: string,
    title: string,
    isSubtask: boolean,
    parentId?: string,
    microSteps?: { title: string }[]
  ) => void;
  deleteTask: (taskId: string) => void;
  addMicroStep: (taskId: string, title: string) => void;
  deleteMicroStep: (taskId: string, microStepId: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Initial tasks
const initialTasks = [
  {
    id: "1",
    title: "Complete project presentation",
    completed: false,
    createdAt: new Date(),
    isSubtask: false,
    microSteps: [
      { id: "1-1", title: "Create outline", completed: false },
      { id: "1-2", title: "Design slides", completed: false },
      { id: "1-3", title: "Practice delivery", completed: false },
    ],
  },
  {
    id: "2",
    title: "Review weekly goals",
    completed: false,
    createdAt: new Date(),
    isSubtask: false,
    microSteps: [
      { id: "2-1", title: "Check completed tasks", completed: false },
      { id: "2-2", title: "Update progress tracker", completed: false },
    ],
  },
];

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [streak, setStreak] = useState(0);
  const [focusSessionsCompleted, setFocusSessionsCompleted] = useState(0);
  const completeTask = useGamificationStore((state) => state.completeTask);
  const { isInFocusSession } = useFocusSession();

  const completedTasks = tasks.filter(task => task.completed);

  const addTask = (
    title: string,
    isSubtask: boolean = false,
    parentId?: string,
    microSteps: { id: string; title: string; completed: boolean }[] = []
  ) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date(),
      isSubtask,
      parentId,
      microSteps,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = useCallback((taskId: string) => {
    let shouldAwardPoints = false;

    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const newCompleted = !task.completed;
          shouldAwardPoints = newCompleted; // Track if we should award points

          if (task.isSubtask === false) {
            return {
              ...task,
              completed: newCompleted,
              completedAt: newCompleted ? new Date() : undefined,
              microSteps: task.microSteps.map((step) => ({
                ...step,
                completed: newCompleted,
              })),
            };
          }
          return {
            ...task,
            completed: newCompleted,
            completedAt: newCompleted ? new Date() : undefined,
            microSteps: task.microSteps.map((step) => ({
              ...step,
              completed: newCompleted,
            })),
          };
        }
        if (task.parentId === taskId) {
          const newCompleted = !task.completed;
          shouldAwardPoints = shouldAwardPoints || newCompleted;

          return {
            ...task,
            completed: newCompleted,
            completedAt: newCompleted ? new Date() : undefined,
            microSteps: task.microSteps.map((step) => ({
              ...step,
              completed: newCompleted,
            })),
          };
        }
        return task;
      })
    );

    // Award points after state update
    if (shouldAwardPoints) {
      completeTask(isInFocusSession);
    }
  }, [completeTask, isInFocusSession]);

  const toggleMicroStep = useCallback((taskId: string, microStepId: string) => {
    let shouldAwardPoints = false;

    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const newMicroSteps = task.microSteps.map((step) =>
            step.id === microStepId
              ? { ...step, completed: !step.completed }
              : step
          );
          const allCompleted = newMicroSteps.every((step) => step.completed);

          // Track if we should award points
          shouldAwardPoints = allCompleted && !task.completed;

          return {
            ...task,
            completed: allCompleted,
            completedAt: allCompleted ? new Date() : undefined,
            microSteps: newMicroSteps,
          };
        }
        return task;
      })
    );

    // Award points after state update
    if (shouldAwardPoints) {
      completeTask(isInFocusSession);
    }
  }, [completeTask, isInFocusSession]);

  const editTask = (
    taskId: string,
    title: string,
    isSubtask: boolean,
    parentId?: string,
    microSteps?: { title: string }[]
  ) => {
    setTasks((prevTasks) => {
      const taskToEdit = prevTasks.find((t) => t.id === taskId);
      if (!taskToEdit) return prevTasks;

      // If changing from main task to subtask, remove all subtasks
      if (!taskToEdit.isSubtask && isSubtask) {
        const subtaskIds = prevTasks
          .filter((t) => t.parentId === taskId)
          .map((t) => t.id);
        prevTasks = prevTasks.filter((t) => !subtaskIds.includes(t.id));
      }

      // If changing from subtask to main task, remove from parent's subtasks
      if (taskToEdit.isSubtask && !isSubtask) {
        prevTasks = prevTasks.map((t) =>
          t.id === taskToEdit.parentId
            ? {
              ...t,
              subtasks: t.microSteps.filter((s) => s.id !== taskId),
            }
            : t
        );
      }

      return prevTasks.map((task) =>
        task.id === taskId
          ? {
            ...task,
            title,
            isSubtask,
            parentId: isSubtask ? parentId : undefined,
            microSteps: microSteps
              ? microSteps.map((step, index) => ({
                id: `${taskId}-${index}`,
                title: step.title,
                completed: false,
              }))
              : task.microSteps,
          }
          : task
      );
    });
  };

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => {
      // Remove the task and its subtasks
      const filteredTasks = prevTasks.filter(
        (task) => task.id !== taskId && task.parentId !== taskId
      );
      return filteredTasks;
    });
  };

  const addMicroStep = (taskId: string, title: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
            ...task,
            microSteps: [
              ...task.microSteps,
              {
                id: `${taskId}-${task.microSteps.length}`,
                title,
                completed: false,
              },
            ],
          }
          : task
      )
    );
  };

  const deleteMicroStep = (taskId: string, microStepId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
            ...task,
            microSteps: task.microSteps.filter((step) => step.id !== microStepId),
          }
          : task
      )
    );
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        completedTasks,
        streak,
        focusSessionsCompleted,
        addTask,
        toggleTask,
        toggleMicroStep,
        editTask,
        deleteTask,
        addMicroStep,
        deleteMicroStep,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
} 