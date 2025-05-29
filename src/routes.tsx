import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginForm from './pages/auth/login';
import SignupForm from './pages/auth/signup';
import DashboardLayout from './components/layout/dashboard-layout';
import DashboardHome from './pages/dashboard/dashboard-home';
import Projects from './pages/dashboard/projects';
import Estimation from './pages/dashboard/estimation';
import NotFound from './pages/not-found';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken'); 
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Public Route Component (redirect if already authenticated)
const PublicRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken');
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export const router = createBrowserRouter([
  
  {
    path: '/login',
    element: (
      <PublicRoute>
        <LoginForm />
      </PublicRoute>
    ),
  },
  {
    path: '/signup',
    element: (
      <PublicRoute>
        <SignupForm />
      </PublicRoute>
    ),
  },
  {
    path: '/',
    element: (
      <PublicRoute>
        <DashboardLayout>
          <DashboardHome />
        </DashboardLayout>
      </PublicRoute>
    ),
  },
  {
    path: '/projects',
    element: (
      <PublicRoute>
        <DashboardLayout>
          <Projects />
        </DashboardLayout>
      </PublicRoute>
    ),
  },
  {
    path: '/estimates',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Estimation />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);