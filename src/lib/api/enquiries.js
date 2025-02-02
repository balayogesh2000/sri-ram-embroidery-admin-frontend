import { axiosServerInstance } from ".";

const base = "/enquiries";

const enquiries = {
  getAll: async () => (await axiosServerInstance.get(base)).data,
  getById: async (id) => (await axiosServerInstance.get(`${base}/${id}`)).data,
};

export default enquiries;
