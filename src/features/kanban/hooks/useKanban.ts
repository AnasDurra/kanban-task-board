import { useEffect, useState } from "react";
import { loadFromStorage, saveToStorage } from "lib/localStorage";
import type { Column, Task } from "../types";

const STORAGE_KEY = "kanban-board-data";

const defaultColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    color: "#ef4444",
    tasks: [
      {
        id: "task-1",
        title: "Design System Setup",
        description:
          "Create a comprehensive design system with components and guidelines",
        columnId: "todo",
      },
      {
        id: "task-2",
        title: "User Authentication",
        description:
          "Implement secure user login and registration functionality",
        columnId: "todo",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "#f59e0b",
    tasks: [
      {
        id: "task-3",
        title: "API Integration",
        description: "Connect frontend with backend API endpoints",
        columnId: "in-progress",
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "#10b981",
    tasks: [
      {
        id: "task-4",
        title: "Project Setup",
        description: "Initialize project structure and dependencies",
        columnId: "done",
      },
    ],
  },
];

export function useKanban() {
  const [columns, setColumns] = useState<Column[]>(() =>
    loadFromStorage<Column[]>(STORAGE_KEY, defaultColumns)
  );

  useEffect(() => {
    saveToStorage(STORAGE_KEY, columns);
  }, [columns]);

  const findTask = (id: string): Task | null => {
    for (const column of columns) {
      const task = column.tasks.find((task) => task.id === id);
      if (task) return task;
    }
    return null;
  };

  const findTaskIndex = (id: string) => {
    for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
      const taskIndex = columns[columnIndex].tasks.findIndex(
        (task) => task.id === id
      );
      if (taskIndex !== -1) {
        return { columnIndex, taskIndex };
      }
    }
    return { columnIndex: -1, taskIndex: -1 };
  };

  const addColumn = (title: string, color: string) => {
    const newColumn: Column = {
      id: `column-${Date.now()}`,
      title,
      color,
      tasks: [],
    };
    setColumns([...columns, newColumn]);
  };

  const updateColumn = (columnId: string, title: string, color: string) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, title, color } : col
      )
    );
  };

  const deleteColumn = (columnId: string) => {
    setColumns(columns.filter((col) => col.id !== columnId));
  };

  const addTask = (columnId: string, title: string, description: string) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title,
      description,
      columnId,
    };

    setColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, tasks: [...col.tasks, newTask] } : col
      )
    );
  };

  const updateTask = (taskId: string, title: string, description: string) => {
    setColumns(
      columns.map((col) => ({
        ...col,
        tasks: col.tasks.map((task) =>
          task.id === taskId ? { ...task, title, description } : task
        ),
      }))
    );
  };

  const deleteTask = (taskId: string) => {
    setColumns(
      columns.map((col) => ({
        ...col,
        tasks: col.tasks.filter((task) => task.id !== taskId),
      }))
    );
  };

  return {
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
  };
}
