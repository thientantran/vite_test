import http from "../utils/http";

const URL = {
  products: "products",
  categories: "categories",
};

export const productApi = {
  getProducts(params) {
    return http.get(URL.products, { params });
  },
  getProductDetail(id) {
    return http.get(`${URL.products}/${id}`);
  },
};

export const categoryApi = {
  getCategories() {
    return http.get(URL.categories);
  },
};
