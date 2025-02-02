import { axiosServerInstance } from ".";

const auth = {
  login: async ({ email, password }) =>
    (await axiosServerInstance.post("/auth/login", { email, password })).data,
};

export default auth;
