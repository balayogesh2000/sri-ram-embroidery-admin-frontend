import { toast } from "react-toastify";

import { showLoader, hideLoader } from "@/components/Loader";

const addLoaderToAxios = (axios) => {
  let timer;
  let numOfCalls = 0;

  axios.interceptors.request.use(
    function (config) {
      numOfCalls++;

      if (!config.skipLoader) {
        if (timer) {
          clearTimeout(timer);
        }
        showLoader();
        timer = setTimeout(() => {
          hideLoader();
          toast.warn("Server is taking longer time than expected");
        }, 10000);
      }

      return config;
    },
    function (error) {
      numOfCalls--;
      if (timer) {
        clearTimeout(timer);
      }
      hideLoader();
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      numOfCalls--;
      if (timer) {
        clearTimeout(timer);
      }
      if (numOfCalls === 0 && !response.config.skipLoader) {
        hideLoader();
      }
      return response;
    },
    function (error) {
      numOfCalls--;
      if (timer) {
        clearTimeout(timer);
      }
      hideLoader();
      return Promise.reject(error);
    }
  );
};

export default addLoaderToAxios;
