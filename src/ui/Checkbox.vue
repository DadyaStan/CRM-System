<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{
  modelValue: boolean;
}>();
</script>

<template>
  <div class="checkbox-box">
    <input type="checkbox" :checked="props.modelValue" />
  </div>
</template>
