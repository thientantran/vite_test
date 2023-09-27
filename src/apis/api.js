import http from "../utils/http";

const URL = {
  products: "products",
  categories: "categories",
  purchases: "purchases",
  user: "user",
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
  buyProducts(body) {
    return http.post(`${URL.purchases}/buy-products`, body);
  },
  updatePurchases(body) {
    return http.put(`${URL.purchases}/update-purchase`, body);
  },
  deletePurchase(purchaseId) {
    return http.delete(`${URL.purchases}`, {
      data: purchaseId,
    });
  },
};

export const userApi = {
  getProfile() {
    return http.get("me");
  },
  updateProfile(body) {
    return http.put(URL.user, body);
  },
};
