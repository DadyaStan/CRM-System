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

const defaultUser: User = {
  id: -1,
  username: "username",
  email: "example@mail.ru",
  date: "01-01-2000",
  isBlocked: false,
  isAdmin: false,
  phoneNumber: "+7987654321",
};

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
const tableData = ref<User[]>([]);
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
const isModalOpen = ref<string | false>(false);
const currentUser = ref<User>(defaultUser);

onMounted(async () => {
  await fetchAndSetUsers();
});

const fetchAndSetUsers = async () => {
  try {
    const response = await fetchUsers(filterSettings.value);

    if (response.data) {
      tableData.value = response.data;
      pagination.totalUsers = response.meta.totalAmount;
    } else {
      tableData.value = [];
    }
  } catch {
    message.error("Ошибка при загрузке пользователя");
  }
};

const handleChangeUserRights = async (userId: number, isAdmin: boolean) => {
  try {
    isModalOpen.value = false;
    const newData = !isAdmin;

    await changeUserRights(userId, newData);
    await fetchAndSetUsers();
    message.success("Роль пользователя успешно изменена");
  } catch {
    message.error(`Ошибка при изменении прав пользователя`);
  }
};

const handleBlockUser = async (userId: number) => {
  try {
    isModalOpen.value = false;

    if (userId) {
      await blockUser(userId);
      await fetchAndSetUsers();
      message.success(`Пользователь успешно заблокирован`);
    }
  } catch {
    message.error(`Ошибка при блокировке пользователя`);
  }
};

const handleUnblockUser = async (userId: number) => {
  try {
    isModalOpen.value = false;

    if (userId) {
      await unblockUser(userId);
      await fetchAndSetUsers();
      message.success(`Пользователь успешно разблокирован`);
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

const handleDeleteUser = async (userId: number) => {
  try {
    isModalOpen.value = false;

    if (userId) {
      await deleteUser(userId);
      await fetchAndSetUsers();

      message.success(`Пользователь успешно удалён`);
    }
  } catch {
    message.error(`Ошибка при удалении пользователя`);
  }
};
</script>

<template>
  <div class="users-list">
    <div>
      <a-input-search
        v-model:value="searchInput"
        placeholder="Найти пользователя..."
        enter-button
        @search="handleQuerySearch"
      />
    </div>
    <br />
    <div class="users-list__table">
      <!-- <ActionModal 
        v-if="isModalOpen" 
        :isOpen="isModalOpen" 
        :action="modalAction" 
        :text="modalText"

        @delete="handleDeleteUser" 
        @block="handleBlockUser" 
        @unblock="handleUnblockUser"
        @changeRights="handleChangeUserRights" 
        
        @closeModal="isModalOpen = false" 
        @confirmModal="handleOpenConfirmModal" 
      /> -->
      <ActionModal
        v-if="isModalOpen === 'unblock'"
        :isOpen="true"
        @closeModal="isModalOpen = false"
        @confirmModal="handleUnblockUser(currentUser.id)"
      >
        Вы уверены, что хотите разблокировать пользователя
        {{ currentUser.username }}?
      </ActionModal>
      <ActionModal
        v-if="isModalOpen === 'block'"
        :isOpen="true"
        @closeModal="isModalOpen = false"
        @confirmModal="handleBlockUser(currentUser.id)"
      >
        Вы уверены, что хотите заблокировать пользователя
        {{ currentUser.username }}?
      </ActionModal>
      <ActionModal
        v-if="isModalOpen === 'changeRights'"
        :isOpen="true"
        @closeModal="isModalOpen = false"
        @confirmModal="
          handleChangeUserRights(currentUser.id, currentUser.isAdmin)
        "
      >
        Вы уверены, что хотите изменить права пользователя
        {{ currentUser.username }}?
      </ActionModal>
      <ActionModal
        v-if="isModalOpen === 'delete'"
        :isOpen="true"
        @closeModal="isModalOpen = false"
        @confirmModal="handleDeleteUser(currentUser.id)"
      >
        Вы уверены, что хотите удалить пользователя {{ currentUser.username }}?
      </ActionModal>

      <a-table
        :columns="columns"
        :data-source="tableData"
        @change="onTableChange"
        :pagination="false"
      >
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
            <router-link
              :to="{ name: 'userDetails', params: { id: record.id } }"
            >
              {{ record.username }}
            </router-link>
          </template>
          <template v-else-if="column.key === 'date'">
            <span>
              {{ record.date.slice(0, -17) }}
            </span>
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
            <div style="display: flex; align-items: center">
              <div v-if="record.isBlocked">
                <a-button
                  @click="
                    isModalOpen = 'unblock';
                    currentUser = record;
                  "
                >
                  {{ "Разблок." }}
                </a-button>
              </div>
              <div v-else>
                <a-button
                  @click="
                    isModalOpen = 'block';
                    currentUser = record;
                  "
                >
                  {{ "Блок." }}
                </a-button>
              </div>
              <a-divider type="vertical" />

              <router-link
                :to="{ name: 'userDetails', params: { id: record.id } }"
              >
                <a-button>
                  <ArrowRightOutlined />
                </a-button>
              </router-link>
              <a-divider type="vertical" />

              <a-popover trigger="click" placement="bottom">
                <template #content>
                  <div>
                    <a-button
                      type="link"
                      @click="
                        isModalOpen = 'changeRights';
                        currentUser = record;
                      "
                    >
                      {{ record.isAdmin ? "Убрать админ." : "Сделать админ." }}
                    </a-button>
                  </div>
                  <br />
                  <div>
                    <a-button
                      danger
                      type="link"
                      @click="
                        isModalOpen = 'delete';
                        currentUser = record;
                      "
                    >
                      Удалить
                    </a-button>
                  </div>
                </template>
                <MoreOutlined :style="{ fontSize: '18px' }" />
              </a-popover>
            </div>
          </template>
        </template>
      </a-table>
      <div>
        <br />
        <a-pagination
          style="display: flex; justify-content: center"
          v-model:current="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          v-model:total="pagination.totalUsers"
          @change="handleQueryPage"
        />
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
