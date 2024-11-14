import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../components/auth/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Logout from "../pages/Logout";
import Login from "../pages/Login";
import Home from "../pages/Home";
import { PublicRoute } from "./PublicRoute";
import UserDashboard from "../pages/UserDashboard";

const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/",
      element: <PublicRoute />, // Wrap the component in PublicRoute
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about-us",
          element: <div>About Us</div>,
        },
      ],
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/dashboard",
          element: <UserDashboard />,
          errorElement: <div>Error Page</div>,
        },
        {
          path: "/profile",
          element: <div>User Profile</div>,
          errorElement: <div>Error Page</div>,
        },
        {
          path: "/logout",
          element: <Logout />,
          errorElement: <div>Error Page</div>,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    // {
    //   path: "/",
    //   element: <Home />,
    //   errorElement: <div>Error Page</div>,
    // },
    {
      path: "/login",
      element: <Login />,
      errorElement: <div>Error Page</div>,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForNotAuthenticatedOnly,
    // ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;