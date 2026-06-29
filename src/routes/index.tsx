import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import DashboardPage from "@/pages/DashboardPage";
import ForbiddenPage from "@/pages/ForbiddenPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ServerErrorPage from "@/pages/ServerErrorPage";
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
    path: appConstants.FORBIDDEN,
    element: <ForbiddenPage />,
  },
  {
    path: appConstants.SERVER_ERROR,
    element: <ServerErrorPage />,
  },
  {
    path: appConstants.NOT_FOUND,
    element: <NotFoundPage />,
  },
]);
