<template>
  <div>
    <v-card
      class="ma-10"
      style="background-color: var(--v-secondary-base)"
    >
      <v-card-title>
        <v-text-field
          flat
          outlined
          append-icon="mdi-magnify"
          label="Search"
          class="search"
          :value="searchToken"
          style="background-color: white"
          @input="searchOnChange"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          class="mr-4 mt-5"
          to="/map"
        >
          <v-icon left> mdi-map </v-icon>
          View Map of Devices
        </v-btn>
      </v-card-title>
      <div class="device-table">
        <v-data-table
          :headers="headers"
          :items="sortedDevices"
          :items-per-page="10"
          class="elevation-1"
          @click:row="handleClick"
        >
          <template v-slot:item.comms="{ item }">
            <v-icon :color="getColor(item.comms)"> mdi-check </v-icon>
          </template>
          <template v-slot:item.alerts="{ item }">
            <v-icon :color="getColor(item.alerts)"> mdi-bell </v-icon>
          </template>
          <template v-slot:item.actions="{ item }">
            <DeviceActions :item="item" />
          </template>
        </v-data-table>
      </div>
    </v-card>
  </div>
</template>

<script>
import DeviceActions from "@/components/general/DeviceActions";
import axios from "axios";
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      dashboardURL: null,
      selectedItem: null,
      sortedDevices: [],
      headers: [
        { text: "Name", value: "name" },
        { text: "Serial No.", value: "serialNumber" },
        { text: "Last seen", value: "lastSeen" },
        { text: "Active", value: "comms" },
        { text: "Alerts", value: "alerts" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      readOnly: false,
      devicesForTable: this.devices,
      searchToken: null,
    };
  },
  components: {
    DeviceActions,
  },
  watch: {
    devices(val) {
      this.devicesForTable = val;
      this.formatData(val);
    },
    alerts() {
      if (this.devicesForTable !== undefined) {
        this.formatData(this.devicesForTable);
      }
    },
  },
  mounted() {
    this.devicesForTable = this.devices;
    if (this.devicesForTable !== undefined) {
      this.formatData(this.devicesForTable);
    }
  },
  computed: {
    ...mapGetters(["devices", "alerts", "editPermission", "deletePermission"]),
  },
  methods: {
    ...mapActions(["linkDashBoard"]),
    formatData(devicesToFormat) {
      const rawDevices = devicesToFormat.reduce((acc, device) => {
        const deviceId = device._id;
        if (!deviceId) return acc;
        if (!acc[deviceId]) acc[deviceId] = [];
        acc[deviceId].push(this.buildDeviceEntity(device));
        return acc;
      }, {});
      this.sortedDevices = Object.values(rawDevices)
        .flat()
        .sort((a, b) => b.lastSeen - a.lastSeen);
    },
    searchOnChange: async function (value) {
      this.searchToken = value;
      const devices = await axios
        .get("api/v1/devices?name=~" + value)
        .then((data) => data.data.records)
        .catch((err) => console.log(err));
      this.devicesForTable = devices;
      this.formatData(this.devicesForTable);
    },
    openDialog(item) {
      this.dialog = true;
      this.selectedItem = item;
    },
    getColor(lastSeen) {
      if (lastSeen) return "primary";
      else return "grey";
    },
    getDeviceDate(timestamp) {
      return moment(timestamp).format("YYYY-MM-DD HH:mm:ss");
    },

    buildDeviceEntity(device) {
      return {
        serialNumber: device.serialNumber,
        name: device.name,
        lastSeen: this.getDeviceDate(device.lastSeen),
        comms: this.within24hours(device.lastSeen),
        uuid: device.UUID,
        alerts: this.checkForAlerts(device.UUID),
        description: device.description,
      };
    },
    within24hours(lastSeen) {
      return moment(lastSeen).valueOf() >= moment().subtract(24, "hours").valueOf();
    },
    checkForAlerts(uuid) {
      if (this.alerts[uuid]) {
        return this.alerts[uuid].length >= 1;
      }
      return false;
    },
    handleClick(row) {
      this.$router.push(`/device/${row.uuid}`);
    },
  },
};
</script>

<style>
.search {
  min-width: 300px;
  height: 55px;
  flex: 0 0 auto;
  margin: 0 10px !important;
}
.device-table {
  margin-top: 10px;
}
</style>
