<template>
  <v-app
    id="onset-spa"
    :style="{ background: $vuetify.theme.themes[theme].background }"
  >
    <Navigation />
    <AppBar />
    <v-main app>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "@/components/layout/Navigation";
import AppBar from "@/components/layout/AppBar";
export default {
  components: {
    Navigation,
    AppBar,
  },
  data: () => ({}),
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
};
</script>
