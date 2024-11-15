import axios from "axios";
import { Token } from "@/types/auth";

import router from "@/router";

export const api = axios.create({
  baseURL: "https://easydev.club/api/v1",
});

const refreshToken = async (): Promise<void> => {
  try {
    const response = await axios.post<Token>(
      "https://easydev.club/api/v1/auth/refresh",
      {
        refreshToken: localStorage.getItem("refreshToken"),
      },
    );

    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
  } catch (error) {
    console.log(`Ошибка при обновлении токена: ${error}`);

    throw error;
  }
};
const decodeToken = (token: string): any => {
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
};
const checkTokenExpiration = (): number | string => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) return 0;

  const decodedToken = decodeToken(accessToken);
  const currentTime = Math.floor(Date.now() / 1000);

  return decodedToken.exp - currentTime;
};
const checkExpiresIn = (): void => {
  const expirationTime = checkTokenExpiration();
  console.log(`Time to refresh: ${expirationTime}`);
};
const systemLogout = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  router.push("/CRM-System/auth/login");

  console.log("System logout");
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    checkExpiresIn();

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

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        await refreshToken();

        return api.request(originalRequest);
      } catch {
        console.error(`Ошибка при обновлении токена: ${error.response}`);

        systemLogout();
      }
    }

    return Promise.reject(error);
  },
);
