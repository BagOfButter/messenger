import axios from "axios";
import { authActions } from "@features/authorization/models/actions";
import { userActions } from "@features/user/models/actions";
import { selectUserId } from "@features/user/models/selector";
import { selectAccessToken } from "@features/authorization/models/selector";
import { store } from "@lib/redux/store";
import { refreshAccessToken } from "@lib/api/refresh";

const baseURL = "http://localhost:3000";

export const privateInstance = axios.create({
  baseURL,
  withCredentials: true,
});

privateInstance.interceptors.request.use(
  async (config) => {
    const token = selectAccessToken(store.getState()) ?? "";
    if (token && config?.headers) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

privateInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "Invalid access token" &&
      !originalRequest._retry &&
      !originalRequest._isRefreshingToken
    ) {
      originalRequest._retry = true;
      originalRequest._isRefreshingToken = true;
      try {
        const userId = selectUserId(store.getState());
        const res = await refreshAccessToken(userId);
        const accessToken = res.data.accessToken;
        store.dispatch(authActions.setAccess(accessToken));
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return privateInstance(originalRequest);
      } catch (refreshError) {
        store.dispatch(authActions.logout());
        store.dispatch(userActions.removeUser());
        return Promise.reject(refreshError);
      } finally {
        originalRequest._isRefreshingToken = false;
      }
    }
    return Promise.reject(error);
  }
);

export const apiPrivate = privateInstance;
