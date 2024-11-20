<script setup lang="ts">
import { onMounted, ref } from "vue";

import {
  fetchFilteredTodo,
  createNewTodo,
  deleteTask,
  changeTodo,
} from "@api/todoApi";

import CreateTaskForm from "@/components/todo/CreateTaskForm.vue";
import Nav from "@/components/todo/Nav.vue";
import TaskCard from "@/components/todo/TaskCard.vue";

import {
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
  todoFilter,
} from "@/types/todo";

const isLoading = ref<boolean>(false);
const todoList = ref<Todo[] | undefined>([]);
const todoInfo = ref<TodoInfo | null | undefined>(null);
const currentFilter = ref<todoFilter>(todoFilter.all);

onMounted(async () => {
  await loadTodoList(todoFilter.all);
});

const loadTodoList = async (newFilter: todoFilter) => {
  try {
    isLoading.value = true;
    const response: MetaResponse<Todo, TodoInfo> | undefined =
      await fetchFilteredTodo(newFilter);

    if (response === undefined) {
      alert("Произошла ошибка на стороне сервера");
    } else {
      todoList.value = response?.data;
      todoInfo.value = response?.info;
    }
  } catch {
    throw new Error("Ошибка запроса с сервера " + Error);
  } finally {
    isLoading.value = false;
  }
};

const handleChangeFilter = async (clickedTodoFilter: todoFilter) => {
  isLoading.value = true;
  todoList.value = [];
  todoInfo.value = null;
  currentFilter.value = clickedTodoFilter;
  await loadTodoList(clickedTodoFilter);
  isLoading.value = false;
};

const handleDeleteTodo = async (taskId: number) => {
  await deleteTask(taskId);
  await loadTodoList(currentFilter.value);
};

const handleChangeTodo = async (taskId: number, changedTodo: TodoRequest) => {
  await changeTodo(taskId, changedTodo);
  await loadTodoList(currentFilter.value);
};

const handleCreateNewTodo = async (newTodoTitle: string) => {
  await createNewTodo(newTodoTitle);
  await loadTodoList(currentFilter.value);
};
</script>

<template>
  <div class="wrapper">
    <div class="tasks-list">
      <CreateTaskForm @createNewTodo="handleCreateNewTodo" />
      <Nav
        :todoFilters="{
          all: todoInfo?.all || 0,
          completed: todoInfo?.completed || 0,
          inWork: todoInfo?.inWork || 0,
        }"
        @filterChanged="handleChangeFilter"
      />
      <div class="content">
        <div class="tasks-list">
          <TaskCard
            v-for="task of todoList"
            :key="task.id"
            :id="task.id"
            :title="task.title"
            :created="task.created"
            :isDone="task.isDone"
            @deleteTodo="handleDeleteTodo"
            @changeTodoStatus="handleChangeTodo"
            @changeTodoTitle="handleChangeTodo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
}

.tasks-list {
  background-color: #f1f1f1;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 0;
  border-radius: 15px;

  &__loading {
    margin-top: 50px;
  }
}
</style>
