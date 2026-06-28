import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import DashboardPage from "@/pages/DashboardPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { appConstants } from "@/share/constants/appConstants";

export const router = createBrowserRouter([
  {
    path: appConstants.DASHBOARD,
    element: <DashboardPage />,
  },
  {
    path: appConstants.LOGIN,
    element: <LoginPage />,
  },
  {
    path: appConstants.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: appConstants.NOT_FOUND,
    element: <NotFoundPage />,
  },
]);
