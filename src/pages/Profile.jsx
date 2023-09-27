import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { userApi } from "../apis/api";
import Button from "../components/Button";
import Input from "../components/Input";
import { profileSchema } from "../utils/rules";

export default function Profile() {
  // Declare forms
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError,
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      avatar: "",
      date_of_birth: new Date(1990, 0, 1),
    },
    resolver: yupResolver(profileSchema),
  });

  // fetch user data
  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: userApi.getProfile,
  });

  const profile = profileData?.data.data;

  useEffect(() => {
    if (profile) {
      setValue("name", profile.name);
      setValue("phone", profile.phone);
      setValue("address", profile.address);
      setValue("avatar", profile.avatar);
      setValue(
        "date_of_birth",
        profile.date_of_birth
          ? new Date(profile.date_of_birth)
          : new Date(1990, 0, 1),
      );
    }
  }, [profile, setValue]);
  return (
    <div className="pb-10 rounded-sm bg-white px-2 shadow md:px-7 md:pb-20">
      {/* Tieu de */}
      <div className="border-b border-gray-200 py-6">
        <h1 className="text-lg font-medium capitalize text-gray-900">
          Ho so cua toi
        </h1>
        <div className="mt-2 text-sm text-gray-700">
          Quan ly thong tin ho so de bao mat tai khoan
        </div>
      </div>

      <form className="mt-8 flex flex-col-reverse md:flex-row md:items-start">
        <div className="mt-6 flex-grow md:mt-0 md:pr-12">
          {/* Email */}
          <div className="flex flex-wrap">
            <div className="truncate pt-3 text-right capitalize w-[20%]">
              Email
            </div>
            <div className="pl-5 w-[80%]">
              <div className="pt-3 text-gray-700">{profile?.email}</div>
            </div>
          </div>
          {/* Name */}
          <div className="mt-6 flex flex-col flex-wrap md:flex-row">
            <div className="truncate pt-3 text-right capitalize w-[20%]">
              Ten
            </div>
            <div className="pl-5 w-[80%]">
              <Input
                register={register}
                name="name"
                placeholder="Tên"
                errorMessage={errors.name?.message}
                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
              />
            </div>
          </div>
          {/* So dien thoai */}
          <div className="mt-2 flex flex-col flex-wrap md:flex-row">
            <div className="truncate pt-3 text-right capitalize w-[20%]">
              So dien thoai
            </div>
            <div className="pl-5 w-[80%]">
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <Input
                    classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                    placeholder="Số điện thoại"
                    errorMessage={errors.phone?.message}
                    {...field}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          {/* Dia chi */}
          <div className="mt-2 flex flex-col flex-wrap md:flex-row">
            <div className="truncate pt-3 text-right capitalize w-[20%]">
              Dia chi
            </div>
            <div className="pl-5 w-[80%]">
              <Input
                register={register}
                name="address"
                placeholder="Địa chỉ"
                errorMessage={errors.address?.message}
                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
              />
            </div>
          </div>
          {/* Ngay SInh */}
          <div className="mt-2 flex flex-col flex-wrap md:flex-row">
            <div className="truncate pt-3 text-right capitalize w-[20%]">
              Ngay sinh
            </div>
            <div className="pl-5 w-[80%]">
              <div className="flex justify-between">
                <select className="h-10 w-[32%] rounded-sm border border-black/10 px-3">
                  <option disabled>Ngay</option>
                </select>
                <select className="h-10 w-[32%] rounded-sm border border-black/10 px-3">
                  <option disabled>Thang</option>
                </select>
                <select className="h-10 w-[32%] rounded-sm border border-black/10 px-3">
                  <option disabled>Nam</option>
                </select>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 text-right capitalize w-[20%]" />
            <div className="sm:w-[80%] sm:pl-5">
              <Button className="flex h-9 items-center bg-orange px-5 text-center text-sm text-white hover:bg-orange/80">
                Save
              </Button>
            </div>
          </div>
        </div>
        {/* Upload hinh */}
        <div className="flex justify-center md:w-72 md:border-l md:border-l-gray-200">
          <div className="flex flex-col items-center">
            <div className="my-5 h-24 w-24">
              <img
                src="https://down-vn.img.susercontent.com/file/br-11134226-7qukw-levcx0zgr2n3d2_tn"
                alt="avatar"
                className="f-full w-full rounded-full object-cover"
              />
            </div>
            <input type="file" className="hidden" accept=".jpg, .jpeg,.png" />
            <button className="flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm">
              Chon anh
            </button>
            <div className="mt-3 text-gray-400">
              <div>Dung luong file toi da 1MB</div>
              <div>Dinh dang: .JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
