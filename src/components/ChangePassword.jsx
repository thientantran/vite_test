import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { omit } from "lodash";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Button from "./Button";
import Input from "./Input";
import { userApi } from "../apis/api";
import { isAxiosUnprocessableEntityError } from "../utils/checkError";
import { passwordSchema } from "../utils/rules";

export default function ChangePassword() {
  //Khai báo cho react hook form
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
  } = useForm({
    defaultValues: {
      password: "",
      new_password: "",
      confirm_password: "",
    },
    resolver: yupResolver(passwordSchema),
  });

  const updateProfileMutation = useMutation(userApi.updateProfile);
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfileMutation.mutateAsync(
        omit(data, ["confirm_password"]),
      );

      toast.success(res.data.message);
      reset();
    } catch (error) {
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
    }
  });
  return (
    <div className="pd-10 rounded-sm bg-white px-2 shadow md:px-7 md:pb-20">
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-lg font-medium capitalize text-gray-900">
          Đổi mật khẩu
        </h1>
        <div className="mt-1 text-sm text-gray-700">
          Quản lý thông tin hồ sơ để bảo mật tải khoản
        </div>
      </div>
      <form action="" className="mt-8" onSubmit={onSubmit}>
        <div className="mt-6 flex-grow md:pr-12 md:mt-0">
          <div className="mt-2 flex flex-col flex-wrap md:flex-row">
            <div className="truncate pt-3 text-right capitalize w-[20%]">
              Mật khẩu cũ
            </div>
            <div className="pl-5 w-[80%]">
              <Input
                register={register}
                errorMessage={errors.password?.message}
                name="password"
                type="password"
                placeholder="Nhập mật khẩu cũ"
                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col flex-wrap md:flex-row">
            <div className="truncate pt-3 text-right capitalize w-[20%]">
              Mật khẩu mới
            </div>
            <div className="pl-5 w-[80%]">
              <Input
                register={register}
                errorMessage={errors.new_password?.message}
                name="new_password"
                type="password"
                placeholder="Nhập mật khẩu mới"
                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col flex-wrap md:flex-row">
            <div className="truncate pt-3 text-right capitalize w-[20%]">
              Xác nhận mật khẩu mới
            </div>
            <div className="pl-5 w-[80%]">
              <Input
                register={register}
                errorMessage={errors.confirm_password?.message}
                name="confirm_password"
                type="password"
                placeholder="Xác nhận mật khẩu mới"
                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
              />
            </div>
          </div>

          <div className="mt-2 flex flex-col flex-wrap md:flex-row">
            <div className="truncate pt-3 text-right capitalize w-[20%]" />
            <div className="sm:pl-5 sm:w-[80%]">
              <Button
                type="submit"
                className="flex h-9 items-center bg-orange px-5 text-center text-sm text-white hover:bg-orange/80"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
