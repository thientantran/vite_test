/* eslint-disable react/prop-types */
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { Controller, useForm } from "react-hook-form";
import { Link, createSearchParams, useNavigate } from "react-router-dom";

import { priceSchema } from "../utils/rules";
import Button from "./Button";
import InputNumber from "./InputNumber";

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
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id,
                  }).toString(),
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
            <Controller
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
            />
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
          </div>
          <Button className="w-full bg-orange py-2 flex items-center justify-center uppercase text-sm text-white hover:bg-orange/80">
            Ap dung
          </Button>
        </form>
      </div>
      <div className="my-4 bg-gray-300 h-[1px]" />
      <div>Danh Gia</div>
      <ul className="my-3">
        <li className="py-1 pl-2">
          <Link to="/" className="flex items-center text-sm">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg
                  key={index}
                  viewBox="0 0 9.5 8"
                  className="mr-1 h-4 w-4 fill-orange"
                >
                  <defs>
                    <linearGradient
                      id="ratingStarGradient"
                      x1="50%"
                      x2="50%"
                      y1="0%"
                      y2="100%"
                    >
                      <stop offset={0} stopColor="#ffca11" />
                      <stop offset={1} stopColor="#ffad27" />
                    </linearGradient>
                    <polygon
                      id="ratingStar"
                      points="14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903"
                    />
                  </defs>
                  <g
                    fill="url(#ratingStarGradient)"
                    fillRule="evenodd"
                    stroke="none"
                    strokeWidth={1}
                  >
                    <g transform="translate(-876 -1270)">
                      <g transform="translate(155 992)">
                        <g transform="translate(600 29)">
                          <g transform="translate(10 239)">
                            <g transform="translate(101 10)">
                              <use
                                stroke="#ffa727"
                                strokeWidth=".5"
                                href="#ratingStar"
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              ))}
            <span>Tro len</span>
          </Link>
        </li>
        <li className="py-1 pl-2">
          <Link to="/" className="flex items-center text-sm">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg
                  key={index}
                  viewBox="0 0 9.5 8"
                  className="mr-1 h-4 w-4 fill-orange"
                >
                  <defs>
                    <linearGradient
                      id="ratingStarGradient"
                      x1="50%"
                      x2="50%"
                      y1="0%"
                      y2="100%"
                    >
                      <stop offset={0} stopColor="#ffca11" />
                      <stop offset={1} stopColor="#ffad27" />
                    </linearGradient>
                    <polygon
                      id="ratingStar"
                      points="14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903"
                    />
                  </defs>
                  <g
                    fill="url(#ratingStarGradient)"
                    fillRule="evenodd"
                    stroke="none"
                    strokeWidth={1}
                  >
                    <g transform="translate(-876 -1270)">
                      <g transform="translate(155 992)">
                        <g transform="translate(600 29)">
                          <g transform="translate(10 239)">
                            <g transform="translate(101 10)">
                              <use
                                stroke="#ffa727"
                                strokeWidth=".5"
                                href="#ratingStar"
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              ))}
            <span>Tro len</span>
          </Link>
        </li>
      </ul>
      <div className="my-4 bg-gray-300 h-[1px]" />
      <Button className="flex items-center justify-center w-full bg-orange text-white uppercase p-2 hover:bg-orange/80 text-sm">
        Xoa tat ca
      </Button>
    </div>
  );
}
