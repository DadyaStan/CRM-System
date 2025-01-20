import axios from "axios";

import { api } from "./api";
import tokenService from "@/services/token.service";
import { useSessionStore } from "@/store/sessionStore";

import { Token, UserRegistration, AuthData, Profile } from "@/types/auth";

const sessionStore = useSessionStore();

export const signup = async (registrationData: UserRegistration) => {
  try {
    const response = await api.post<Profile>("/auth/signup", registrationData);

    if (response.status === 201) {
      return response;
    }
  } catch (error: any) {
    if (error.status === 400) {
      alert(
        "400 Bad Request: Ошибка десериализации запроса или неверный ввод.",
      );
    } else if (error.status === 409) {
      alert("409 Conflict: Пользователь уже существует.");
    } else if (error.status === 500) {
      alert("500 Internal Server Error: Внутренняя ошибка сервера.");
    }

    throw error;
  }
};
export const signin = async (loginData: AuthData): Promise<string | void> => {
  try {
    const response = await api.post<Token>("/auth/signin", loginData);

    if (response.status === 200) {
      tokenService.setToken(response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      await sessionStore.setUserData();

      return response.data.accessToken;
    }
  } catch (error: any) {
    if (error.status === 400) {
      alert("Bad Request: Ошибка десериализации запроса или неверный ввод.");
    } else if (error.status === 401) {
      alert("401 Unauthorized: Неверные учетные данные.");
    } else if (error.status === 500) {
      alert("500 Internal Server Error: Внутренняя ошибка сервера.");
    }

    console.error(`Ошибка при логине: ${error}`);
    throw error;
  }
};
export const logout = async (): Promise<void> => {
  try {
    if (tokenService.getToken()) {
      await api.post<void>("/user/logout");
    }

    sessionStore.deleteUserData();
    tokenService.removeToken();
    localStorage.removeItem("refreshToken");
  } catch (error) {
    console.error(`Ошибка при логауте: ${error}`);
    throw error;
  }
};
export const fetchProfile = async (): Promise<Profile> => {
  try {
    console.log(tokenService.getToken());
    const response = await api.get<Profile>("/user/profile");

    return response.data;
  } catch (error) {
    console.error(`Ошибка при загрузке профиля: ${error}`);
    throw error;
  }
};

export const refreshToken = async (): Promise<string | void> => {
  try {
    const response = await axios.post<Token>(
      "https://easydev.club/api/v1/auth/refresh",
      {
        refreshToken: localStorage.getItem("refreshToken"),
      },
    );
    tokenService.setToken(response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    await sessionStore.setUserData();

    return response.data.accessToken;
  } catch (error) {
    console.log(`Ошибка при обновлении токена: ${error}`);
    logout();
    throw error;
  }
};
