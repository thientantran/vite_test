import classNames from "classnames";
import React from "react";
import { Link, createSearchParams } from "react-router-dom";

import useQueryParams from "../hooks/useQueryParams";
import { purchaseStatus } from "../utils/constants";
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
        </div>
      </div>
    </div>
  );
}
