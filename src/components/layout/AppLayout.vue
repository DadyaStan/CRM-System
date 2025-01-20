<script lang="ts" setup>
import { onBeforeMount, ref, computed } from "vue";
import { useRoute } from "vue-router";

import { refreshToken } from "@/api/authApi";
import { useSessionStore } from "@/store/sessionStore";

import AppMenu from "@components/layout/AppMenu.vue";
import { message } from "ant-design-vue";

const sessionStore = useSessionStore();
const isLoading = ref<boolean>(true);
const route = useRoute();

onBeforeMount(async () => {
  try {
    if (!sessionStore.isAuthorized) {
      await refreshToken();
    }

    isLoading.value = false;
  } catch {
    message.error("Ошибка при аутентификации");
  }
});

const breadcrumbItems = computed(() => {
  const pathArray = route.path.split("/").filter((i) => i);

  const startIndex = 2;
  const filteredPathArray = pathArray.slice(startIndex);

  return filteredPathArray.map((path, index) => {
    const fullPath = `/${pathArray.slice(0, startIndex + index + 1).join("/")}`;

    return {
      name: path.charAt(0).toUpperCase() + path.slice(1),
      path: fullPath,
    };
  });
});
</script>

<template>
  <div class="wrapper">
    <a-layout style="min-height: 100vh">
      <AppMenu />
      <a-layout>
        <a-layout-header style="background: #fff; padding-left: 15px">
          <h1 style="font-size: 24px">HEADER</h1>
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item
              v-for="(item, index) in breadcrumbItems"
              :key="index"
              :to="item.path"
            >
              <router-link :to="item.path">{{ item.name }}</router-link>
            </a-breadcrumb-item>
          </a-breadcrumb>
          <div
            :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
          >
            <router-view v-if="!isLoading"></router-view>
            <div v-else class="wrapper">
              <a-spin class="wrapper__spin" size="large" />
            </div>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  min-height: 768px;

  &__spin {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

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
