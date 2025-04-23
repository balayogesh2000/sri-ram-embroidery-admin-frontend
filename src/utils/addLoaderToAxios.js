import { showLoader, hideLoader } from "@/components/Loader";

const addLoaderToAxios = (axios) => {
  let numOfCalls = 0;

  axios.interceptors.request.use(
    function (config) {
      if (!config.skipLoader) {
        if (numOfCalls === 0) {
          showLoader();
        }
        numOfCalls++;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      if (!response.config.skipLoader) {
        numOfCalls--;
        if (numOfCalls === 0) {
          hideLoader();
        }
      }
      return response;
    },
    function (error) {
      const config = error.config || {};
      if (!config.skipLoader) {
        numOfCalls--;
        if (numOfCalls === 0) {
          hideLoader();
        }
      }
      return Promise.reject(error);
    }
  );
};

export default addLoaderToAxios;
