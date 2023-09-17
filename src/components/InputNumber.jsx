/* eslint-disable react/prop-types */
import React, { forwardRef } from "react";

const InputNumber = forwardRef(function InputNumber(
  {
    errorMessage,
    className,
    classNameInput = "w-full p-3 rounded-sm border border-gray-300 outline-none focus:border-gray-500 focus:shadow-sm",
    classNameError = "mt-1 min-h-[1rem] text-red-600 text-sm",
    onChange,
    ...rest
  },
  ref,
) {
  const handleChange = (event) => {
    const { value } = event.target;
    if ((/^\d+$/.test(value) || value === "") && onChange) {
      onChange(event);
    }
  };
  return (
    <div className={className}>
      <input
        className={classNameInput}
        onChange={handleChange}
        {...rest}
        ref={ref}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  );
});
export default InputNumber;
