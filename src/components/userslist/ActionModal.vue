<template>
  <a-modal
    v-model:open="open"
    title="Подтвердите действие"
    ok-text="Да"
    cancel-text="Отмена"
    @ok="confirmModal"
    @cancel="hideModal"
  >
    <p>
      Вы уверены, что хотите {{ action }} пользователя
      {{ props.user.username }} ?
    </p>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, onMounted } from "vue";

const props = defineProps(["isOpen", "action", "user"]);
const emit = defineEmits();
const open = ref<boolean>(props.isOpen);
const action = ref<string>("");

onMounted(() => {
  if (props.action === "delete") action.value = "удалить";
  else if (props.action === "unblock") action.value = "разблокировать";
  else if (props.action === "block") action.value = "заблокировать";
  else if (props.action === "changeRights" && props.user.isAdmin)
    action.value = "понизить в роли";
  else if (props.action === "changeRights" && !props.user.isAdmin)
    action.value = "повысить в роли";
});

const hideModal = () => {
  emit("closeModal");
};

const confirmModal = () => {
  emit(props.action);
  open.value = false;
};
</script>
