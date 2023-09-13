import http from "../utils/http";

const URL = {
  products: "products",
};

export const productApi = {
  getProducts(params) {
    return http.get(URL.products, { params });
  },
  getProductDetail(id) {
    return http.get(`${URL}/${id}`);
  },
};
