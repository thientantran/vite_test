import React from "react";
import { Link } from "react-router-dom";

import QuantityController from "../components/QuantityController";
import { formatCurrency } from "../utils/functions";

export default function Cart() {
  return (
    <div className="bg-neutral-100 py-16">
      <div className="container">
        <div className="overflow-auto">
          {/* overflow-auto giúp có scroll khi màn hình nhỏ, do ở div dưới có set min width*/}
          <div className="min-w-[1000px]">
            {/* Header for cart */}
            <div className="grid grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow">
              <div className="col-span-6">
                <div className="flex items-center">
                  <div className="flex flex-shrink-0 items-center justify-center pr-3">
                    <input type="checkbox" className="h-5 w-5 accent-orange" />
                  </div>
                  <div className="flex-grow text-black">Sản phẩm</div>
                </div>
              </div>
              <div className="col-span-6">
                <div className="grid grid-cols-5 text-center">
                  <div className="col-span-2">Đơn giá</div>
                  <div className="col-span-1">Số lượng</div>
                  <div className="col-span-1">Số tiền</div>
                  <div className="col-span-1">Thao tác</div>
                </div>
              </div>
            </div>

            {/* All products */}
            <div className="my-3 rounded-sm bg-white p-5 shadow">
              {/* a product */}
              <div className="mt-5 grid grid-cols-12 rounded-sm border border-gray-200 bg-white px-4 py-5 text-sm text-gray-500 fist:mt-0">
                <div className="col-span-6">
                  <div className="flex">
                    <div className="flex flex-shrink-0 items-center justify-center pr-3">
                      <input
                        type="checkbox"
                        className="h-5 w-5 accent-orange"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center">
                        <Link to="/" className="h-20 w-20 flex-shrink">
                          <img
                            className="object-cover h-full w-full"
                            src="https://vtv1.mediacdn.vn/zoom/640_400/2023/2/21/210223-jisoo-blackpink-16769495254201335408105-crop-16769495320161575133037.jpeg"
                            alt="https://vtv1.mediacdn.vn/zoom/640_400/2023/2/21/210223-jisoo-blackpink-16769495254201335408105-crop-16769495320161575133037.jpeg"
                          />
                        </Link>
                        <div className="flex-grow px-2 pb-2 pt-1">
                          <Link className="line-clamp-2">Tên sản phẩm </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="flex w-full h-full">
                    <div className="grid grid-cols-5 items-center">
                      <div className="col-span-2">
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-gray-300 text-sm line-through">
                            đ {formatCurrency(100000)}
                          </span>
                          <span className="text-orange text-xl">
                            đ {formatCurrency(79000)}
                          </span>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <QuantityController
                          classNameWrapper=""
                          max={3000}
                          value={10}
                        />
                      </div>
                      <div className="col-span-1 text-center">
                        <span className="text-orange text-xl">
                          đ {formatCurrency(10 * 79000)}
                        </span>
                      </div>
                      <div className="col-span-1 text-center">
                        <button className="bg-none text-black transition-colors hover:text-orange">
                          Xoá
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-10 mt-10 flex rounded-sm border border-gray-100 bg-white pl-9 pr-5 py-5 shadow">
          <div className="flex w-full justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center justify-center pr-3">
                <input type="checkbox" className="h-5 w-5 accent-orange" />
              </div>
              <button className="mx-3 border-none bg-none">Chọn tất cả</button>
              <button className="mx-3 border-none bg-none">Xoá</button>
            </div>
            <div className="ml-auto mt-5 flex flex-col sm:mt-0 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center justify-end">
                  <div>Tổng thanh toán (0 sản phẩm): </div>
                  <div className="ml-2 text-2xl text-orange">
                    đ {formatCurrency(790000)}
                  </div>
                </div>
                <div className="flex items-center justify-end text-sm">
                  <div className="text-gray-500">Tiết kiệm</div>
                  <div className="ml-6 text-orange">
                    đ {formatCurrency(210000)}
                  </div>
                </div>
              </div>
              <div className="mt-2 flex justify-end sm:mt-0">
                <button className="ml-4 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600">
                  Mua hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
