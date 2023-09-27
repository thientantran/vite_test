/* eslint-disable react/prop-types */
import { range } from "lodash";
import React, { useEffect, useState } from "react";

export default function DateSelect({ value, onChange, errorMessage }) {
  console.log(value);
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990,
  });
  useEffect(() => {
    if (value) {
      setDate({
        date: value?.getDate(),
        month: value?.getMonth(),
        year: value?.getFullYear(),
      });
    }
  }, [value]);
  const handleChange = (event) => {
    const { value: valueForm, name } = event.target;
    const newDate = {
      // ...date,
      // nên để vậy để hơn vì nếu dùng date... như ở trên thì nó binding ra 1/1/1900, vì nó fetch api ko kịp, nhưng để useeffect như ở tren thì ok, khắc phục được
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueForm),
    };
    setDate(newDate);
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date));
  };
  return (
    <div className="mt-2 flex flex-col flex-wrap md:flex-row">
      <div className="truncate pt-3 text-right capitalize w-[20%]">
        Ngay sinh
      </div>
      <div className="pl-5 w-[80%]">
        <div className="flex justify-between">
          <select
            className="h-10 w-[32%] rounded-sm border border-black/10 px-3"
            onChange={handleChange}
            name="date"
            value={value?.getDate() || date.date}
          >
            <option disabled>Ngay</option>
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            className="h-10 w-[32%] rounded-sm border border-black/10 px-3"
            onChange={handleChange}
            name="month"
            value={value?.getMonth() || date.month}
          >
            <option disabled>Thang</option>
            {range(0, 12).map((item) => (
              <option value={item} key={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            className="h-10 w-[32%] rounded-sm border border-black/10 px-3"
            onChange={handleChange}
            name="year"
            value={value?.getFullYear() || date.year}
          >
            <option disabled>Nam</option>
            {range(1990, 2030).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-1 text-sm text-red-600 min-h-[1.25rem]">
          {errorMessage}
        </div>
      </div>
    </div>
  );
}
