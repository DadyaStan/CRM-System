<script lang="ts" setup>
import { ref } from "vue";
import {
  UserOutlined,
  UnorderedListOutlined,
  SnippetsOutlined,
} from "@ant-design/icons-vue";
import { useSessionStore } from "@/store/sessionStore";
import { useRoute } from "vue-router";

const route = useRoute();

const currentPath = route.path;
const sessionStore = useSessionStore();
const selectedKeys = ref<string[]>([currentPath]);
const collapsed = ref<boolean>(false);
// const menuItems = [
//   {
//     page: 'todo',
//     route: '/CRM-System/app/todo',
//   }
// ]
</script>

<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible>
    <div class="logo"></div>
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <router-link to="/CRM-System/app/todo">
        <a-menu-item key="/CRM-System/app/todo">
          <SnippetsOutlined />
          <span>Задачи</span>
        </a-menu-item>
      </router-link>
      <router-link to="/CRM-System/app/profile">
        <a-menu-item key="/CRM-System/app/profile">
          <user-outlined />
          <span>Профиль</span>
        </a-menu-item>
      </router-link>
      <router-link
        to="/CRM-System/app/users"
        v-if="sessionStore.isCurrentUserAdmin"
      >
        <a-menu-item key="/CRM-System/app/users">
          <unordered-list-outlined />
          <span>Пользователи</span>
        </a-menu-item>
      </router-link>
    </a-menu>
  </a-layout-sider>
</template>

<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
