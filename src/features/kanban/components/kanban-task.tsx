import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Task } from "./kanban-board";
import { Button } from "components/ui/button";
import { Card } from "components/ui/card";
import { DropdownMenu, DropdownMenuItem } from "components/ui/dropdown-menu";
import TaskDialog from "./dialogs/task-dialog";

interface KanbanTaskProps {
  task: Task;
  onUpdateTask?: (taskId: string, title: string, description: string) => void;
  onDeleteTask?: (taskId: string) => void;
  isOverlay?: boolean;
}

export default function KanbanTask({
  task,
  onUpdateTask,
  onDeleteTask,
  isOverlay = false,
}: KanbanTaskProps) {
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "task",
      task,
    },
    disabled: isOverlay,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleEditTask = () => {
    setIsEditTaskOpen(true);
  };

  const handleDeleteTask = () => {
    onDeleteTask?.(task.id);
  };

  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`overflow-visible group p-4 cursor-grab active:cursor-grabbing transition-all duration-200 relative hover:shadow-md hover:border-gray-300 ${
          isDragging ? "opacity-60" : ""
        } ${
          isOverlay
            ? "rotate-8 shadow-2xl border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50"
            : ""
        }`}
      >
        <div className="flex items-start justify-between mb-4 relative">
          <h4 className="font-bold text-gray-900 text-sm leading-5 flex-1 pr-2">
            {task.title}
          </h4>
          {!isOverlay && (
            <DropdownMenu
              trigger={
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 absolute right-0"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              }
            >
              <DropdownMenuItem onClick={handleEditTask}>
                <Edit className="w-3 h-3" />
                Edit Task
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDeleteTask} variant="danger">
                <Trash2 className="w-3 h-3" />
                Delete Task
              </DropdownMenuItem>
            </DropdownMenu>
          )}
        </div>

        {task.description && (
          <p className="text-gray-600 text-xs leading-5 line-clamp-3">
            {task.description}
          </p>
        )}
      </Card>

      {!isOverlay && (
        <TaskDialog
          open={isEditTaskOpen}
          onOpenChange={setIsEditTaskOpen}
          task={task}
          onUpdateTask={onUpdateTask}
        />
      )}
    </>
  );
}
