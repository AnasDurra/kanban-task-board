import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Edit, GripVertical, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Column } from "./kanban-board";
import KanbanTask from "./kanban-task";
import { Badge } from "components/ui/badge";
import { Button } from "components/ui/button";
import { Card, CardContent, CardHeader } from "components/ui/card";
import { DropdownMenu, DropdownMenuItem } from "components/ui/dropdown-menu";
import TaskDialog from "./dialogs/task-dialog";
import ColumnDialog from "./dialogs/column-dialog";

interface KanbanColumnProps {
  column: Column;
  onUpdateColumn: (columnId: string, title: string, color: string) => void;
  onDeleteColumn: (columnId: string) => void;
  onAddTask: (columnId: string, title: string, description: string) => void;
  onUpdateTask: (taskId: string, title: string, description: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export default function KanbanColumn({
  column,
  onUpdateColumn,
  onDeleteColumn,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}: KanbanColumnProps) {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isEditColumnOpen, setIsEditColumnOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "column",
      column,
    },
  });

  const { setNodeRef: setDroppableRef } = useDroppable({
    id: column.id,
    data: {
      type: "column",
      column,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const setNodeRef = (node: HTMLElement | null) => {
    setSortableRef(node);
    setDroppableRef(node);
  };

  const handleEditColumn = () => {
    setIsEditColumnOpen(true);
  };

  const handleDeleteColumn = () => {
    onDeleteColumn(column.id);
  };

  return (
    <div ref={setNodeRef} style={style} className="flex-shrink-0">
      <Card
        className={`w-80 group hover:shadow-xl hover:-translate-y-1 ${
          isDragging
            ? "opacity-40 shadow-2xl border-indigo-500 rotate-2 scale-105"
            : ""
        }`}
      >
        <div
          className="h-1 w-full"
          style={{
            backgroundColor: column.color,
            background: `linear-gradient(135deg, ${column.color} 0%, ${column.color}CC 100%)`,
            boxShadow: isDragging ? `0 0 20px ${column.color}60` : "none",
          }}
        />

        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                {...attributes}
                {...listeners}
                className="opacity-0 group-hover:opacity-100 hover:opacity-100 w-8 h-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 hover:scale-110 cursor-grab active:cursor-grabbing"
              >
                <GripVertical className="w-4 h-4" />
              </Button>
              <div
                className="w-3 h-3 rounded-full shadow-sm"
                style={{
                  backgroundColor: column.color,
                  boxShadow: `0 0 0 3px ${column.color}20`,
                }}
              />
              <h3 className="text-lg font-bold text-gray-800">
                {column.title}
              </h3>
              <Badge
                style={{
                  backgroundColor: `${column.color}15`,
                  color: column.color,
                }}
              >
                {column.tasks.length}
              </Badge>
            </div>
            <DropdownMenu
              trigger={
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              }
            >
              <DropdownMenuItem onClick={handleEditColumn}>
                <Edit className="w-4 h-4" />
                Edit Column
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDeleteColumn} variant="danger">
                <Trash2 className="w-4 h-4" />
                Delete Column
              </DropdownMenuItem>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-3">
            <SortableContext
              items={column.tasks.map((task) => task.id)}
              strategy={verticalListSortingStrategy}
            >
              {column.tasks.map((task) => (
                <KanbanTask
                  key={task.id}
                  task={task}
                  onUpdateTask={onUpdateTask}
                  onDeleteTask={onDeleteTask}
                />
              ))}
            </SortableContext>

            <Button
              variant="outline"
              onClick={() => setIsAddTaskOpen(true)}
              className="border-2 border-dashed py-4 my-4 hover:-translate-y-0.5"
              style={{
                borderColor: `${column.color}40`,
                backgroundColor: `${column.color}08`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = column.color;
                e.currentTarget.style.backgroundColor = `${column.color}15`;
                e.currentTarget.style.color = column.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${column.color}40`;
                e.currentTarget.style.backgroundColor = `${column.color}08`;
                e.currentTarget.style.color = "#6b7280";
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Task
            </Button>
          </div>
        </CardContent>
      </Card>

      <TaskDialog
        open={isAddTaskOpen}
        onOpenChange={setIsAddTaskOpen}
        onAddTask={(title, description) =>
          onAddTask(column.id, title, description)
        }
      />

      <ColumnDialog
        open={isEditColumnOpen}
        onOpenChange={setIsEditColumnOpen}
        onSubmit={(title, color) => onUpdateColumn(column.id, title, color)}
        isEdit={true}
        currentTitle={column.title}
        currentColor={column.color}
      />
    </div>
  );
}
