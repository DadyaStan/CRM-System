<script lang="ts" setup>
import { ref } from "vue";
import { UserOutlined, UnorderedListOutlined } from "@ant-design/icons-vue";

const selectedKeys = ref<string[]>(["todo"]);
const collapsed = ref<boolean>(false);
</script>

<template>
  <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
    <div class="logo" />
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <router-link to="/CRM-System/app/todo">
        <a-menu-item key="todo">
          <unordered-list-outlined />
          <span>Todo</span>
        </a-menu-item>
      </router-link>

      <router-link to="/CRM-System/app/profile">
        <a-menu-item key="profile">
          <user-outlined />
          <span>Profile</span>
        </a-menu-item>
      </router-link>
    </a-menu>
  </a-layout-sider>
</template>

<style lang="scss">
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
