/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useController } from "react-hook-form";

function InputV2(props) {
  const {
    type,
    errorMessage,
    className,
    classNameInput = "w-full p-3 rounded-sm border border-gray-300 outline-none focus:border-gray-500 focus:shadow-sm",
    classNameError = "mt-1 min-h-[1rem] text-red-600 text-sm",
    onChange,
    value = "",
    ...rest
  } = props;
  const { field, fieldState } = useController(props);
  const [localValue, setLocalValue] = useState(field.value);
  const handleChange = (event) => {
    const valueFormInput = event.target.value;
    const numberCondition =
      type === "number" &&
      (/^\d+$/.test(valueFormInput) || valueFormInput === "");
    // co nghi la cho nay` neu la number thi phai chi la so thoi, neu la chu thi` la false, thoa dieu kien o duoi, vi type === number
    // tong ket: phai la so va chi la so hoac type !== number moi onChange
    console.log(numberCondition);
    if (numberCondition || type !== "number") {
      // cap nhat local value state
      setLocalValue(valueFormInput);
      // cap nhat state react hook form
      field.onChange(event);
      // thực thi onchange callback từ bên ngoài truyền vào props
      onChange && onChange(event);
    }
  };
  return (
    <div className={className}>
      <input
        className={classNameInput}
        {...rest}
        {...field}
        //phải đẻ field và rest phía trước cái onChange được truyền vào, do trong field có 1 hàm onChange builtin, do đó có thể overwrite cái hàm onChange được truyền vào
        onChange={handleChange}
        value={value || localValue}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  );
}
export default InputV2;
