import React from "react";
import { useRoutes } from "react-router-dom";

import RegisterLayout from "../layouts/RegisterLayout";
import Login from "../pages/Login";
import Products from "../pages/Products";
import Register from "../pages/Register";

export default function useRouteElements() {
  const useRouteElements = useRoutes([
    {
      path: "/",
      element: <Products />,
    },
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
  ]);
  return useRouteElements;
}
