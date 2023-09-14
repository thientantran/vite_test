/* eslint-disable react/prop-types */
import classNames from "classnames";
import React from "react";

const RANGE = 2;

export default function Pagination({ page, setPage, pageSize }) {
  const renderPagination = () => {
    let dotAfter = false;
    let dotBefore = false;
    const renderDotBefore = (index) => {
      if (!dotBefore) {
        dotBefore = true;
        return (
          <span
            key={index}
            className="mx-2 cursor-pointer rounded bg-white px-3 py-2 shadow-sm"
          >
            ...
          </span>
        );
      }
    };
    const renderDotAfter = (index) => {
      if (!dotAfter) {
        dotAfter = true;
        return (
          <span
            key={index}
            className="mx-2 cursor-pointer rounded bg-white px-3 py-2 shadow-sm"
          >
            ...
          </span>
        );
      }
    };
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1;
        if (
          page <= RANGE * 2 + 1 &&
          pageNumber > page + RANGE &&
          pageNumber < pageSize - RANGE + 1
        ) {
          return renderDotAfter(index);
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index);
          } else if (
            pageNumber > page + RANGE &&
            pageNumber < pageSize - RANGE + 1
          ) {
            return renderDotAfter(index);
          }
        } else if (
          page >= pageSize - RANGE * 2 &&
          pageNumber > RANGE &&
          pageNumber < page - RANGE
        ) {
          return renderDotBefore(index);
        }
        return (
          <button
            key={index}
            className={classNames(
              "mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm hover:bg-slate-100",
              {
                "border-cyan-500": pageNumber === page,
                "border-transparent": pageNumber !== page,
              },
            )}
            onClick={() => handleClick(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      });
  };
  const handleClick = (pageNumber) => {
    setPage(pageNumber);
  };
  return (
    <div className="mt-6 flex-wrap flex justify-center">
      <button className="mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm hover:bg-slate-100">
        Prev
      </button>
      {renderPagination()}
      <button className="mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm hover:bg-slate-100">
        Next
      </button>
    </div>
  );
}
