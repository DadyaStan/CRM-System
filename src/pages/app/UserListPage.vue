<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { UserFilters, User } from "@/types/users";
import { message } from "ant-design-vue";
import { MoreOutlined, ArrowRightOutlined } from "@ant-design/icons-vue";

import {
  fetchUsers,
  changeUserRights,
  blockUser,
  unblockUser,
  deleteUser,
} from "@/api/usersApi";

import ActionModal from "@components/userslist/ActionModal.vue";

const columns = [
  {
    title: "Имя пользователя",
    dataIndex: "username",
    key: "username",
    sorter: true,
  },
  {
    title: "E-mail",
    dataIndex: "email",
    key: "email",
    sorter: true,
  },
  {
    title: "Дата создания",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Статус",
    dataIndex: "isBlocked",
    key: "isBlocked",
    filters: [
      { text: "Заблокированные", value: true },
      { text: "Активные", value: false },
    ],
    filterMultiple: false,
  },
  {
    title: "Роль",
    key: "isAdmin",
    dataIndex: "Admin",
  },
  {
    title: "Номер",
    key: "phoneNumber",
    dataIndex: "phoneNumber",
  },
  {
    title: "Действия",
    key: "action",
  },
];
const tableData = ref<User[]>();
const searchInput = ref<string>("");
const pagination = reactive<any>({
  currentPage: 1,
  pageSize: 20,

  totalUsers: 0,
});
const filterSettings = ref<UserFilters>({
  search: searchInput.value,
  sortBy: undefined,
  sortOrder: undefined,
  isBlocked: undefined,
  limit: undefined,
  offset: undefined,
});
const isModalOpen = ref<boolean>(false);
const modalAction = ref<string>();
const modalText = ref<string>('')
const currentUser = ref<User>({
  id: -1,
  username: '',
  email: '',
  date: '',
  isBlocked: false,
  isAdmin: false,
  phoneNumber: '',
});

onMounted(async () => {
  try {
    const response = await fetchUsers(filterSettings.value);
    tableData.value = response?.data;
    pagination.totalUsers = response?.meta.totalAmount;
  } catch {
    message.error("Ошибка при загрузке пользователя");
  }
});

const setUpdateUser = (updateUser: User) => {
  const index = tableData.value?.findIndex((user) => user.id === updateUser?.id);

  if (tableData.value && index !== undefined && index !== -1) {
    tableData.value[index] = updateUser;
  }
};

const handleChangeUserRights = async () => {
  try {
    isModalOpen.value = false;

    const userId = currentUser.value.id;
    const newData = currentUser.value.isAdmin;

    if (!userId) {
      message.error('Ошибка с определением пользователя');
      return;
    } else {
      const updateUser = await changeUserRights(userId, newData);
      setUpdateUser(updateUser);
      message.success(
        `Вы успешно изменили роль пользователя ${updateUser?.username} `,
      );
    }
  } catch {
    message.error(`Ошибка при изменении прав пользователя`);
  }
};

const handleBlockUser = async () => {
  try {
    isModalOpen.value = false;

    const userId = currentUser.value?.id;
    if (userId) {
      const updateUser = await blockUser(userId);
      setUpdateUser(updateUser);
      message.success(`Пользователь ${updateUser?.username} заблокирован`);
    }
  } catch {
    message.error(`Ошибка при блокировке пользователя`);
  }
};

const handleUnblockUser = async () => {
  try {
    isModalOpen.value = false;

    const userId = currentUser.value?.id;
    if (userId) {
      const updateUser = await unblockUser(userId);
      setUpdateUser(updateUser);
      message.success(`Пользователь ${updateUser?.username} разблокирован`);
    }
  } catch {
    message.error(`Ошибка при разблокировке пользователя`);
  }
};

const onTableChange = async (_pagination: any, filters: any, sorter: any) => {
  try {
    filterSettings.value = {
      search: searchInput.value,
      sortBy: sorter.order === undefined ? "id" : sorter.columnKey,
      sortOrder: sorter.order === "descend" ? "desc" : "asc",
      isBlocked:
        filters.isBlocked?.length === 1 ? filters.isBlocked[0] : undefined,
      limit: pagination.pageSize ? pagination.pageSize : 10,
      offset: pagination.currentPage,
    };
    
    let response = await fetchUsers(filterSettings.value);

    if (response?.data === null && response?.meta.totalAmount > 0) {
      pagination.currentPage = 1;
      filterSettings.value.offset = 1;
      response = await fetchUsers(filterSettings.value);
    }
    tableData.value = response?.data;
    pagination.totalUsers = response?.meta.totalAmount;
  } catch {
    message.error(`Ошибка при фильтрации пользователей`);
  }
};

