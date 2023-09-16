/* eslint-disable react/prop-types */
import classNames from "classnames";
import { omit } from "lodash";
import React from "react";
import { Link, createSearchParams, useNavigate } from "react-router-dom";

import { sortBy } from "../utils/constants";

export default function SortProductList({ queryConfig, pageSize }) {
  const page = Number(queryConfig.page);
  const { sort_by = sortBy.createdAt, order } = queryConfig;
  const navigate = useNavigate();
  const isActiveSortBy = (sortByValue) => {
    return sort_by === sortByValue;
  };

  const handleSort = (sortByValue) => {
    navigate({
      pathname: "/",
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue,
          },
          ["order"],
        ),
      ).toString(),
    });
  };
  const handlePriceOrder = (orderValue) => {
    navigate({
      pathname: "/",
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue,
      }).toString(),
    });
  };
  return (
    <div className="bg-gray-300/40 px-3 py-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div>Sap xep theo</div>
          <button
            className={classNames(
              " px-4 h-8 text-sm rounded-sm hover:bg-orange/80",
              {
                "bg-orange  text-white": isActiveSortBy(sortBy.view),
                "bg-white text-black": !isActiveSortBy(sortBy.view),
              },
            )}
            onClick={() => handleSort(sortBy.view)}
          >
            Pho bien
          </button>
          <button
            className={classNames(
              " px-4 h-8 text-sm rounded-sm hover:bg-orange/80",
              {
                "bg-orange  text-white": isActiveSortBy(sortBy.createdAt),
                "bg-white text-black": !isActiveSortBy(sortBy.createdAt),
              },
            )}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            Moi nhat
          </button>
          <button
            className={classNames(
              " px-4 h-8 text-sm rounded-sm hover:bg-orange/80",
              {
                "bg-orange  text-white": isActiveSortBy(sortBy.sold),
                "bg-white text-black": !isActiveSortBy(sortBy.sold),
              },
            )}
            onClick={() => handleSort(sortBy.sold)}
          >
            Ban chay
          </button>
          <select
            className={classNames(
              "h-8 cursor-pointer outline-none capitalize text-left text-sm px-4 hover:bg-orange/80",
              {
                "bg-orange text-white": isActiveSortBy(sortBy.price),
                "bg-white text-black": !isActiveSortBy(sortBy.price),
              },
            )}
            value={order || ""}
            onChange={(event) => {
              handlePriceOrder(event.target.value);
            }}
          >
            <option value="" disabled>
              Gia
            </option>
            <option value="asc">Gia: Thap den cao</option>
            <option value="desc">Gia: Cao den thap</option>
          </select>
        </div>
        <div className="flex items-center">
          <div>
            <span className="text-orange">{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className="ml-2 flex">
            {page === 1 ? (
              <span className="h-8 w-9 flex items-center justify-center rounded-bl-sm cursor-not-allowed mr-1 rounded-tl-sm bg-white/60 px-3 hover:bg-slate-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-3 w-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                  />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: "/",
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString(),
                  }).toString(),
                }}
                className="h-8 w-9 flex items-center justify-center rounded-bl-sm mr-1 bg-white rounded-tl-sm px-3 hover:bg-slate-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-3 w-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                  />
                </svg>
              </Link>
            )}
            {page === pageSize ? (
              <span className="h-8 w-9 flex items-center justify-center rounded-bl-sm cursor-not-allowed mr-1 rounded-tl-sm bg-white/60 px-3 hover:bg-slate-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-3 w-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: "/",
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString(),
                  }).toString(),
                }}
                className="h-8 w-9 flex items-center justify-center rounded-bl-sm mr-1 rounded-tl-sm px-3 bg-white hover:bg-slate-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-3 w-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
