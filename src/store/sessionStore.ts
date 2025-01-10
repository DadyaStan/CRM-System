import { fetchProfile } from "@/api/authApi";
import { User } from "@/types/users";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSessionStore = defineStore("session", () => {
  const isAuthorized = ref<boolean>()
  const isCurrentUserAdmin = ref<boolean>();
  const userData = ref<User>();

  const setUserData = async () => {
    try {
      const response = await fetchProfile();

      if (response) {
        userData.value = response;
        isAuthorized.value = true; 
        isCurrentUserAdmin.value = response.isAdmin;
      }
    } catch {
      throw new Error();
    }
  };

  const getUserData = () => {
    return userData.value;
  };

  const deleteUserData = () => {
    isAuthorized.value = false;
    isCurrentUserAdmin.value = false;
    userData.value = undefined;
  }

  return { isAuthorized, isCurrentUserAdmin, userData, setUserData, getUserData, deleteUserData };
});
