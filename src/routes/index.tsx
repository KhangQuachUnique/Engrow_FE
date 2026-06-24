import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import LoginPage from "@/pages/auth/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import NotFoundPage from "@/pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <RootLayout />,
    children: [
      {
        path: "/auth/login",
        element: <LoginPage />,
      },
    ],
  },
]);
