/* eslint-disable react/prop-types */
import React from "react";

export default function Input({
  type,
  name,
  placeholder,
  register,
  errorMessage,
  className,
  classNameInput = "w-full p-3 rounded-sm border border-gray-300 outline-none focus:border-gray-500 focus:shadow-sm",
  classNameError = "mt-1 min-h-[1rem] text-red-600 text-sm",
}) {
  const registerInput = register && name ? register(name) : {};
  return (
    <div className={className}>
      <input
        type={type}
        {...registerInput}
        placeholder={placeholder}
        className={classNameInput}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  );
}
