import React, { useContext } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";

import CartLayout from "../components/CartLayout";
import ChangePassword from "../components/ChangePassword";
import UserHistoryPurchase from "../components/UserHistoryPurchase";
import UserLayout from "../components/UserLayout";
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
          path: "/user",
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            { path: "/user/profile", element: <Profile /> },
            { path: "/user/password", element: <ChangePassword /> },
            { path: "/user/history", element: <UserHistoryPurchase /> },
          ],
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
