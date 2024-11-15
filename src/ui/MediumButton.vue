<template>
  <button class="med-btn">
    <slot>Do</slot>
  </button>
</template>

<style lang="scss">
@import "../style.scss";

.med-btn {
  border: none;
  color: #fff;
  width: 120px;
  border-radius: 7px;
  background-color: $main-blue;
  cursor: pointer;
}
</style>
