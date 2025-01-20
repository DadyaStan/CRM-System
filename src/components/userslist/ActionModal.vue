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
      <slot>
        Вы уверены, что хотите сделать это?
        <br />
        Отменить это действе будет невозможно.
      </slot>
    </p>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps(["isOpen"]);
const emit = defineEmits();
const open = ref<boolean>(props.isOpen);

const hideModal = () => {
  emit("closeModal");
};

const confirmModal = () => {
  emit("confirmModal");
  open.value = false;
};
</script>
