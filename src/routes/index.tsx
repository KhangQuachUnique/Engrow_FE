import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import DashboardPage from "@/pages/DashboardPage";
import ForbiddenPage from "@/pages/ForbiddenPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import ServerErrorPage from "@/pages/ServerErrorPage";
import { appConstants } from "@/share/constants/appConstants";
import MainLayout from "@/share/layouts/MainLayout";

export const router = createBrowserRouter([
  {
    path: appConstants.DASHBOARD,
    element: (
      <MainLayout>
        <DashboardPage />
      </MainLayout>
    ),
  },
  {
    path: appConstants.PROFILE,
    element: (
      <MainLayout>
        <ProfilePage />
      </MainLayout>
    ),
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
