<template>
  <div>
    <h1 class="mt-10 ml-10">Device Information</h1>
    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <DeviceInfo :device="device" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import DeviceInfo from "@/components/general/DeviceInfo";
export default {
  data() {
    return {};
  },
  props: ["device"],
  components: {
    DeviceInfo,
  },
};
</script>
