<template>
  <router-view />
</template>
<script>
import { mapActions } from "vuex";
import * as am4core from "@amcharts/amcharts4/core";
export default {
  name: "App",

  data: () => ({}),
  created: async function () {
    await this.getRandomData();
    await this.getUser();
    await this.editPermission();
    await this.deletePermission();
    await this.initStore();
    am4core.options.commercialLicense = true;
  },
  computed: {},
  methods: {
    ...mapActions(["initStore", "getUser", "deletePermission", "editPermission", "getRandomData"]),
  },
};
</script>
