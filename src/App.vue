<script setup lang="ts">
import { onMounted, reactive } from "vue";
import NestedComponent from "./components/NestedComponent.vue";

import type { TForm } from "./types/TForm";
import type { TParent } from "./types/TParent";

type Data = {
  todo: TParent[];
  doing: TParent[];
  done: TParent[];
  onHold: TParent[];
  aborted: TParent[];
};

const form = reactive<TForm>({
  title: "",
  description: "",
});

const data = reactive<Data>({
  todo: [],
  doing: [],
  done: [],
  onHold: [],
  aborted: [],
});

const onClickAdd = () => {
  if (!form.title || !form.description) {
    return;
  }

  data.todo.push({
    title: form.title,
    description: form.description,
    children: [],
  });

  form.title = "";
  form.description = "";
};

onMounted(() => {
  for (let i = 1; i <= 10; i++) {
    data.todo.push({
      title: `title${i}`,
      description: `description${i}`,
      children: [],
    });

    for (let j = 1; j < Math.floor(Math.random() * 4) + 1; j++) {
      data.todo[i - 1].children.push({
        title: `title${i}-${j}`,
        description: `description${i}-${j}`,
      });
    }
  }
});
</script>

<template>
  <header>
    <h1>Vue Draggable Sample</h1>
  </header>

  <main>
    <form @submit.prevent="onClickAdd">
      <label for="title" style="margin-right: 4rem">
        <span style="padding-right: 1rem">title</span>
        <input id="title" type="text" v-model="form.title" />
      </label>
      <label for="description">
        <span style="padding-right: 1rem">description</span>
        <input id="description" type="text" v-model="form.description" />
      </label>
      <button @click="onClickAdd">Add</button>
    </form>

    <div class="wrapper">
      <div>
        <h3>Todo</h3>
        <NestedComponent
          v-model="data.todo"
          group="todo"
          :pull="true"
          :put="false"
        />
      </div>

      <div>
        <h3>Doing</h3>
        <NestedComponent
          v-model="data.doing"
          group="doing"
          :pull="true"
          :put="['todo', 'onHold', 'aborted']"
        />
      </div>

      <div>
        <h3>Done</h3>
        <NestedComponent
          v-model="data.done"
          group="done"
          :pull="false"
          :put="true"
        />
      </div>

      <div>
        <h3>On hold</h3>
        <NestedComponent
          v-model="data.onHold"
          group="onHold"
          :pull="['doing', 'aborted']"
          :put="true"
        />
      </div>

      <div>
        <h3>Aborted</h3>
        <NestedComponent
          v-model="data.aborted"
          group="aborted"
          :pull="false"
          :put="true"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}
</style>
