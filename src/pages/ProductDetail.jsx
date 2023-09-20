import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { productApi } from "../apis/api";
import InputNumber from "../components/InputNumber";
import Product from "../components/Product";
import Rating from "../components/Rating";
import {
  formatCurrency,
  formatNumberToSocialStyle,
  getIdFromNameId,
  rateSale,
} from "../utils/functions";

export default function ProductDetail() {
  const { nameId } = useParams();
  const id = getIdFromNameId(nameId);
  const { data: productDetailData } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productApi.getProductDetail(id),
  });
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5]);
  // là 1 array 2 chữ số, để dùng cho slice ở dưới
  const product = productDetailData?.data.data;
  // use memo được sử dụng để tôi ưu performance của react component, khi những giúp ko chạy lại những functiond, và chỉ chạy lại khi có 1 parameter thay đổi
  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages],
  );
  const queryConfig = {
    limit: "20",
    page: "1",
    category: product?.category._id,
  };

  const { data: productsData } = useQuery({
    queryKey: ["products", queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig);
    },
    staleTime: 3 * 60 * 1000,
    // phải set stale time bằng cái product list, vì nếu ko set thì là 0, thì lần 2 gọi sẽ tiếp tục gọi API, do đó để ở cái này ko cần gọi lại nên phải set lại staletime
    enabled: Boolean(product),
    // chỉ gọi api khi mà có product, ko có thì ko gọi api này
  });

  // chọn bức hình để làm main image
  const [activeImage, setActiveImage] = useState("");
  const imageRef = useRef(null);
  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0]);
    }
  }, [product]);

  const next = () => {
    if (currentIndexImages[1] < product.images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1]);
    }
  };
  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1]);
    }
  };
  const chooseActive = (img) => {
    setActiveImage(img);
  };
  const handleZoom = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    // lấy chiều cao và chiều rộng của thẻ div chứa
    const image = imageRef.current;
    const { naturalHeight, naturalWidth } = image;
    const { offsetX, offsetY } = event.nativeEvent;
    // offsetX, offsetY là vị trí con trỏ theo toạ độ X, Y ở trong cái thẻ mà mình gắn function
    // dùng cách lấy offset như trên thì phải giải quyết bubble event, còn nếu ko có thể dùng cách sau đây
    // khi đó có thể xoá cái pointer-events-none
    // const offsetX = event.pageX - (rect.x + window.scrollX)
    // const offsetY = event.pageY - (rect.y + window.scrollY)
    const top = offsetX * (1 - naturalHeight / rect.height);
    const left = offsetY * (1 - naturalWidth / rect.width);
    image.style.width = naturalWidth + "px";
    image.style.height = naturalHeight + "px";
    image.style.maxWidth = "unset";
    image.style.top = top + "px";
    image.style.left = left + "px";
    // event bubble là khi hover vào thẻ con, cũng có nghĩ là đang hover vào thẻ cha, có thể gây sai sót
  };
  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute("style");
  };
  if (!product) {
    return null;
  }

  return (
    <div className="bg-gray-200 py-6">
      <div className="container">
        <div className="bg-white p-4 shadow">
          <div className="grid grid-cols-12 gap-9">
            {/* bên trái */}
            <div className="col-span-5">
              <div
                className="relative w-full pt-[100%] shadow cursor-zoom-in overflow-hidden"
                onMouseLeave={handleRemoveZoom}
                onMouseMove={handleZoom}
              >
                <img
                  src={activeImage}
                  alt={product.image}
                  className="absolute left-0 top-0 h-full w-full bg-white object-cover pointer-events-none"
                  ref={imageRef}
                  // pointer-events-none để không bị event bubble, (là khi hover vào thẻ con, cũng có nghĩa là thẻ cha, có thể gây sai số)
                />
              </div>
              <div className="relative grid grid-cols-5 gap-1">
                {/* chỗ này phải để relative và absolute vì nút button sẽ đè lên các hình, và click vào */}
                <button
                  onClick={prev}
                  className="absolute left-0 top-1/2 z-10 -translate-y-1/2 h-9 w-5 bg-black/20 text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
                {currentImages.map((img, index) => {
                  const isActive = img === activeImage;
                  return (
                    <div
                      className="relative w-full cursor-pointer"
                      key={img}
                      onMouseEnter={() => chooseActive(img)}
                    >
                      <img
                        src={img}
                        alt={img}
                        className="abosulute left-0 top-0 h-full w-full cursor-pointer bg-white object-cover"
                      />
                      {isActive && (
                        <div className="absolute inset-0 border-2 border-orange" />
                      )}
                    </div>
                  );
                })}
                <button
                  onClick={next}
                  className="absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="col-span-7">
              <h1 className="text-xl font-medium uppercase">{product.name}</h1>
              {/* rating and sold */}
              <div className="mt-8 flex items-center">
                <div className="items-center flex">
                  <span className="mr-1 border-b border-b-orange text-orange">
                    {product.rating}
                  </span>
                  <Rating rating={product.rating} />
                </div>
                <div className="mx-4 h-4 w-[1px]" />
                <div>
                  <span>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className="ml-1 text-gray-500">Đánh giá</span>
                </div>
              </div>
              {/* Price */}
              <div className="mt-8 flex items-center bg-gray-50 px-5 py-4">
                <div className="text-gray-500 line-through">
                  đ{formatCurrency(product.price_before_discount)}
                </div>
                <div className="ml-3 text-3xl font-medium text-orange">
                  đ{formatCurrency(product.price)}
                </div>
                <div className="ml-3 bg-orange px-1 text-xs font-semibold uppercase text-white py-[2px]">
                  {rateSale(product.price_before_discount, product.price)} giảm
                </div>
              </div>
              {/* Nhap so luong mua */}
              <div className="mt-8 flex items-center">
                <div className="capitalize text-gray-500">Số lượng</div>
                <div className="ml-10 flex items-center">
                  <button className="flex items-center h-8 w-8 justify-center rounded-l-sm border border-gray-300 text-gray-600">
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
                        d="M19.5 12h-15"
                      />
                    </svg>
                  </button>
                  <InputNumber
                    className=""
                    classNameError="hidden"
                    value={1}
                    classNameInput="h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none"
                  />
                  <button className="flex items-center h-8 w-8 justify-center rounded-l-sm border border-gray-300 text-gray-600">
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
                <div className="ml-6 text-sm text-gray-500">
                  {product.quantity} sản phẩm có sẵn
                </div>
              </div>
              {/* Đặt mua */}
              <div className="mt-8 flex items-center">
                <button className="flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm hover:bg-orange/5">
                  <svg
                    enableBackground="new 0 0 15 15"
                    viewBox="0 0 15 15"
                    x="0"
                    y="0"
                    className="mr-[10px] h-5 w-5 fill-current stroke-orange text-orange"
                  >
                    <g>
                      <g>
                        <polyline
                          fill="none"
                          points=".5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit="10"
                        />
                        <circle cx="6" cy="13.5" r="1" stroke="none" />
                        <circle cx="11.5" cy="13.5" r="1" stroke="none" />
                      </g>
                      <line
                        fill="none"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        x1="7.5"
                        x2="10.5"
                        y1="7"
                        y2="7"
                      />
                      <line
                        fill="none"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        x1="9"
                        x2="9"
                        y1="8.5"
                        y2="5.5"
                      />
                    </g>
                  </svg>
                  thêm vào giỏ hàng
                </button>
                <button className="ml-4 flex h-12 bg-orange items-center min-w-[5rem] justify-center rounded-sm px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90">
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="container">
        <div className="mt-8 bg-white p-4 shadow">
          <div className="rounded bg-gray-50 p-4 text-lg capitalize text-slate-700">
            Mô tả sản phẩm
          </div>
          <div className="mx-4 mb-4 mt-12 text-sm leading-loose">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="container">
          <div className="uppercase text-gray-400">Có thể bạn cũng thích</div>
          {productsData && (
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {productsData.data.data.products.map((product) => (
                <div className="col-span-1" key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
