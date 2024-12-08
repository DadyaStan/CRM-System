<template>
  <button class="icon-btn">
    <slot> UI </slot>
  </button>
</template>

<style lang="scss">
// Вопрос касаемо импорта индекс стилей таким образом
@import "../style.scss";

.icon-btn {
  color: #fff;
  border-radius: 8px;
  padding: 9px 12px 7px;
  cursor: pointer;
}
</style>
