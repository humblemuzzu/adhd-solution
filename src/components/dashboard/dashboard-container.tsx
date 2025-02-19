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
import { Plus } from "lucide-react";
import { useTaskContext, type Task } from "@/lib/task-context";

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

      {/* Tasks Section */}
      <Card className="p-6 transition-all hover:shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Today&apos;s Tasks</h2>
            <p className="text-sm text-muted-foreground">Manage your daily tasks and subtasks</p>
          </div>
          <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => openAddTaskDialog(false)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingTask ? "Edit Task" : "Add New Task"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Task title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                  />
                </div>
                {mainTasks.length > 0 && (
                  <div className="space-y-2">
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
                  <div className="space-y-2">
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
                <div className="space-y-2">
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
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddTaskDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTask}>
                  {editingTask ? "Save Changes" : "Add Task"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
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
      </Card>
    </div>
  );
} 