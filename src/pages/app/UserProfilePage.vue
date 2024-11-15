<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { useAuthStore } from "@/store/authStore";

import { Profile } from "@/types/auth";

const authStore = useAuthStore();

const userData = ref<Profile>({
  id: -1,
  username: "",
  email: "",
  date: "",
  isBlocked: false,
  isAdmin: false,
  phoneNumber: "",
});

const setUserData = async () => {
  const profile = await authStore.fetchProfile();
  userData.value = profile;
};

const handleLogout = async () => {
  await authStore.handleLogout();
};

onBeforeMount(async () => {
  await setUserData();
});
</script>

<template>
  <div class="wrapper">
    <a-descriptions title="Профиль">
      <a-descriptions-item label="Имя:">{{
        userData.username
      }}</a-descriptions-item>
      <a-descriptions-item label="Мобильный номер">{{
        userData.phoneNumber ? userData.phoneNumber : "Номер не привязан"
      }}</a-descriptions-item>
      <a-descriptions-item label="E-mail:">{{
        userData.email
      }}</a-descriptions-item>
      <a-descriptions-item label="Роль">{{
        userData.isAdmin ? "Администратор" : "Пользователь"
      }}</a-descriptions-item>
      <a-descriptions-item label="Дата регистрации:">
        {{ userData.date }}
      </a-descriptions-item>
    </a-descriptions>
    <button @click="handleLogout" style="padding: 10px; cursor: pointer">
      Logout
    </button>
  </div>
</template>

<style lang="scss"></style>
