<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { DescriptionsProps } from "ant-design-vue";
import { User, UserRequest } from "@/types/users";
import { fetchUserData, changeUserData } from "@/api/usersApi";
import { message } from "ant-design-vue";

const route = useRoute();

const id: number = Number(route.params.id);

const userData = ref<User>();
const editUserData = ref<UserRequest>({
  username: "",
  email: "",
  phoneNumber: "",
});

const size = ref<DescriptionsProps["size"]>("default");
const isEditMode = ref<boolean>(false);

onMounted(async () => {
  try {
    const response: User | undefined = await fetchUserData(id);

    if (response) {
      userData.value = response;
    }
  } catch {
    message.error('Ошибка при загрузке профиля пользователя')
  }
});

const handleOpenEditMode = () => {
  isEditMode.value = true;

  editUserData.value = {...userData.value}
};

const handleSaveNewData = async () => {
  try {
    if (
      editUserData.value.username === userData.value?.username &&
      editUserData.value.email === userData.value?.email &&
      editUserData.value.phoneNumber === userData.value?.phoneNumber
    ) {
      isEditMode.value = false;
    } else {
      if (editUserData.value.username === userData.value?.username) delete editUserData.value.username;
      if (editUserData.value.email === userData.value?.email) delete editUserData.value.email;
      if (editUserData.value.phoneNumber === userData.value?.phoneNumber) delete editUserData.value.phoneNumber;
      console.log(editUserData.value);
      const response = await changeUserData(
        Number(userData.value?.id),
        editUserData.value,
      );
      console.log(response);
      userData.value = response;
      isEditMode.value = false;
      message.success(`Данные успешно изменены`);
    }

  } catch {
    isEditMode.value = false;
    message.error(`Ошибка при изменении данных пользователя`);
  }
};
</script>

<template>
  <div class="wrapper">
    <a-descriptions layout="vertical" bordered :title="`Данные пользователя ${id}`" :size="size">
      <template #extra>
        <a-button v-if="!isEditMode" @click="handleOpenEditMode" type="primary">Edit</a-button>

        <div v-else style="display: flex; gap: 10px">
          <a-button @click="handleSaveNewData" type="primary">Save</a-button>
          <a-button @click="isEditMode = false" type="primary" danger>Cancel</a-button>
        </div>
      </template>

      <a-descriptions-item label="Имя пользователя">
        <a-input v-if="isEditMode" v-model:value="editUserData.username" type="text" />
        <span v-else>
          {{ userData?.username }}
        </span>
      </a-descriptions-item>

      <a-descriptions-item label="E-mail">
        <a-input v-if="isEditMode" v-model:value="editUserData.email" type="text" />
        <span v-else>
          {{ userData?.email }}
        </span>
      </a-descriptions-item>

      <a-descriptions-item label="Контактный номер">
        <a-input v-if="isEditMode" v-model:value="editUserData.phoneNumber" type="text" />
        <span v-else>
          {{
            userData?.phoneNumber ? userData?.phoneNumber : "Номер не привязан"
          }}
        </span>
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<style lang="scss"></style>
