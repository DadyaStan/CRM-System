import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const userError = ref<string>("");
  const isDataReady = ref<boolean>(false);

  return { userError, isDataReady };
});
