/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import Rating from "./Rating";
import {
  formatCurrency,
  formatNumberToSocialStyle,
  generateNameId,
} from "../utils/functions";

export default function Product({ product }) {
  return (
    <Link to={`/${generateNameId({ name: product.name, id: product._id })}`}>
      <div className="rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md">
        <div className="relative w-full pt-[100%]">
          <img
            src={product.image}
            alt={product.name}
            className="absolute left-0 top-0 h-full w-full bg-white object-cover"
          />
        </div>
        <div className="overflow-hidden p-2">
          <div className="min-h-[2rem] text-xs line-clamp-2">
            {product.name}
          </div>
          <div className="mt-3 flex items-center">
            <div className="max-w-[50%] truncate text-gray-500 line-through">
              <span className="text-xs">₫</span>
              <span>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className="ml-1 truncate text-orange">
              <span className="text-xs">₫</span>
              <span>{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-end">
            <Rating rating={product.rating} />
            <div className="ml-2 text-sm">
              <span>{formatNumberToSocialStyle(product.sold)}</span>
              <span className="ml-1">Da ban</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
