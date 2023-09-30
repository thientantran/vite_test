import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { userApi } from "../apis/api";
import Button from "../components/Button";
import DateSelect from "../components/DateSelect";
import Input from "../components/Input";
import InputNumber from "../components/InputNumber";
import { AppContext } from "../context";
import { setProfileToLS } from "../utils/auth";
import { isAxiosUnprocessableEntityError } from "../utils/checkError";
import { getAvatarURL } from "../utils/functions";
import { profileSchema } from "../utils/rules";

export default function Profile() {
  const inputFileRef = useRef(null);
  // Tạo cái này để liên kết với nút button, khi nào nut button click thì nó ref tới chỗ choose file
  const [file, setFile] = useState();
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : "";
  });
  const { setProfile, profile: profileFromLS } = useContext(AppContext);
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
  const avatar = watch("avartar");
  // console.log(avatar);
  // fetch user data
  const { data: profileData, refetch } = useQuery({
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

  const updateProfileMutation = useMutation(userApi.updateProfile);
  const uploadAvatarMutation = useMutation(userApi.uploadAvatar);
  // có 2 flows để upload ảnh lên
  // flow 1: sau khi bấm nút chọn ảnh thì ảnh sẽ được đưa lên server lun, rồi server trả về URL cho ảnh, sau đó nhấn submit thì gửi thông tin lên lại server để lưu URL
  // flow 2: chỉ khi bấm lưu mới gửi ảnh lên server, sau đó mới gọi api để tiến hành upload profile: cách này chậm hơn do gọi 2 api nhưng ko bỉ spam ảnh nhiều lên server
  const onSubmit = handleSubmit(async (data) => {
    try {
      // console.log(data);
      // console.log(data.date_of_birth?.toISOString());
      let avatarName = avatar;
      //nếu submit mà có file hình thì gửi file lên trước, sau đó mới gửi cái form data information
      if (file) {
        const uploadImageRes = await uploadAvatarMutation.mutateAsync({
          image: file,
        });
        avatarName = uploadImageRes.data.data;
        setValue("avartar", avatarName);
      }

      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName,
      });
      setProfile(res.data.data);
      setProfileToLS(res.data.data);
      refetch();
      toast.success(res.data.message);
    } catch (error) {
      if (isAxiosUnprocessableEntityError(error)) {
        const formError = error.respose?.data.data;
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

  const handleUpload = () => {
    inputFileRef.current?.click();
  };

  const onFileChange = (event) => {
    const fileFromLocal = event.target.files?.[0];
    setFile(fileFromLocal);
  };
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

      <form
        className="mt-8 flex flex-col-reverse md:flex-row md:items-start"
        onSubmit={onSubmit}
      >
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
                  <InputNumber
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
          <Controller
            control={control}
            name="date_of_birth"
            render={({ field }) => (
              <DateSelect
                errorMessage={errors.date_of_birth?.message}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

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
                src={previewImage || getAvatarURL(profile?.avatar)}
                alt="avatar"
                className="f-full w-full rounded-full object-cover"
              />
            </div>
            <input
              type="file"
              className="hidden"
              accept=".jpg, .jpeg,.png"
              ref={inputFileRef}
              onChange={onFileChange}
            />
            <button
              type="button"
              // type button để khi click vào thì ko có submit form
              onClick={handleUpload}
              className="flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm"
            >
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
