import React, { useContext } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";

import CartLayout from "../components/CartLayout";
import { AppContext } from "../context";
import MainLayout from "../layouts/MainLayout";
import RegisterLayout from "../layouts/RegisterLayout";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import ProductDetail from "../pages/ProductDetail";
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
        {
          path: "/cart",
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
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
      path: ":nameId",
      index: true,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      ),
    },
    {
      path: "/",
      index: true,
      element: (
        <MainLayout>
          <Products />
        </MainLayout>
      ),
    },
  ]);
  return useRouteElements;
}
