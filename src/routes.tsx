import LoginForm from "./pages/auth/login";
import NotFound from "./pages/not-found";

const routes = [
  //   {
  //     path: '/',
  //     element: <HomePage />,
  //   },
  {
    path: "/login",
    element: <LoginForm />,
  },
  //   {
  //     path: '/dashboard',
  //     element: <DashboardPage />,
  //   },
    {
      path: '*',
      element: <NotFound />,
    },
];

export default routes;
