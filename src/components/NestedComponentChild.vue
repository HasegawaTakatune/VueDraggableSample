<template>
  <VueDraggable
    class="drag-child-area"
    tag="ul"
    v-model="list"
    :group="{ name: props.group, pull: true, put: true }"
  >
    <li v-for="value in modelValue" :key="value.title">
      <p>{{ value.title }}</p>
      <p>{{ value.description }}</p>
    </li>
  </VueDraggable>
</template>
<script setup lang="ts">
import { VueDraggable } from "vue-draggable-plus";
import { computed } from "vue";

import type { TForm } from "@/types/TForm";

interface Props {
  group: string;
  modelValue: TForm[];
}

const props = defineProps<Props>();

interface Emits {
  (e: "update:modelValue", value: TForm[]): void;
}

const emits = defineEmits<Emits>();
const list = computed({
  get: () => props.modelValue,
  set: (value) => emits("update:modelValue", value),
});
</script>
<style scoped>
.drag-child-area {
  min-height: 50px;
  outline: 1px dashed;
}
</style>
