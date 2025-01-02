import { api } from "./api";
import {
  UserFilters,
  User,
  MetaResponse,
  UserRequest,
} from "@/types/users";

export const fetchUsers = async (
  filterData?: UserFilters,
): Promise<MetaResponse<User> | undefined> => {
  try {
    const response = await api.get<MetaResponse<User>>(
      "/admin/users",
      filterData
        ? {
            params: {
              search: filterData.search,
              sortBy: filterData.sortBy,
              sortOrder: filterData.sortOrder,
              isBlocked: filterData.isBlocked,
              limit: filterData.limit,
              offset: filterData.offset ? filterData.offset - 1 : undefined,
            },
          }
        : {},
    );

    if (response) {
      console.log("INPUT: ", filterData);
      console.log("OUTPUT: ", response.data);
      return response.data;
    }
  } catch (error) {
    console.error(`Ошибка при запросе пользователей: ${error}`);
    throw new Error();
  }
};

export const fetchUserData = async (
  userId: number | any,
): Promise<User | undefined> => {
  try {
    const response = await api.get<User>(`/admin/users/${userId}`);

    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error(`Ошибка при запросе данных пользователя: ${error}`);
    throw new Error();
  }
};

export const changeUserData = async (
  userId: number,
  newData: UserRequest,
): Promise<User | undefined> => {
  try {
    const response = await api.put(`/admin/users/${userId}`, {...newData});

    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error(`Ошибка при изменении профиля пользователя: ${error}`);
    throw new Error();
  }
};

export const changeUserRights = async (
  userId: number,
  newData?: boolean,
): Promise<User | undefined> => {
  try {
    const response = await api.post(`/admin/users/${userId}/rights`, {
      field: "isAdmin",
      value: !newData,
    });

    if (response) {
      console.log(response);
      return response.data;
    }
  } catch (error) {
    console.error(`Ошибка при изменении прав пользователя: ${error}`);
    throw new Error();
  }
};

export const blockUser = async (userId: number): Promise<User | undefined> => {
  try {
    const response = await api.post(`/admin/users/${userId}/block`);

    if (response) {
      console.log(response);
      return response.data;
    }
  } catch (error) {
    console.error(`Ошибка при блокировке пользователя: ${error}`);
    throw new Error();
  }
};

export const unblockUser = async (
  userId: number,
): Promise<User | undefined> => {
  try {
    const response = await api.post(`/admin/users/${userId}/unblock`);

    if (response) {
      console.log(response);
      return response.data;
    }
  } catch (error) {
    console.error(`Ошибка при разблокировки пользователя: ${error}`);
    throw new Error();
  }
};

export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await api.delete(`/admin/users/${userId}`);
  } catch (error) {
    console.error(`Ошибка при удалении пользователя: ${error}`);
    throw new Error();
  }
};
