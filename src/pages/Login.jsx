import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import Button from "../components/Button";
import Input from "../components/Input";
import { AppContext } from "../context";
import { isAxiosUnprocessableEntityError } from "../utils/checkError";
import http from "../utils/http";
import { loginSchema } from "../utils/rules";
const loginAccount = (body) => http.post("/login", body);
export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const loginAccountMutation = useMutation({
    mutationFn: (body) => loginAccount(body),
  });
  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true);
        setProfile(data.data.data.user);
        navigate("/");
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError(error)) {
          const formError = error.response?.data.data;
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key, {
                message: formError[key],
                type: "server",
              });
            });
          }
        }
      },
    });
  });
  return (
    <div className="bg-orange">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10">
          <div className="lg:col-span-2 lg:col-start-4">
            <form
              className="bg-white rounded p-10 shadow-sm"
              noValidate
              onSubmit={onSubmit}
            >
              <div className="text-2xl">Dang Nhap</div>
              <Input
                className="mt-8"
                register={register}
                type="email"
                name="email"
                placeholder="Email"
                errorMessage={errors?.email?.message}
              />
              <Input
                className="mt-2"
                register={register}
                type="password"
                name="password"
                placeholder="Password"
                errorMessage={errors?.password?.message}
              />
              <div className="mt-2">
                <Button
                  type="submit"
                  isLoading={loginAccountMutation.isLoading}
                  disabled={loginAccountMutation.isLoading}
                  className="flex items-center justify-center bg-red-500 text-white text-center w-full uppercase py-3 hover:bg-red-600"
                >
                  Đăng Nhập
                </Button>
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
