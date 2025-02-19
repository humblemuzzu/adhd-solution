"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TaskList } from "./task-list";
import { Plus } from "lucide-react";
import { useTaskContext, type Task } from "@/lib/task-context";
import { DailyProgress } from "./progress-bar";

// Affirmations based on time of day
const getTimeBasedAffirmation = () => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return [
      "Good morning, Muzammil! Ready to conquer today? ☀️",
      "Rise and shine! Let's make today amazing 🌅",
      "Morning, champion! Time to crush those goals 💪"
    ];
  } else if (hour < 17) {
    return [
      "Keep the momentum going, Muzammil! 🚀",
      "You're doing great! Keep pushing forward ✨",
      "Afternoon hustle! You've got this 💫"
    ];
  } else {
    return [
      "Evening, Muzammil! Let's finish strong 🌙",
      "Great work today! Wrap up with confidence ⭐",
      "Final stretch! Make it count 🎯"
    ];
  }
};

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

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedParentTask, setSelectedParentTask] = useState<string>("");
  const [isSubtask, setIsSubtask] = useState(false);
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [newMicroSteps, setNewMicroSteps] = useState<string[]>([]);
  const [newMicroStepTitle, setNewMicroStepTitle] = useState("");
  const [affirmation, setAffirmation] = useState<string>("");

  // Handle affirmation on client-side only
  useEffect(() => {
    const affirmations = getTimeBasedAffirmation();
    const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    setAffirmation(randomAffirmation);
  }, []);

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
    <div className="space-y-4 sm:space-y-8 animate-in fade-in-50 duration-500">
      <Card className="border-0 sm:border">
        <CardHeader className="px-4 sm:px-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="space-y-1">
              <CardTitle>Today's Tasks</CardTitle>
              <CardDescription>{affirmation}</CardDescription>
            </div>
            <Button
              onClick={() => setIsAddTaskDialogOpen(true)}
              className="w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <TaskList
            tasks={tasks}
            onToggleTask={toggleTask}
            onToggleMicroStep={toggleMicroStep}
            onEditTask={(task) => {
              setEditingTask(task);
              setNewTaskTitle(task.title);
              setIsSubtask(task.isSubtask);
              setSelectedParentTask(task.parentId || "");
              openAddTaskDialog(true);
            }}
            onDeleteTask={deleteTask}
            onAddMicroStep={addMicroStep}
            onDeleteMicroStep={deleteMicroStep}
          />
        </CardContent>
      </Card>

      <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
        <DialogContent className="sm:max-w-[425px] gap-0">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle>{editingTask ? "Edit Task" : "Add New Task"}</DialogTitle>
          </DialogHeader>
          <div className="px-6 py-4 space-y-4">
            <div className="space-y-3">
              <Input
                placeholder="Task title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
            </div>
            {mainTasks.length > 0 && (
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Is this a subtask?
                </label>
                <Select
                  value={isSubtask ? "yes" : "no"}
                  onValueChange={(value) => setIsSubtask(value === "yes")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="yes">Yes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            {isSubtask && (
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Parent Task
                </label>
                <Select
                  value={selectedParentTask}
                  onValueChange={setSelectedParentTask}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select parent task..." />
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
            <div className="space-y-3">
              <label className="text-sm font-medium">
                Micro Steps (optional)
              </label>
              <div className="space-y-2">
                {newMicroSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={step}
                      onChange={(e) => {
                        const updatedSteps = [...newMicroSteps];
                        updatedSteps[index] = e.target.value;
                        setNewMicroSteps(updatedSteps);
                      }}
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        setNewMicroSteps(newMicroSteps.filter((_, i) => i !== index));
                      }}
                    >
                      <Plus className="h-4 w-4 rotate-45" />
                    </Button>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Add a micro step..."
                    value={newMicroStepTitle}
                    onChange={(e) => setNewMicroStepTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newMicroStepTitle.trim()) {
                        setNewMicroSteps([...newMicroSteps, newMicroStepTitle.trim()]);
                        setNewMicroStepTitle("");
                      }
                    }}
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => {
                      if (newMicroStepTitle.trim()) {
                        setNewMicroSteps([...newMicroSteps, newMicroStepTitle.trim()]);
                        setNewMicroStepTitle("");
                      }
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="px-6 py-4 border-t">
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 space-y-2 space-y-reverse sm:space-y-0 w-full">
              <Button
                variant="outline"
                onClick={() => setIsAddTaskDialogOpen(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddTask}
                className="w-full sm:w-auto"
              >
                {editingTask ? "Save Changes" : "Add Task"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 