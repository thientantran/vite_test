/* eslint-disable react/prop-types */
import React from "react";

export default function Input({
  type,
  name,
  placeholder,
  register,
  errorMessage,
  className,
}) {
  return (
    <div className={className}>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className="w-full p-3 rounded-sm border border-gray-300 outline-none focus:border-gray-500 focus:shadow-sm"
      />
      <div className="mt-1 min-h-[1rem] text-red-600 text-sm">
        {errorMessage}
      </div>
    </div>
  );
}
