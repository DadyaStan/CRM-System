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
      Вы уверены, что хотите 
      {{ props.text, ' ', props.user.username, '?' }}
    </p>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps(["isOpen", "action", "user", "text"]);
const emit = defineEmits();
const open = ref<boolean>(props.isOpen);

const hideModal = () => {
  emit("closeModal");
};

const confirmModal = () => {
  emit(props.action);
  open.value = false;
};
</script>
