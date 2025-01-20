<template>
  <a-result
    status="404"
    title="404"
    sub-title="Страница, которую вы ищете, не существует"
  >
    <template #extra>
      <router-link to="/CRM-System/app/users" type="primary">
        <a-button type="primary">Вернутся к таблице</a-button>
      </router-link>
    </template>
  </a-result>
</template>
