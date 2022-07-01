<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-avatar icon="book" color="primary" text-color="white" size="60px" />
        <q-toolbar-title> TESTE MICKS - GERENCIADOR DE LIVROS </q-toolbar-title>
        <div>Made with ❤ by Aldeir</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {
    return {};
  },
});
</script>