const handleQuerySearch = async () => {
  try {
    filterSettings.value.search = searchInput.value;

    let response = await fetchUsers(filterSettings.value);
    if (response?.data === null && response?.meta.totalAmount > 0) {
      pagination.currentPage = 1;
      filterSettings.value.offset = 1;
      response = await fetchUsers(filterSettings.value);
    }
    tableData.value = response?.data;
    pagination.totalUsers = response?.meta.totalAmount;
  } catch {
    message.error(`Ошибка при отправке данных на сервер`);
  }
};

const handleQueryPage = async () => {
  try {
    filterSettings.value.limit = pagination.pageSize;
    filterSettings.value.offset = pagination.currentPage;

    const response = await fetchUsers(filterSettings.value);
    tableData.value = response?.data;
    pagination.total = response?.meta.totalAmount;
  } catch {
    message.error(`Ошибка при пагинации таблицы`);
  }
};

const handleDeleteUser = async () => {
  try {
    isModalOpen.value = false;

    const userId = currentUser.value?.id;

    if (userId) {
      await deleteUser(userId);

      const updateUser = currentUser.value;

      if (updateUser) {
        tableData.value = tableData.value?.filter(
          (item) => item.id !== currentUser.value?.id,
        );
        message.success(`Пользователь ${updateUser?.username} удалён`);
      }
    }
  } catch {
    message.error(`Ошибка при удалении пользователя`);
  }
};

const handleOpenConfirmModal = async (user: User, action: string, text: string) => {
  currentUser.value = user;
  modalAction.value = action;
  modalText.value = text;

  isModalOpen.value = true;
};
</script>

<template>
  <div class="users-list">
    <div>
      <a-input-search v-model:value="searchInput" placeholder="Найти пользователя..." enter-button
        @search="handleQuerySearch" />
    </div>
    <br />
    <div class="users-list__table">
      <ActionModal v-if="isModalOpen" :isOpen="isModalOpen" :action="modalAction" :text="modalText" :user="currentUser"
        @delete="handleDeleteUser" @block="handleBlockUser" @unblock="handleUnblockUser"
        @changeRights="handleChangeUserRights" @closeModal="isModalOpen = false" />

      <a-table :columns="columns" :data-source="tableData" @change="onTableChange" :pagination="false">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'username'">
            <span> Никнейм </span>
          </template>
          <template v-if="column.key === 'email'">
            <span> E-mail </span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'username'">
            <router-link :to="{ name: 'userDetails', params: { id: record.id } }">
              {{ record.username }}
            </router-link>
          </template>
          <template v-else-if="column.key === 'isBlocked'">
            <span>
              {{ record.isBlocked ? "Заблокирован" : "Не заблокирован" }}
            </span>
          </template>
          <template v-else-if="column.key === 'isAdmin'">
            <span>
              <a-tag :color="record.isAdmin ? 'volcano' : 'geekblue'">
                {{ record.isAdmin ? "ADMIN" : "USER" }}
              </a-tag>
            </span>
          </template>
          <template v-else-if="column.key === 'phoneNumber'">
            <span>
              {{
                record.phoneNumber ? record.phoneNumber : "Номер не привязан"
              }}
            </span>
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a-button v-if="record.isBlocked" @click="handleOpenConfirmModal(record, 'unblock', 'разблокировать')">
                {{ "Разблок." }}
              </a-button>
              <a-button v-else @click="handleOpenConfirmModal(record, 'block', 'заблокировать')">
                {{ "Блок." }}
              </a-button>
              <a-divider type="vertical" />

              <router-link :to="{ name: 'userDetails', params: { id: record.id } }">
                <a-button>
                  <ArrowRightOutlined />
                </a-button>
              </router-link>
              <a-divider type="vertical" />

              <a-popover trigger="click" placement="bottom">
                <template #content>
                  <a-button type="link" @click="handleOpenConfirmModal(record, 'changeRights', 'изменить роль пользователя')">
                    {{ record.isAdmin ? "Убрать админ." : "Сделать админ." }}
                  </a-button> 
                  <br>
                  <a-button type="link" danger
                    @click="handleOpenConfirmModal(record, 'delete', 'удалить')">
                    Удалить
                  </a-button>
                </template>
                <MoreOutlined :style="{ fontSize: '18px' }" />
              </a-popover>
            </span>
          </template>
        </template>
      </a-table>
      <div>
        <br />
        <a-pagination style="display: flex; justify-content: center" v-model:current="pagination.currentPage"
          v-model:page-size="pagination.pageSize" v-model:total="pagination.totalUsers" @change="handleQueryPage" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.users-list {
  min-height: 768px;
  display: flex;
  flex-direction: column;

  &__table {
    min-height: 710px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
