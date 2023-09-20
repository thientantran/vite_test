import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { omit } from "lodash";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import Button from "../components/Button";
import Input from "../components/Input";
import { AppContext } from "../context";
import { isAxiosUnprocessableEntityError } from "../utils/checkError";
import http from "../utils/http";
import { registerSchema } from "../utils/rules";

const registerAccount = (body) => http.post("/register", body);
export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerAccountMutation = useMutation({
    mutationFn: (body) => registerAccount(body),
  });

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ["confirm_password"]);
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true);
        setProfile(data.data.data.user);
        navigate("/");
      },
      onError: (data) => {
        if (isAxiosUnprocessableEntityError(data)) {
          const formData = data.response?.data.data;
          if (formData) {
            Object.keys(formData).forEach((key) => {
              setError(key, {
                message: formData[key],
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
        <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
          <div className="lg:col-span-2 lg:col-start-4">
            <form
              className="rounded bg-white p-10 shadow-sm"
              noValidate
              onSubmit={onSubmit}
            >
              <div className="text-2xl">Dang Ky</div>

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
              <Input
                className="mt-2"
                register={register}
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                errorMessage={errors?.confirm_password?.message}
              />
              <div className="mt-2">
                <Button
                  isLoading={registerAccountMutation.isLoading}
                  disabled={registerAccountMutation.isLoading}
                  className="w-full bg-red-500 text-center text-white uppercase py-3 rounded-sm hover:bg-red-600 flex justify-center items-center"
                >
                  Đăng ký
                </Button>
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
