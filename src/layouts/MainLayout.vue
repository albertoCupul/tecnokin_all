<template>
  <q-layout view="lHh lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="titleBar">
          COPECE Suc. Concordia
        </q-toolbar-title>

        <q-btn
          round
          color="white"
          text-color="primary"
          icon="person"
          size="sm"
        />

        <q-menu anchor="bottom right" self="top right">
          <div class="column items-center q-my-md" style="width: 270px">
            <q-avatar
              color="secondary"
              text-color="white"
              icon="person"
              class="q-my-sm"
            ></q-avatar>
            <span color="primary" class="q-my-sm userAcount"
              >Salomón Sanchez</span
            >
            <span color="primary" class="q-my-sm userAcount">Cajero</span>
            <q-separator class="q-my-sm" style="width: 90%"></q-separator>
            <q-btn
              class="q-my-sm"
              unelevated
              rounded
              color="secondary"
              label="Corte de caja"
              style="width: 55%"
            />
            <q-btn
              class="q-my-sm"
              unelevated
              rounded
              color="black"
              label="Salir"
              style="width: 55%"
            />
          </div>
        </q-menu>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="panelMain">
      <div class="column items-center" style="width: 100%">
        <q-img
          fit="contain"
          :src="url"
          style="max-width: 120px"
          class="q-my-lg"
        >
        </q-img>
        <q-separator style="width: 80%"></q-separator>
      </div>

      <q-list>
        <!-- <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label> -->

        <ListMenu
          v-for="link in menuList"
          :key="link.title"
          v-bind="link"
          class="q-mt-sm"
        />
      </q-list>

      <div class="column items-center" style="width: 100%; margin-top: 90%">
        <q-separator style="width: 80%"></q-separator>
      </div>
      <q-list>
        <!-- <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label> -->

        <ListMenu
          v-for="link in menuHelp"
          :key="link.title"
          v-bind="link"
          class="q-mt-sm"
        />
      </q-list>

      <div class="column items-center q-mt-md" style="width: 100%">
        <span class="piePagina text-center">Vende+ Copyright 2021</span>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, ref } from "vue";
import ListMenu from "../components/listaMenu.vue";

import { menuList, menuHelp } from "../javascript/menus/main";

// import {
//   validateToken,
//   redireccionar,
//   existToken,
//   deleteToken,
// } from "../javascript/auth/validateToken";

export default defineComponent({
  name: "MainLayout",
  components: {
    ListMenu,
  },

  setup() {
    const $q = useQuasar();
    const leftDrawerOpen = ref(false);
    // eslint-disable-next-line global-require
    const url = require("../assets/logos/logo_md.png");
    return {
      menuList,
      menuHelp,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      $q,
      url,
    };
  },
});
</script>
