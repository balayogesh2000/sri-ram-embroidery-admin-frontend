import { axiosServerInstance } from ".";

const products = {
  create: async (data) => await axiosServerInstance.post("/products", data),
  getAll: async () => (await axiosServerInstance.get("/products")).data,
  getById: async (id) =>
    (await axiosServerInstance.get(`/products/${id}`)).data,
  update: async (id, data) =>
    (await axiosServerInstance.put(`/products/${id}`, data)).data,
  delete: async (id) => await axiosServerInstance.delete(`/products/${id}`),
};

export default products;
