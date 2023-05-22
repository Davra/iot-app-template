<template>
  <v-banner
    single-line
    color="secondary"
  >
    <h1 class="my-8">Devices</h1>
    <template v-slot:actions>
      <RegisterDevice />
    </template>
  </v-banner>
</template>
<script>
import RegisterDevice from "@/components/general/RegisterDevice";
export default {
  components: {
    RegisterDevice,
  },
};
</script>
