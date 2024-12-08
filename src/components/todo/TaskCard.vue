<script setup lang="ts">
import Checkbox from "@/ui/Checkbox.vue";
import IconButton from "@/ui/IconButton.vue";

import { defineEmits, ref } from "vue";

import { Todo } from "@/types/todo";

const task = defineProps<Todo>();
const emit = defineEmits(["deleteTodo", "changeTodoStatus", "changeTodoTitle"]);

const isChecked = ref<boolean>(task.isDone);
const isEdit = ref<boolean>(false);
const changingTodoValue = ref<string>(task.title);

const handleChangeStatus = () => {
  emit("changeTodoStatus", task.id, { isDone: !task.isDone });
};

const handleDeleteTask = () => {
  emit("deleteTodo", task.id);
};

const handleChangeTitle = () => {
  emit("changeTodoTitle", task.id, { title: changingTodoValue.value });
  isEdit.value = false;
};

const handleResetChanging = () => {
  isEdit.value = false;
  changingTodoValue.value = task.title;
};

const isTaskDone = (isDone: boolean) => {
  return isDone ? "task-card complete-task" : "task-card";
};
</script>

<template>
  <div :class="isTaskDone(task.isDone)">
    <div class="task-card__status-box">
      <Checkbox v-model="isChecked" @change="handleChangeStatus" />
      <input
        v-if="isEdit"
        v-model="changingTodoValue"
        class="task-card__input task-card__content"
        type="text"
      />
      <p v-else class="task-card__content">
        {{ task.title }}
      </p>
    </div>
    <div class="task-card__btn-box">
      <IconButton
        v-if="isEdit"
        @click="handleChangeTitle"
        style="background-color: #3ae43a"
      >
        <img src="@assets/IconAccept.svg" alt="Accept" />
      </IconButton>
      <IconButton
        v-else-if="!isEdit"
        @click="isEdit = true"
        style="background-color: #5391fc"
      >
        <img src="@assets/IconRewrite.svg" alt="Rewrite" />
      </IconButton>

      <IconButton
        v-if="!isEdit"
        @click="handleDeleteTask"
        style="background-color: #fc685e"
      >
        <img src="@assets/IconDelete.svg" alt="Delete" />
      </IconButton>
      <IconButton
        v-else-if="isEdit"
        @click="handleResetChanging"
        style="background-color: #5391fc"
      >
        <img src="@assets/IconBack.svg" alt="Back" />
      </IconButton>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/style.scss";

.task-card {
  width: 370px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  padding: 8px 8px 8px 12px;
  word-wrap: break-word;

  &__content {
    max-width: 230px;
    text-align: left;
    white-space: normal;
  }

  &__input {
    width: 70%;
    outline: none;
    border: none;
    border-bottom: 1px solid #555;
  }

  &__status-box {
    width: 100%;
    display: flex;
    gap: 10px;
  }

  &__btn-box {
    width: 25%;
    display: flex;
    gap: 10px;
  }
}

.complete-task {
  & .task-card {
    &__content {
      color: grey;
      text-decoration: line-through;
    }
  }
}
</style>
