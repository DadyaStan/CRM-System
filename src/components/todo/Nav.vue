<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { TodoInfo, todoFilter } from "@/types/todo";

const emit = defineEmits(["filterChanged"]);
const props = defineProps<{
  todoFilters: TodoInfo;
}>();

const currentTodoFilter = ref<todoFilter>(todoFilter.all);

const handlerChangeTodoFilter = (clickedTodoFilter: todoFilter) => {
  if (clickedTodoFilter !== currentTodoFilter.value) {
    currentTodoFilter.value = clickedTodoFilter;
    emit("filterChanged", clickedTodoFilter);
  }
};
</script>

<template>
  <nav class="nav">
    <div
      :class="{
        nav__el: true,
        nav__el_active: currentTodoFilter === todoFilter.all,
      }"
      @click="handlerChangeTodoFilter(todoFilter.all)"
    >
      Все ({{ props.todoFilters.all ? props.todoFilters.all : "-" }})
    </div>
    <div
      :class="{
        nav__el: true,
        nav__el_active: currentTodoFilter === todoFilter.inWork,
      }"
      @click="handlerChangeTodoFilter(todoFilter.inWork)"
    >
      В работе ({{ props.todoFilters.inWork ? props.todoFilters.inWork : "-" }})
    </div>
    <div
      :class="{
        nav__el: true,
        nav__el_active: currentTodoFilter === todoFilter.completed,
      }"
      @click="handlerChangeTodoFilter(todoFilter.completed)"
    >
      Сделано ({{
        props.todoFilters.completed ? props.todoFilters.completed : "-"
      }})
    </div>
  </nav>
</template>

<style lang="scss">
@import "@/style.scss";

.nav {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;

  &__el {
    font-size: 20px;
    color: grey;
    font-weight: 700;
    cursor: pointer;

    &_active {
      color: $main-aqua;
      text-decoration: underline;
    }
  }
}
</style>
