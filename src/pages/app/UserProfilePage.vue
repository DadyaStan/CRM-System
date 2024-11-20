<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { logout, fetchProfile } from "@api/authApi";
import { Profile } from "@/types/auth";
import router from "@/router";

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
  const profile = await fetchProfile();
  userData.value = profile;
};

const handleLogout = async () => {
  try {
    await logout();
    router.push("/CRM-System/auth/login");
    console.log("Handle Logout");
  } catch {
    console.error("Ошибка при выходе из аккаунта");
  }
};

onMounted(async () => {
  await setUserData();
});
</script>

<template>
  <div class="wrapper">
    <a-descriptions layout="horizontal" title="Профиль">
      <a-descriptions-item label="Имя">{{
        userData.username
      }}</a-descriptions-item>
      <a-descriptions-item label="Мобильный номер">{{
        userData.phoneNumber ? userData.phoneNumber : "Номер не привязан"
      }}</a-descriptions-item>
      <a-descriptions-item label="E-mail">{{
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
