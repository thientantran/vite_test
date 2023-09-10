import React from "react";
import { useRoutes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import RegisterLayout from "../layouts/RegisterLayout";
import Login from "../pages/Login";
import Products from "../pages/Products";
import Register from "../pages/Register";

export default function useRouteElements() {
  const useRouteElements = useRoutes([
    {
      path: "/",
      element: (
        <MainLayout>
          <Products />
        </MainLayout>
      ),
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
