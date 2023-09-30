/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import { toast } from "react-toastify";

export default function InputFile({ setFile }) {
  const inputFileRef = useRef(null);
  // Tạo cái này để liên kết với nút button, khi nào nut button click thì nó ref tới chỗ choose file
  const handleUpload = () => {
    inputFileRef.current?.click();
  };

  const onFileChange = (event) => {
    const fileFromLocal = event.target.files?.[0];
    if (
      fileFromLocal &&
      (fileFromLocal.size >= 1048576 || fileFromLocal.type.includes("images"))
    ) {
      toast.error("File không đúng định dạng");
    } else {
      setFile && setFile(fileFromLocal);
    }
  };
  return (
    <>
      <input
        type="file"
        className="hidden"
        accept=".jpg, .jpeg,.png"
        ref={inputFileRef}
        onChange={onFileChange}
        // onchange này chỉ thay đổi cho 2 lần click 2 bức anr khác nhau
        onClick={(event) => {
          event.value = null;
        }}
      />
      <button
        type="button"
        // type button để khi click vào thì ko có submit form
        onClick={handleUpload}
        className="flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm"
      >
        Chon anh
      </button>
    </>
  );
}
