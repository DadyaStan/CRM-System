import axios from "axios";

import tokenService from "@/services/token.service";

import { refreshToken, logout } from "./authApi";

export const api = axios.create({
  baseURL: "https://easydev.club/api/v1",
});

api.interceptors.request.use(
  async (config) => {
    const token = tokenService.getToken();

    const expiresIn = tokenService.getTokenExpiration();

    // Вынести в отдельную проверку которая сама будет рефрешить токен
    if (token && expiresIn < 360) {
      await refreshToken();
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(error.config);

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        if (localStorage.getItem("refreshToken")) {
          await refreshToken();

          return api.request(originalRequest);
        }
      } catch {
        console.error(`Ошибка при обновлении токена: ${error.response}`);

        logout();
      }
    }

    return Promise.reject(error);
  },
);
