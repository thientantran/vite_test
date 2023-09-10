import React, { useContext } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";

import { AppContext } from "../context";
import MainLayout from "../layouts/MainLayout";
import RegisterLayout from "../layouts/RegisterLayout";
import Login from "../pages/Login";
import Products from "../pages/Products";
import Profile from "../pages/Profile";
import Register from "../pages/Register";

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
export default function useRouteElements() {
  const useRouteElements = useRoutes([
    {
      path: "",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/profile",
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          ),
        },
      ],
    },
    {
      path: "",
      element: <RejectedRoute />,
      children: [
        {
          path: "/login",
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          ),
        },
        {
          path: "/register",
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          ),
        },
      ],
    },
    {
      path: "",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          index: true,
          element: (
            <MainLayout>
              <Products />
            </MainLayout>
          ),
        },
      ],
    },
  ]);
  return useRouteElements;
}
