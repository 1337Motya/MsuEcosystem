import axios from "axios";
import store from "../redux/store";
import { refreshToken } from "../redux/actions/auth";

const apiInstance = axios.create({
  withCredentials: true,
  baseURL: "https://localhost:44378/api/",
});

apiInstance.interceptors.request.use(
  (request) => {
    request.headers.Authorization =
      "Bearer " + store.getState().auth.accessToken;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      var newToken = await store.dispatch(refreshToken());
      return new Promise((resolve) => {
        originalRequest.headers.Authorization = "Bearer " + newToken;
        resolve(apiInstance(originalRequest));
      });
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
