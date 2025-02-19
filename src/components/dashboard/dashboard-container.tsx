"use client";

import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProgressBar } from "./progress-bar";
import { TaskList } from "./task-list";
import { Plus, Play, Pause, StopCircle, Trash2 } from "lucide-react";
import { useTaskContext, type Task } from "@/lib/task-context";
import { BrainDump } from "@/components/brain-dump/brain-dump";
import { Inbox } from "@/components/brain-dump/inbox";

export function DashboardContainer() {
  const {
    tasks,
    addTask,
    toggleTask,
    toggleMicroStep,
    editTask,
    deleteTask,
    addMicroStep,
    deleteMicroStep,
  } = useTaskContext();

  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState("15");
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedParentTask, setSelectedParentTask] = useState<string>("");
  const [isSubtask, setIsSubtask] = useState(false);
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [newMicroSteps, setNewMicroSteps] = useState<string[]>([]);
  const [newMicroStepTitle, setNewMicroStepTitle] = useState("");
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const mainTasks = tasks.filter(task => !task.isSubtask);

  const completedTasks = tasks.reduce((acc, task) => {
    if (task.microSteps.length > 0) {
      const completedMicroSteps = task.microSteps.filter((step) => step.completed).length;
      return acc + completedMicroSteps;
    }
    return acc + (task.completed ? 1 : 0);
  }, 0);

  const totalMicroSteps = tasks.reduce((acc, task) => {
    return acc + (task.microSteps.length > 0 ? task.microSteps.length : 1);
  }, 0);

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;

    if (isSubtask && !selectedParentTask) {
      alert("Please select a parent task");
      return;
    }

    const taskId = Date.now().toString();
    const microSteps = newMicroSteps.map((title, index) => ({
      id: `${taskId}-${index}`,
      title,
      completed: false
    }));

    addTask(
      newTaskTitle.trim(),
      isSubtask,
      isSubtask ? selectedParentTask : undefined,
      microSteps
    );

    setNewTaskTitle("");
    setIsSubtask(false);
    setSelectedParentTask("");
    setNewMicroSteps([]);
    setIsAddTaskDialogOpen(false);
  };

  const handleEditTask = () => {
    if (!editingTask || !newTaskTitle.trim()) return;
    editTask(
      editingTask.id,
      newTaskTitle.trim(),
      isSubtask,
      isSubtask ? selectedParentTask : undefined,
      newMicroSteps.map(title => ({ title }))
    );
    setEditingTask(null);
    setNewTaskTitle("");
    setIsSubtask(false);
    setSelectedParentTask("");
    setNewMicroSteps([]);
    setIsAddTaskDialogOpen(false);
  };

  const handleAddMicroStep = () => {
    if (!newMicroStepTitle.trim()) return;

    setNewMicroSteps(prev => [...prev, newMicroStepTitle.trim()]);
    setNewMicroStepTitle("");
  };

  const handleRemoveMicroStep = (index: number) => {
    setNewMicroSteps(prev => prev.filter((_, i) => i !== index));
  };

  const startFocusTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setIsTimerActive(true);
    setIsPaused(false);
    setTimeLeft(parseInt(selectedDuration) * 60);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsTimerActive(false);
          setIsPaused(false);
          return parseInt(selectedDuration) * 60;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsTimerActive(false);
          setIsPaused(false);
          return parseInt(selectedDuration) * 60;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsTimerActive(false);
    setIsPaused(false);
    setTimeLeft(parseInt(selectedDuration) * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const openAddTaskDialog = (isEdit: boolean = false) => {
    if (!isEdit) {
      setEditingTask(null);
      setNewTaskTitle("");
      setIsSubtask(false);
      setSelectedParentTask("");
      setNewMicroSteps([]);
    } else {
      setNewMicroSteps(editingTask?.microSteps.map(step => step.title) || []);
    }
    setIsAddTaskDialogOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      {/* Progress Section */}
      <Card className="p-6 transition-all hover:shadow-md">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Today&apos;s Progress</h2>
          <p className="text-sm text-muted-foreground">Track your daily achievements</p>
        </div>
        <div className="mt-4">
          <ProgressBar value={completedTasks} max={totalMicroSteps} />
        </div>
      </Card>

      {/* Brain Dump Section */}
      <div className="grid gap-8 md:grid-cols-2">
        <BrainDump />
        <Inbox />
      </div>

      {/* Focus Sprint Section */}
      <Card className={`p-8 transition-all ${isTimerActive ? "bg-primary/5 shadow-lg" : "bg-card hover:shadow-md"}`}>
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold tracking-tight">
            {isTimerActive ? `${formatTime(timeLeft)}` : "Ready to Focus?"}
          </h2>
          <div className="flex justify-center items-center space-x-4">
            {!isTimerActive && (
              <Select
                value={selectedDuration}
                onValueChange={setSelectedDuration}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="10">10 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="20">20 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
          <p className="text-base text-muted-foreground">
            {isTimerActive
              ? isPaused
                ? "Timer paused. Resume when ready!"
                : "Stay focused! You're doing great!"
              : `Start a ${selectedDuration}-minute focus sprint`}
          </p>
          <div className="flex justify-center space-x-4">
            {!isTimerActive ? (
              <Button
                size="lg"
                className="px-8 shadow-lg hover:shadow-xl transition-all"
                onClick={startFocusTimer}
              >
                <Play className="h-5 w-5" />
                Start Focus Sprint
              </Button>
            ) : (
              <>
                {isPaused ? (
                  <Button
                    size="lg"
                    className="px-8 shadow-lg hover:shadow-xl transition-all"
                    onClick={resumeTimer}
                  >
                    <Play className="h-5 w-5" />
                    Resume
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="px-8 shadow-lg hover:shadow-xl transition-all"
                    onClick={pauseTimer}
                  >
                    <Pause className="h-5 w-5" />
                    Pause
                  </Button>
                )}
                <Button
                  size="lg"
                  variant="destructive"
                  className="shadow-lg hover:shadow-xl transition-all"
                  onClick={stopTimer}
                >
                  <StopCircle className="h-5 w-5" />
                  Stop
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Tasks Section */}
      <Card className="p-6 transition-all hover:shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Today&apos;s Tasks</h2>
            <p className="text-sm text-muted-foreground">Manage your daily tasks and subtasks</p>
          </div>
          <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" onClick={() => openAddTaskDialog()}>
                <Plus className="h-4 w-4" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{editingTask ? "Edit Task" : "Add New Task"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <label htmlFor="task-title" className="text-sm font-medium">
                    Task Title
                  </label>
                  <Input
                    id="task-title"
                    placeholder="Enter your task title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="h-10"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-medium">Task Type</label>
                  <div className="flex items-center space-x-4">
                    <Button
                      type="button"
                      variant={!isSubtask ? "default" : "outline"}
                      onClick={() => setIsSubtask(false)}
                      size="sm"
                      className="flex-1"
                    >
                      Main Task
                    </Button>
                    <Button
                      type="button"
                      variant={isSubtask ? "default" : "outline"}
                      onClick={() => setIsSubtask(true)}
                      size="sm"
                      className="flex-1"
                    >
                      Subtask
                    </Button>
                  </div>
                </div>
                {isSubtask && mainTasks.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Parent Task</label>
                    <Select
                      value={selectedParentTask}
                      onValueChange={setSelectedParentTask}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a parent task" />
                      </SelectTrigger>
                      <SelectContent>
                        {mainTasks.map((task) => (
                          <SelectItem key={task.id} value={task.id}>
                            {task.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {!isSubtask && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Micro Steps</label>
                    <div className="space-y-2">
                      {newMicroSteps.map((step, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span className="flex-1">{step}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveMicroStep(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="flex items-center space-x-2">
                        <Input
                          placeholder="Add a micro step"
                          value={newMicroStepTitle}
                          onChange={(e) => setNewMicroStepTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && newMicroStepTitle.trim()) {
                              e.preventDefault();
                              handleAddMicroStep();
                            }
                          }}
                        />
                        <Button
                          type="button"
                          size="sm"
                          onClick={handleAddMicroStep}
                          disabled={!newMicroStepTitle.trim()}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddTaskDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={editingTask ? handleEditTask : handleAddTask}>
                  {editingTask ? "Save Changes" : "Add Task"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <TaskList
          tasks={tasks}
          onTaskToggle={toggleTask}
          onMicroStepToggle={toggleMicroStep}
          onEditTask={(task) => {
            setEditingTask(task);
            setNewTaskTitle(task.title);
            setIsSubtask(task.isSubtask);
            setSelectedParentTask(task.parentId || "");
            openAddTaskDialog(true);
          }}
          onDeleteTask={deleteTask}
        />
      </Card>
    </div>
  );
} 