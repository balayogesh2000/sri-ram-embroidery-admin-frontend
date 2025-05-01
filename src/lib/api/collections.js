import { axiosServerInstance } from ".";

const collections = {
  create: async (data) => await axiosServerInstance.post("/collections", data),
  getAll: async () => (await axiosServerInstance.get("/collections")).data,
  getOne: async (id) =>
    (await axiosServerInstance.get(`/collections/${id}`)).data,
  update: async (id, data) =>
    (await axiosServerInstance.patch(`/collections/${id}`, data)).data,
  delete: async (id) =>
    (await axiosServerInstance.delete(`/collections/${id}`)).data,
  assignProducts: async (id, data) =>
    (await axiosServerInstance.patch(`/collections/${id}/assignProducts`, data))
      .data,
  removeProduct: async ({ collectionId, productId }) =>
    (
      await axiosServerInstance.patch(
        `/collections/${collectionId}/products/${productId}/remove`
      )
    ).data,
  getAssignableProducts: async (collectionId) =>
    (
      await axiosServerInstance.get(
        `/collections/${collectionId}/assignableProducts`
      )
    ).data,
};

export default collections;
