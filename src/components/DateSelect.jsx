import { range } from "lodash";
import React from "react";

export default function DateSelect() {
  return (
    <div className="mt-2 flex flex-col flex-wrap md:flex-row">
      <div className="truncate pt-3 text-right capitalize w-[20%]">
        Ngay sinh
      </div>
      <div className="pl-5 w-[80%]">
        <div className="flex justify-between">
          <select className="h-10 w-[32%] rounded-sm border border-black/10 px-3">
            <option disabled>Ngay</option>
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select className="h-10 w-[32%] rounded-sm border border-black/10 px-3">
            <option disabled>Thang</option>
            {range(0, 12).map((item) => (
              <option value={item} key={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select className="h-10 w-[32%] rounded-sm border border-black/10 px-3">
            <option disabled>Nam</option>
            {range(1990, 2030).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
