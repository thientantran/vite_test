import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import React from "react";
import { Link, createSearchParams } from "react-router-dom";

import { purchaseApi } from "../apis/api";
import useQueryParams from "../hooks/useQueryParams";
import { purchaseStatus } from "../utils/constants";
import { formatCurrency, generateNameId } from "../utils/functions";
const purchaseTabs = [
  { status: purchaseStatus.all, name: "Tất cả" },
  { status: purchaseStatus.waitForConfirmation, name: "Chờ xác nhận" },
  { status: purchaseStatus.inProgress, name: "Đang giao" },
  { status: purchaseStatus.delivered, name: "Đã giao" },
  { status: purchaseStatus.cancelled, name: "Đã huỷ" },
];
export default function UserHistoryPurchase() {
  const queryParams = useQueryParams();
  const status = Number(queryParams.status) || purchaseStatus.all;
  const { data: purchasesInCartData } = useQuery({
    queryKey: ["purchases", { status }],
    queryFn: () => purchaseApi.getPurchases({ status }),
  });
  const purchaseInCart = purchasesInCartData?.data.data;
  console.log(purchaseInCart);
  const purchaseLinkTabs = purchaseTabs.map((tab) => (
    <Link
      to={{
        pathname: "/user/history",
        search: createSearchParams({ status: String(tab.status) }).toString(),
      }}
      className={classNames(
        "flex flex-1 items-center justify-center border-b-2 py-4 text-center",
        {
          "border-b-orange text-orange": status === tab.status,
          "border-b-black/10 text-gray-900": status !== tab.status,
        },
      )}
      key={tab.status}
    >
      {tab.name}
    </Link>
  ));
  return (
    <div>
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="sticky top-0 flex rounded-t-sm shadow-sm bg-white ">
            {purchaseLinkTabs}
          </div>
          <div>
            {purchaseInCart?.map((item) => (
              <div
                key={item._id}
                className="mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-600 shadow-sm"
              >
                <Link
                  to={`/${generateNameId({
                    name: item.product.name,
                    id: item.product._id,
                  })}`}
                  className="flex"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-20 w-20 object-cover"
                    />
                  </div>
                  <div className="ml-3 flex-grow overflow-hidden">
                    <div className="truncate">{item.product.name}</div>
                    <div className="mt-3">x{item.buy_count}</div>
                  </div>
                  <div className="ml-3 flex-shrink-0">
                    <span className="truncate text-gray-500 line-through">
                      đ{formatCurrency(item.product.price_before_discount)}
                    </span>
                    <span className="ml-2 truncate text-orange">
                      đ{formatCurrency(item.product.price)}
                    </span>
                  </div>
                </Link>
                <div className="flex justify-end">
                  <div>
                    <span className="text-lg font-semibold underline">
                      Tổng giá tiền:
                    </span>
                    <span className="ml-4 text-xl text-orange">
                      đ{formatCurrency(item.product.price * item.buy_count)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
