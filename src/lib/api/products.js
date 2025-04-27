import { axiosServerInstance } from ".";

const products = {
  create: async (data) => await axiosServerInstance.post("/products", data),
  getAllProducts: async () => (await axiosServerInstance.get("/products")).data,
  getOne: async (id) => (await axiosServerInstance.get(`/products/${id}`)).data,
  update: async (id, data) =>
    (await axiosServerInstance.patch(`/products/${id}`, data)).data,
  delete: async (id) =>
    (await axiosServerInstance.delete(`/products/${id}`)).data,
};

export default products;
