<template>
  <router-view />
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style lang="sass">
@import "./src/css/grids.scss"
@import "./css/mainPanel.scss"
</style>
