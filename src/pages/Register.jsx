import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { schema } from "../utils/rules";
export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <div className="bg-orange">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
          <div className="lg:col-span-2 lg:col-start-4">
            <form
              className="rounded bg-white p-10 shadow-sm"
              noValidate
              onSubmit={onSubmit}
            >
              <div className="text-2xl">Dang Ky</div>
              <div className="mt-8">
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Email"
                  className="w-full rounded-sm border border-gray-300 outline-none focus:border-gray-500 focus:shadow-sm p-3"
                />
                <div className="text-sm min-h-[1rem] text-red-600 mt-1">
                  {errors?.email?.message}
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Password"
                  className="w-full rounded-sm border border-gray-300 outline-none focus:border-gray-500 focus:shadow-sm p-3"
                />
                <div className="text-sm min-h-[1rem] text-red-600 mt-1">
                  {errors?.password?.message}
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  {...register("confirm_password")}
                  placeholder="Confirm Password"
                  className="w-full rounded-sm border border-gray-300 outline-none focus:border-gray-500 focus:shadow-sm p-3"
                />
                <div className="text-sm min-h-[1rem] text-red-600 mt-1">
                  {errors?.confirm_password?.message}
                </div>
              </div>
              <div className="mt-2">
                <button className="w-full bg-red-500 text-center text-white uppercase py-3 rounded-sm hover:bg-red-600">
                  dang ky
                </button>
              </div>
              <div className="mt-8 text-center">
                <span className="text-gray-300">Ban da co tai khoan? </span>
                <Link to="/login" className="ml-1 text-orange">
                  Dang nhap
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
