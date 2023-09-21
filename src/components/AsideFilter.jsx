/* eslint-disable react/prop-types */
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { omit } from "lodash";
import { Controller, useForm } from "react-hook-form";
import { Link, createSearchParams, useNavigate } from "react-router-dom";

import { priceSchema } from "../utils/rules";
import Button from "./Button";
import InputNumber from "./InputNumber";
import InputV2 from "./InputV2";
import RatingStar from "./RatingStar";

export default function AsideFilter({ queryConfig, categories }) {
  const { category } = queryConfig;
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    //control để kết nối nhưngx cái field trong cái form với cái state
    // watch để quan sát nhưng thay đổi của những cái values trong field
    // bài toán ở đây cần đến tham chiếu giá trị ở 2 input, nên cần sử dụng tham chiếu
    // trigger là khi pricemax thay đỏi thì mình phải trigger đến pricemin để nó validate
    defaultValues: {
      price_min: "",
      price_max: "",
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false,
  });
  const valueForm = watch();
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: "/",
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min,
      }).toString(),
    });
  });
  const handleRemoveAll = () => {
    navigate({
      pathname: "/",
      search: createSearchParams(
        omit(queryConfig, [
          "price_min",
          "price_max",
          "rating_filter",
          "category",
        ]),
      ).toString(),
    });
  };
  return (
    <div className="py-4">
      <Link
        to="/"
        className={classNames("flex items-center font-bold", {
          "text-orange": !category,
        })}
      >
        <svg viewBox="0 0 12 10" className="mr-3 h-4 w-3 fill-current">
          <g fillRule="evenodd" stroke="none" strokeWidth={1}>
            <g transform="translate(-373 -208)">
              <g transform="translate(155 191)">
                <g transform="translate(218 17)">
                  <path d="m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                  <path d="m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                  <path d="m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tat ca danh muc
      </Link>
      <div className="my-4 bg-gray-300 h-[1px]" />

      <ul>
        {categories.map((categoryItem) => {
          const isActive = categoryItem._id === category;
          return (
            <li key={categoryItem._id} className="py-2 pl-2">
              <Link
                to={{
                  pathname: "/",
                  search: createSearchParams(
                    omit(
                      {
                        ...queryConfig,
                        category: categoryItem._id,
                      },
                      ["name"],
                    ),
                  ).toString(),
                }}
                className={classNames("flex items-center", {
                  "text-orange font-semibold": isActive,
                })}
              >
                <svg
                  viewBox="0 0 4 7"
                  className={classNames("h-2 w-", {
                    "fill-orange": isActive,
                  })}
                >
                  <polygon points="4 3.5 0 0 0 7" />
                </svg>
                <div className="ml-2">{categoryItem.name}</div>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link to="/" className="flex items-center mt-4 uppercase font-bold">
        <svg
          enableBackground="new 0 0 15 15"
          viewBox="0 0 15 15"
          x="0"
          y="0"
          className="mr-3 h-4 w-3 fill-current stroke-current"
        >
          <g>
            <polyline
              fill="none"
              points="5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
            />
          </g>
        </svg>
        Bo loc tim kiem
      </Link>
      <div className="my-4 bg-gray-300 h-[1px]" />
      <div className="my-5">
        <div>Khoan gia</div>
        <form className="mt-2" onSubmit={onSubmit}>
          <div className="flex items-start">
            <InputV2
              control={control}
              name="price_min"
              className="grow"
              placeholder="Từ"
              classNameInput="p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
              classNameError="hidden"
              onChange={() => {
                trigger("price_max");
              }}
            />
            {/* <Controller
              control={control}
              name="price_min"
              render={({ field }) => {
                return (
                  <InputNumber
                    type="text"
                    className="grow"
                    placeholder="Từ"
                    classNameInput="p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                    classNameError="hidden"
                    onChange={(event) => {
                      field.onChange(event);
                      trigger("price_max");
                    }}
                    value={field.value}
                  />
                );
              }}
            /> */}
            {/* <Input
              type="text"
              className="grow"
              name="from"
              placeholder="TU"
              classNameInput="p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
            /> */}
            <div className="mx-2 mt-1">-</div>
            <Controller
              control={control}
              name="price_max"
              render={({ field }) => {
                return (
                  <InputNumber
                    type="text"
                    className="grow"
                    placeholder="Đến"
                    classNameInput="p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                    classNameError="hidden"
                    onChange={(event) => {
                      field.onChange(event);
                      trigger("price_min");
                    }}
                    value={field.value}
                  />
                );
              }}
            />
            {/* <Input
              type="text"
              className="grow"
              name="to"
              placeholder="DEN"
              classNameInput="p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
            /> */}
          </div>
          <div className="mt-1 text-center text-sm text-red-600 min-h-[1.25rem]">
            {errors.price_min?.message}
            {errors.price_max?.message}
            {/* cho nay phai add vao, vi trigger den 1 cai thi chi chay test yup cho cai do, nen phai day du  */}
          </div>
          <Button className="w-full bg-orange py-2 flex items-center justify-center uppercase text-sm text-white hover:bg-orange/80">
            Ap dung
          </Button>
        </form>
      </div>
      <div className="my-4 bg-gray-300 h-[1px]" />
      <div>Danh Gia</div>
      <RatingStar queryConfig={queryConfig} />
      <div className="my-4 bg-gray-300 h-[1px]" />
      <Button
        onClick={handleRemoveAll}
        className="flex items-center justify-center w-full bg-orange text-white uppercase p-2 hover:bg-orange/80 text-sm"
      >
        Xoa tat ca
      </Button>
    </div>
  );
}
