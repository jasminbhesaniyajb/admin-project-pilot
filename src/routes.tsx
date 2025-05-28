import LoginForm from "./pages/auth/login";
import SignupForm from "./pages/auth/signup";
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
    {
      path: '/signup',
      element: <SignupForm />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
];

export default routes;
