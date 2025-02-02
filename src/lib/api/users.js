import { axiosServerInstance } from ".";

let base = "/users/";

const getMe = async () => (await axiosServerInstance.get(base + "me")).data;

const users = {
  getMe,
};

export default users;
