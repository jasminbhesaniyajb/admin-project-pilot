import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginForm from "./pages/auth/login";
import SignupForm from "./pages/auth/signup";
import DashboardLayout from "./components/layout/dashboard-layout";
import DashboardHome from "./pages/dashboard/dashboard-home";
import Projects from "./pages/dashboard/projects/projects";
import Estimation from "./pages/dashboard/estimation";
import NotFound from "./pages/not-found";
import AddProject from "./pages/dashboard/projects/add/add-project";
import EditProject from "./pages/dashboard/projects/edit/edit-project";
import ForgotPasswordForm from "./pages/auth/forgot-password";
import { getToken } from "./utils";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = getToken();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const PublicRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = getToken();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginForm />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <SignupForm />
      </PublicRoute>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <PublicRoute>
        <ForgotPasswordForm />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
    ],
  },
  {
    path: "/projects",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Projects />,
      },
      {
        path: "add",
        element: <AddProject />,
      },
      {
        path: "edit/:id",
        element: <EditProject />,
      },
    ],
  },
  {
    path: "/estimates",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
     children: [
      {
        index: true,
        element: <Estimation />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
