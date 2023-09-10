import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="bg-orange">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10">
          <div className="lg:col-span-2 lg:col-start-4">
            <form className="bg-white rounded p-10 shadow-sm">
              <div className="text-2xl">Dang Nhap</div>
              <div className="mt-8">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-3 rounded-sm border border-gray-300 outline-none focus:border-gray-500 focus:shadow-sm"
                />
                <div className="mt-1 min-h-[1rem] text-red-600 text-sm">
                  Email khong hop le
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full p-3 rounded-sm border border-gray-300 outline-none focus:border-gray-500 focus:shadow-sm"
                />
                <div className="mt-1 min-h-[1rem] text-red-600 text-sm">
                  Password khong hop le
                </div>
              </div>
              <div className="mt-2">
                <button className="bg-red-500 text-white text-center w-full uppercase py-3 hover:bg-red-600">
                  Dang nhap
                </button>
              </div>
              <div className="mt-8 text-center">
                <span className="text-gray-400">Ban chua co tai khoan? </span>
                <Link className="text-orange ml-1" to="/register">
                  Dang ky
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
