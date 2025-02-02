import { axiosServerInstance } from ".";

const admin = {
  getOverview: async () =>
    (await axiosServerInstance.get("/admin/overview")).data,
};

export default admin;
