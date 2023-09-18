import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import React from "react";
import { useParams } from "react-router-dom";

import { productApi } from "../apis/api";
import InputNumber from "../components/InputNumber";
import Rating from "../components/Rating";
import {
  formatCurrency,
  formatNumberToSocialStyle,
  rateSale,
} from "../utils/functions";

export default function ProductDetail() {
  const { id } = useParams();
  const { data: productDetailData } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productApi.getProductDetail(id),
  });
  const product = productDetailData?.data.data;
  if (!product) {
    return null;
  }
  return (
    <div className="bg-gray-200 py-6">
      <div className="container">
        <div className="bg-white p-4 shadow">
          <div className="grid grid-cols-12 gap-9">
            {/* bên trái */}
            <div className="col-span-5">
              <div className="relative w-full pt-[100%] shadow">
                <img
                  src={product.image}
                  alt={product.image}
                  className="absolute left-0 top-0 h-full w-full bg-white object-cover"
                />
              </div>
              <div className="relative grid grid-cols-5 gap-1">
                {/* chỗ này phải để relative và absolute vì nút button sẽ đè lên các hình, và click vào */}
                <button className="absolute left-0 top-1/2 z-10 -translate-y-1/2 h-9 w-5 bg-black/20 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
                {product.images.slice(0, 5).map((img, index) => {
                  const isActive = index === 0;
                  return (
                    <div className="relative w-full" key={img}>
                      <img
                        src={product.image}
                        alt={img}
                        className="abosulute left-0 top-0 h-full w-full cursor-pointer bg-white object-cover"
                      />
                      {isActive && (
                        <div className="absolute inset-0 border-2 border-orange" />
                      )}
                    </div>
                  );
                })}
                <button className="absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white">
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
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="col-span-7">
              <h1 className="text-xl font-medium uppercase">{product.name}</h1>
              {/* rating and sold */}
              <div className="mt-8 flex items-center">
                <div className="items-center flex">
                  <span className="mr-1 border-b border-b-orange text-orange">
                    {product.rating}
                  </span>
                  <Rating rating={product.rating} />
                </div>
                <div className="mx-4 h-4 w-[1px]" />
                <div>
                  <span>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className="ml-1 text-gray-500">Đánh giá</span>
                </div>
              </div>
              {/* Price */}
              <div className="mt-8 flex items-center bg-gray-50 px-5 py-4">
                <div className="text-gray-500 line-through">
                  đ{formatCurrency(product.price_before_discount)}
                </div>
                <div className="ml-3 text-3xl font-medium text-orange">
                  đ{formatCurrency(product.price)}
                </div>
                <div className="ml-3 bg-orange px-1 text-xs font-semibold uppercase text-white py-[2px]">
                  {rateSale(product.price_before_discount, product.price)} giảm
                </div>
              </div>
              {/* Nhap so luong mua */}
              <div className="mt-8 flex items-center">
                <div className="capitalize text-gray-500">Số lượng</div>
                <div className="ml-10 flex items-center">
                  <button className="flex items-center h-8 w-8 justify-center rounded-l-sm border border-gray-300 text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 12h-15"
                      />
                    </svg>
                  </button>
                  <InputNumber
                    className=""
                    classNameError="hidden"
                    value={1}
                    classNameInput="h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none"
                  />
                  <button className="flex items-center h-8 w-8 justify-center rounded-l-sm border border-gray-300 text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </button>
                </div>
                <div className="ml-6 text-sm text-gray-500">
                  {product.quantity} sản phẩm có sẵn
                </div>
              </div>
              {/* Đặt mua */}
              <div className="mt-8 flex items-center">
                <button className="flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm hover:bg-orange/5">
                  <svg
                    enableBackground="new 0 0 15 15"
                    viewBox="0 0 15 15"
                    x="0"
                    y="0"
                    className="mr-[10px] h-5 w-5 fill-current stroke-orange text-orange"
                  >
                    <g>
                      <g>
                        <polyline
                          fill="none"
                          points=".5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit="10"
                        />
                        <circle cx="6" cy="13.5" r="1" stroke="none" />
                        <circle cx="11.5" cy="13.5" r="1" stroke="none" />
                      </g>
                      <line
                        fill="none"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        x1="7.5"
                        x2="10.5"
                        y1="7"
                        y2="7"
                      />
                      <line
                        fill="none"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        x1="9"
                        x2="9"
                        y1="8.5"
                        y2="5.5"
                      />
                    </g>
                  </svg>
                  thêm vào giỏ hàng
                </button>
                <button className="ml-4 flex h-12 bg-orange items-center min-w-[5rem] justify-center rounded-sm px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90">
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="container">
        <div className="mt-8 bg-white p-4 shadow">
          <div className="rounded bg-gray-50 p-4 text-lg capitalize text-slate-700">
            Mô tả sản phẩm
          </div>
          <div className="mx-4 mb-4 mt-12 text-sm leading-loose">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}