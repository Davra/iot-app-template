<template>
  <div>
    <v-toolbar
      color="secondary"
      dark
      flat
    >
      <v-toolbar-title class="ml-8 text-h5">{{ device.name }}</v-toolbar-title>

      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          align-with-title
        >
          <v-tabs-slider></v-tabs-slider>

          <v-tab
            v-for="item in items"
            :key="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <div v-if="items[tab] === 'Overview'">
      <Overview :device="device" />
    </div>
    <div v-if="items[tab] === 'Data'">
      <IoTData :device="device" />
    </div>
    <div v-if="items[tab] === 'Graphs'">
      <Graphs :device="device" />
    </div>
    <div v-if="items[tab] === 'Alarms'">
      <Alarms :device="device" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import Overview from "@/components/views/Overview";
import Graphs from "@/components/views/Graphs";
import Alarms from "@/components/views/Alarms";
import IoTData from "@/components/views/IoTData";
export default {
  data() {
    return {
      tab: null,
      items: ["Overview", "Data", "Graphs", "Alarms"],
    };
  },
  components: {
    Overview,
    Graphs,
    Alarms,
    IoTData,
  },
  computed: {
    ...mapState({
      device: function (state) {
        return state.devices.find((device) => device.UUID === this.$route.params.deviceUUID);
      },
    }),
    formatTime() {
      return moment(this.device.lastSeen).format("HH:mm");
    },
  },
};
</script>
