import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AppContext } from "../context";
import { queryClient } from "../main";
import { purchaseStatus } from "../utils/constants";
import http from "../utils/http";
import Popover from "./Popover";

const logout = () => http.post("/logout");
export default function NavBar() {
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } =
    useContext(AppContext);
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setIsAuthenticated(false);
      setProfile(null);
      queryClient.removeQueries({
        queryKey: ["purchases", { status: purchaseStatus.inCart }],
      });
    },
  });
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  return (
    <div className="flex justify-end">
      <Popover
        element="span"
        className="flex items-center hover:text-gray-300 cursor-pointer"
        renderPopover={
          <div className="relative rounded-sm border border-gray-200 bg-white shadow-md">
            <div className="flex flex-col px-3 py-2">
              <button className="px-3 py-2 hover:text-orange">
                Tieng Viet
              </button>
              <button className="mt-2 px-3 py-2 hover:text-orange">
                Tieng Anh
              </button>
            </div>
          </div>
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
        <span className="mx-1">Tieng Viet</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </Popover>
      {isAuthenticated ? (
        <Popover
          className="flex items-center ml-6 hover:text-gray-300 cursor-pointer"
          renderPopover={
            <div className="relative rounded-sm border border-gray-200 bg-white shadow-md">
              <Link
                to="/user/profile"
                className="hover:bg-stale-100 block w-full bg-white px-4 py-3 text-left hover:text-cyan-500"
              >
                Tai khoan cua toi
              </Link>
              <Link
                to="/"
                className="hover:bg-stale-100 block w-full bg-white px-4 py-3 text-left hover:text-cyan-500"
              >
                Don mua
              </Link>
              <button
                onClick={handleLogout}
                className="hover:bg-stale-100 block w-full bg-white px-4 py-3 text-left hover:text-cyan-500"
              >
                Dang xuat
              </button>
            </div>
          }
        >
          <div className="mr-2 w-8 h-8">
            <img
              src={
                profile?.avatar ||
                "https://down-vn.img.susercontent.com/file/br-11134226-7qukw-levcx0zgr2n3d2_tn"
              }
              alt="avatar"
              className="h-full w-full rounded-full object-cover"
            />
          </div>

          <div>{profile?.name || profile?.email}</div>
        </Popover>
      ) : (
        <div className="flex items-center">
          <Link to="/login" className="mx-3 capitalize hover:text-white/70">
            Dang nhap
          </Link>
          <div className="h-4 border-r-[1px] border-r-white/40" />
          <Link to="/register" className="mx-3 capitalize hover:text-white/70">
            Dang ky
          </Link>
        </div>
      )}
    </div>
  );
}
