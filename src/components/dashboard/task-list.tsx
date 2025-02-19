"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { type Task } from "@/lib/task-context";

interface TaskListProps {
  tasks: Task[];
  onTaskToggle: (taskId: string) => void;
  onMicroStepToggle: (taskId: string, microStepId: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export function TaskList({
  tasks,
  onTaskToggle,
  onMicroStepToggle,
  onEditTask,
  onDeleteTask,
}: TaskListProps) {
  // Group tasks by parent
  const mainTasks = tasks.filter((task) => !task.isSubtask);
  const subtasksByParent = tasks.reduce((acc, task) => {
    if (task.isSubtask && task.parentId) {
      if (!acc[task.parentId]) {
        acc[task.parentId] = [];
      }
      acc[task.parentId].push(task);
    }
    return acc;
  }, {} as Record<string, Task[]>);

  const renderTask = (task: Task, level: number = 0) => (
    <div
      key={task.id}
      className={`group space-y-2 ${level > 0 ? "ml-8" : ""} animate-in slide-in-from-left-5 duration-300`}
    >
      <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
        <Checkbox
          id={task.id}
          checked={task.completed}
          onCheckedChange={() => onTaskToggle(task.id)}
          className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
        />
        <label
          htmlFor={task.id}
          className={`flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${task.completed ? "line-through text-muted-foreground" : ""
            }`}
        >
          {task.title}
        </label>
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-background"
            onClick={() => onEditTask(task)}
          >
            <Edit2 className="h-4 w-4" />
            <span className="sr-only">Edit task</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
            onClick={() => onDeleteTask(task.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete task</span>
          </Button>
        </div>
      </div>

      {/* Render subtasks */}
      {subtasksByParent[task.id]?.map((subtask) => renderTask(subtask, level + 1))}

      {/* Render micro-steps */}
      {task.microSteps.length > 0 && (
        <div className="ml-8 space-y-1.5 animate-in slide-in-from-left-3 duration-200">
          {task.microSteps.map((step) => (
            <div
              key={step.id}
              className="flex items-center space-x-2 p-1.5 rounded-md hover:bg-muted/30 transition-colors"
            >
              <Checkbox
                id={step.id}
                checked={step.completed}
                onCheckedChange={() => onMicroStepToggle(task.id, step.id)}
                className="data-[state=checked]:bg-primary/80 data-[state=checked]:text-primary-foreground"
              />
              <label
                htmlFor={step.id}
                className={`text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${step.completed ? "line-through text-muted-foreground" : ""
                  }`}
              >
                {step.title}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {mainTasks.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No tasks yet. Add your first task to get started!</p>
        </div>
      ) : (
        mainTasks.map((task) => renderTask(task))
      )}
    </div>
  );
} 