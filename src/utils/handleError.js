import { toast } from "react-toastify";

const handleError = async (error) => {
  console.error(error);
  toast.error(error?.response?.data?.message || "Something went wrong");
};

export default handleError;
