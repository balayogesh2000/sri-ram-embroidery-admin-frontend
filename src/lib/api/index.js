import axios from "axios";
import products from "./products";
import enquiries from "./enquiries";
import auth from "./auth";
import users from "./users";
import admin from "./admin";
import addLoaderToAxios from "@/utils/addLoaderToAxios";

export const axiosServerInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

addLoaderToAxios(axiosServerInstance);

const api = {
  auth,
  users,
  products,
  enquiries,
  admin,
};

export default api;
