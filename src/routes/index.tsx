import PublicLayout from "components/layout/public-layout";
import KanbanBoard from "features/kanban/components/kanban-board";
import ErrorPage from "pages/error-page";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/tasks" replace />,
      },
      {
        path: "/tasks",
        element: <KanbanBoard />,
      },
    ],
  },
]);
