import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useKanban } from "../hooks/useKanban";
import ColumnDialog from "./dialogs/column-dialog";
import KanbanColumn from "./kanban-column";
import KanbanTask from "./kanban-task";

export interface Task {
  id: string;
  title: string;
  description: string;
  columnId: string;
}

export interface Column {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

export default function KanbanBoard() {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isAddColumnOpen, setIsAddColumnOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const {
    columns,
    setColumns,
    addColumn,
    updateColumn,
    deleteColumn,
    addTask,
    updateTask,
    deleteTask,
    findTask,
    findTaskIndex,
  } = useKanban();

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (active.data.current?.type === "task") {
      const task = findTask(active.id as string);
      setActiveTask(task);
    } else if (active.data.current?.type === "column") {
      setActiveTask(null);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "task";
    const isOverTask = over.data.current?.type === "task";
    const isOverColumn = over.data.current?.type === "column";

    if (isActiveTask) {
      if (isOverTask) {
        setColumns((columns) => {
          const activeIndex = findTaskIndex(activeId);
          const overIndex = findTaskIndex(overId);

          if (activeIndex.columnIndex !== overIndex.columnIndex) {
            const newColumns = [...columns];
            const [movedTask] = newColumns[
              activeIndex.columnIndex
            ].tasks.splice(activeIndex.taskIndex, 1);
            movedTask.columnId = newColumns[overIndex.columnIndex].id;
            newColumns[overIndex.columnIndex].tasks.splice(
              overIndex.taskIndex,
              0,
              movedTask
            );
            return newColumns;
          } else {
            const newColumns = [...columns];
            newColumns[activeIndex.columnIndex].tasks = arrayMove(
              newColumns[activeIndex.columnIndex].tasks,
              activeIndex.taskIndex,
              overIndex.taskIndex
            );
            return newColumns;
          }
        });
      }

      if (isOverColumn) {
        setColumns((columns) => {
          const activeIndex = findTaskIndex(activeId);
          const overColumnIndex = columns.findIndex((col) => col.id === overId);

          if (activeIndex.columnIndex !== overColumnIndex) {
            const newColumns = [...columns];
            const [movedTask] = newColumns[
              activeIndex.columnIndex
            ].tasks.splice(activeIndex.taskIndex, 1);
            movedTask.columnId = overId;
            newColumns[overColumnIndex].tasks.push(movedTask);
            return newColumns;
          }

          return columns;
        });
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const isActiveColumn = active.data.current?.type === "column";
    const isOverColumn = over.data.current?.type === "column";
    const isActiveTask = active.data.current?.type === "task";
    const isOverTask = over.data.current?.type === "task";

    if (isActiveColumn) {
      setColumns((columns) => {
        const activeIndex = columns.findIndex((col) => col.id === activeId);
        let overIndex = -1;

        if (isOverColumn) {
          overIndex = columns.findIndex((col) => col.id === overId);
        } else if (isOverTask) {
          const taskColumn = columns.find((col) =>
            col.tasks.some((task) => task.id === overId)
          );
          if (taskColumn) {
            overIndex = columns.findIndex((col) => col.id === taskColumn.id);
          }
        }

        if (overIndex !== -1 && activeIndex !== overIndex) {
          return arrayMove(columns, activeIndex, overIndex);
        }

        return columns;
      });
      return;
    }

    if (isActiveTask) {
      if (isOverTask) {
        setColumns((columns) => {
          const activeIndex = findTaskIndex(activeId);
          const overIndex = findTaskIndex(overId);

          if (activeIndex.columnIndex === overIndex.columnIndex) {
            const newColumns = [...columns];
            const tasks = [...newColumns[activeIndex.columnIndex].tasks];
            tasks.splice(activeIndex.taskIndex, 1);
            tasks.splice(
              overIndex.taskIndex,
              0,
              newColumns[activeIndex.columnIndex].tasks[activeIndex.taskIndex]
            );

            newColumns[activeIndex.columnIndex] = {
              ...newColumns[activeIndex.columnIndex],
              tasks,
            };

            return newColumns;
          }

          return columns;
        });
      }
    }
  };

  return (
    <div className="w-full relative z-10">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-8 overflow-x-auto py-6 px-4">
          <SortableContext
            items={columns.map((col) => col.id)}
            strategy={horizontalListSortingStrategy}
          >
            {Array.isArray(columns) &&
              columns.map((column) => (
                <KanbanColumn
                  key={column.id}
                  column={column}
                  onUpdateColumn={updateColumn}
                  onDeleteColumn={deleteColumn}
                  onAddTask={addTask}
                  onUpdateTask={updateTask}
                  onDeleteTask={deleteTask}
                />
              ))}
          </SortableContext>

          <div className="flex-shrink-0">
            <Button
              variant="outline"
              onClick={() => setIsAddColumnOpen(true)}
              className="h-14 min-w-80 border-2 border-dashed  bg-white/5 backdrop-blur-sm font-semibold text-base  hover:bg-white/15 hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5 mr-3" />
              Add New Column
            </Button>
          </div>
        </div>

        <DragOverlay>
          {activeTask && <KanbanTask task={activeTask} isOverlay />}
        </DragOverlay>
      </DndContext>

      <ColumnDialog
        open={isAddColumnOpen}
        onOpenChange={setIsAddColumnOpen}
        onSubmit={addColumn}
        isEdit={false}
      />
    </div>
  );
}
