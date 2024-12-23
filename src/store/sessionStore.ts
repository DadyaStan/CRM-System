import { fetchProfile } from "@/api/authApi";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSessionStore = defineStore("session", () => {
  const userData = ref();
  const isCurrentUserAdmin = ref();

  const setUserData = async () => {
    try {
      const response = await fetchProfile();

      if (response) {
        userData.value = response;
        isCurrentUserAdmin.value = response.isAdmin;
      }
    } catch {
      throw new Error();
    }
  };

  const getUserData = () => {
    return userData.value;
  };

  return { userData, isCurrentUserAdmin, setUserData, getUserData };
});
