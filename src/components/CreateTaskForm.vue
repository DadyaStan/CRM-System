<script setup lang="ts">
import { ref } from "vue";
import MediumButton from "@/ui/MediumButton.vue";

const todoTitle = ref<string>("");

const emit = defineEmits(["createNewTodo"]);

const handleAddTask = async () => {
  if (todoTitle.value) {
    await emit("createNewTodo", todoTitle.value);
    todoTitle.value = "";
  }
};
</script>

<template>
  <div class="create-task-form">
    <input
      v-model="todoTitle"
      class="create-task-form__input"
      type="text"
      placeholder="Task To Be Done..."
    />
    <MediumButton @click="handleAddTask"> Add </MediumButton>
  </div>
</template>

<style lang="scss">
.create-task-form {
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 20px;

  &__input {
    border: none;
    outline: none;
    width: 100%;
    background-color: #f1f4f9;
    border-bottom: 1px solid grey;
    padding: 10px 10px;
  }
}
</style>
