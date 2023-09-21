/* eslint-disable react/prop-types */
import React, { forwardRef, useState } from "react";

const InputV2 = forwardRef(function InputNumber(
  {
    errorMessage,
    className,
    classNameInput = "w-full p-3 rounded-sm border border-gray-300 outline-none focus:border-gray-500 focus:shadow-sm",
    classNameError = "mt-1 min-h-[1rem] text-red-600 text-sm",
    onChange,
    value = "",
    ...rest
  },
  ref,
) {
  const [localValue, setLocalValue] = useState(value);
  const handleChange = (event) => {
    const { value } = event.target;
    if (/^\d+$/.test(value) || value === "") {
      // thực thi onchange callback từ bên ngoài truyền vào props
      onChange && onChange(event);
      // cap nhat local value state
      setLocalValue(value);
    }
  };
  return (
    <div className={className}>
      <input
        className={classNameInput}
        onChange={handleChange}
        {...rest}
        ref={ref}
        value={value || localValue}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  );
});
export default InputV2;
