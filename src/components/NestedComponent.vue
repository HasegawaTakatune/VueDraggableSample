<template>
  <VueDraggable
    class="drag-area"
    tag="ul"
    v-model="list"
    :group="{ name: props.group, pull: props.pull, put: props.put }"
  >
    <li
      class="drag-content"
      v-for="(value, index) in modelValue"
      :key="value.title"
    >
      <button style="float: right" @click="onClickDelete(index)">del</button>
      <p>{{ value.title }}</p>
      <p>{{ value.description }}</p>

      <nested-component-child v-model="value.children" :group="props.group" />
    </li>
  </VueDraggable>
</template>
<script setup lang="ts">
import { VueDraggable } from "vue-draggable-plus";
import { computed } from "vue";

import NestedComponentChild from "./NestedComponentChild.vue";
import type { TParent } from "@/types/TParent";

interface Props {
  group: string;
  pull: boolean | string[];
  put: boolean | string[];
  modelValue: TParent[];
}

const props = defineProps<Props>();

interface Emits {
  (e: "update:modelValue", value: TParent[]): void;
}

const emits = defineEmits<Emits>();
const list = computed({
  get: () => props.modelValue,
  set: (value) => emits("update:modelValue", value),
});

const onClickDelete = (index: number) => {
  props.modelValue.splice(index, 1);
};
</script>
<style scoped>
.drag-area {
  height: 80vh;
  padding-right: 1rem;

  overflow-y: scroll;
  scrollbar-color: #478384 #17184b;
  scrollbar-width: thin;

  min-height: 50px;
  border: thick double;
}

.drag-content {
  border: solid 1px #478384;
  margin-top: 1rem;
  padding: 0.5rem;

  cursor: move;
}
</style>
