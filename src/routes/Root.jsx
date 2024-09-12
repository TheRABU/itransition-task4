import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RootLayout from "../layouts/RootLayout";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ShowUsers from "../pages/ShowUsers";

const AllRouteFunction = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/sign-up",
          element: <SignupPage />,
        },
        {
          path: "/show-users",
          element: <ShowUsers />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AllRouteFunction;
