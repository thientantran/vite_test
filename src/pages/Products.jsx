import { useQuery } from "@tanstack/react-query";
import { isUndefined, omitBy } from "lodash";
import React from "react";

import { productApi } from "../apis/api";
import AsideFilter from "../components/AsideFilter";
import Pagination from "../components/Pagination";
import Product from "../components/Product";
import SortProductList from "../components/SortProductList";
import useQueryParams from "../hooks/useQueryParams";

export default function Products() {
  const queryParams = useQueryParams();
  const queryConfig = omitBy(
    {
      page: queryParams.page || "1",
      limit: queryParams.limit || 20,
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
    },
    isUndefined,
  );
  const { data: productsData } = useQuery({
    queryKey: ["products", queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig);
    },
  });

  return (
    <div className="bg-gray-200 py-6">
      <div className="container">
        {/* phai de vay de call Api truoc roi moi render  */}
        {productsData && (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <AsideFilter />
            </div>
            <div className="col-span-9">
              <SortProductList
                queryConfig={queryConfig}
                pageSize={productsData.data.data.pagination.page_size}
              />
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-5">
                {productsData.data.data.products.map((product) => (
                  <div className="col-span-1" key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination
                pageSize={productsData.data.data.pagination.page_size}
                queryConfig={queryConfig}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
