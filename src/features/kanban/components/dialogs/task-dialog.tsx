import React, { useState, useEffect } from "react";
import { Dialog, DialogFooter } from "components/ui/dialog";
import { Input } from "components/ui/input";
import { Textarea } from "components/ui/textarea";
import { Button } from "components/ui/button";
import type { Task } from "../kanban-board";

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task;
  onAddTask?: (title: string, description: string) => void;
  onUpdateTask?: (taskId: string, title: string, description: string) => void;
}

export default function TaskDialog({
  open,
  onOpenChange,
  task,
  onAddTask,
  onUpdateTask,
}: TaskDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (open && task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [open, task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      if (onAddTask) {
        onAddTask(title.trim(), description.trim());
      } else if (onUpdateTask && task) {
        onUpdateTask(task.id, title.trim(), description.trim());
      }
      setTitle("");
      setDescription("");
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={task ? "Edit Task" : "Create New Task"}
      description={
        task
          ? "Update the task details to keep your workflow organized and up-to-date."
          : "Add a new task with a clear title and detailed description to help track your progress."
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            label="Task Title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
          />
          <Textarea
            label="Description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add details, requirements, or notes about this task..."
          />
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={!title.trim()}>
            {task ? "Update Task" : "Create Task"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
