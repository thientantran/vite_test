/* eslint-disable react/prop-types */
import React, { useState } from "react";

import InputNumber from "./InputNumber";

export default function QuantityController({
  max,
  onIncrease,
  onDecrease,
  onType,
  value,
  ...rest
}) {
  const [localValue, setLocalValue] = useState(Number(value) || 0);
  const handleChange = (event) => {
    let _value = Number(event.target.value);
    // xử lý nếu nhập vào sai giá trị
    if (max !== undefined && _value > max) {
      _value = max;
    } else if (_value < 1) {
      _value = 1;
    }
    onType && onType(_value);
    setLocalValue(_value);
  };
  const increase = () => {
    let _value = Number(value || localValue) + 1;
    if (max !== undefined && _value > max) {
      _value = max;
    }
    onIncrease && onIncrease(_value);
    setLocalValue(_value);
  };

  const decrease = () => {
    let _value = Number(value || localValue) - 1;
    if (_value < 1) {
      _value = 1;
    }
    onDecrease && onDecrease(_value);
    setLocalValue(_value);
  };
  return (
    <div className="ml-10 flex items-center">
      <button
        onClick={decrease}
        className="flex items-center h-8 w-8 justify-center rounded-l-sm border border-gray-300 text-gray-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
        </svg>
      </button>
      <InputNumber
        className=""
        classNameError="hidden"
        value={value || localValue}
        classNameInput="h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none"
        onChange={handleChange}
        {...rest}
      />
      <button
        onClick={increase}
        className="flex items-center h-8 w-8 justify-center rounded-l-sm border border-gray-300 text-gray-600"
      >
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
  );
}
