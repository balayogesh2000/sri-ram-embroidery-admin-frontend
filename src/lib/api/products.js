import { axiosServerInstance } from ".";

const products = {
  create: async (data) => await axiosServerInstance.post("/products", data),
  getAllActiveProducts: async () =>
    (await axiosServerInstance.get("/products/active")).data,
  archive: async (id) =>
    (await axiosServerInstance.patch(`/products/${id}/archive`)).data,
  restore: async (id) =>
    (await axiosServerInstance.patch(`/products/${id}/restore`)).data,
  getAllArchivedProducts: async () =>
    (await axiosServerInstance.get("/products/archived")).data,
  getOne: async (id) => (await axiosServerInstance.get(`/products/${id}`)).data,
};

export default products;
