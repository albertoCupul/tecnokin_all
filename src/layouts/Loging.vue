<template>
  <q-layout view="hhh lpR fff">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title> </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-white text-black">
      <q-toolbar>
        <q-toolbar-title>
          <div
            class="text-subtitle2 text-weight-light"
            style="width: 50%; float: left"
          >
            Desarrollado por ArcaWeb.
          </div>
          <div
            class="text-subtitle2 text-weight-light"
            style="width: 50%; float: right; text-align: right"
          >
            Copyright © 2021.
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { useQuasar } from "quasar";

import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",

  components: {},

  setup() {
    return {
      useQuasar
    };
  },
});
</script>
