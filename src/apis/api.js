import http from "../utils/http";

const URL = {
  products: "products",
  categories: "categories",
  purchases: "purchases",
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

export const purchaseApi = {
  addToCar(body) {
    return http.post(`${URL.purchases}/add-to-cart`, body);
  },
  getPurchases(params) {
    return http.get(`${URL.purchases}`, {
      params,
    });
  },
};
