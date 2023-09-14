import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

import { productApi } from "../apis/api";
import AsideFilter from "../components/AsideFilter";
import Pagination from "../components/Pagination";
import Product from "../components/Product";
import SortProductList from "../components/SortProductList";
import useQueryParams from "../hooks/useQueryParams";

export default function Products() {
  const queryParams = useQueryParams();
  const [page, setPage] = useState(1);
  const { data } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => {
      return productApi.getProducts(queryParams);
    },
  });

  return (
    <div className="bg-gray-200 py-6">
      <div className="container">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <AsideFilter />
          </div>
          <div className="col-span-9">
            <SortProductList />
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-5">
              {data &&
                data.data.data.products.map((product) => (
                  <div className="col-span-1" key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
            </div>
            <Pagination pageSize={20} page={page} setPage={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
}
