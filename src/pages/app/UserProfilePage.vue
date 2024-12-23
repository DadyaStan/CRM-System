<script lang="ts" setup>
import { onMounted, ref, defineEmits } from "vue";
import { logout, fetchProfile } from "@api/authApi";
import { Profile } from "@/types/auth";
import router from "@/router";

const emit = defineEmits();

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
  emit("openedPage", "profile");
  await setUserData();
});
</script>

<template>
  <div class="wrapper">
    <a-descriptions bordered title="Профиль" :size="size">
      <template #extra>
        <a-button @click="handleLogout" type="primary">Logout</a-button>
      </template>
      <a-descriptions-item label="Имя">{{
        userData.username ? userData.username : "-"
      }}</a-descriptions-item>
      <a-descriptions-item label="Мобильный номер">{{
        userData.phoneNumber ? userData.phoneNumber : "Номер не привязан"
      }}</a-descriptions-item>
      <a-descriptions-item label="E-mail">{{
        userData.email ? userData.email : "Почта не привязана"
      }}</a-descriptions-item>
      <a-descriptions-item label="Роль">{{
        userData.isAdmin ? "Администратор" : "Пользователь"
      }}</a-descriptions-item>
      <a-descriptions-item label="Дата регистрации:">
        {{ userData.date ? userData.date : "-" }}
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<style lang="scss"></style>
