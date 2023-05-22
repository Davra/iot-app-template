<template>
  <v-card class="ma-10">
    <v-list-item one-line>
      <v-list-item-content>
        <v-list-item-title class="primary--text text-h5"> General </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list class="transparent">
      <v-list-item>
        <v-list-item-title class="font-weight-black"><v-icon color="black">mdi-label</v-icon> Name</v-list-item-title>
        <v-list-item-subtitle class="text-right">
          {{ device.name }}
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title class="font-weight-black"><v-icon color="black">mdi-card-text</v-icon> Description</v-list-item-title>
        <v-list-item-subtitle class="text-right">
          {{ device.description }}
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title class="font-weight-black"><v-icon color="black">mdi-dev-to</v-icon> Serial Number</v-list-item-title>
        <v-list-item-subtitle class="text-right">
          {{ device.serialNumber }}
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title class="font-weight-black"><v-icon color="black">mdi-sync</v-icon>State</v-list-item-title>
        <v-list-item-subtitle class="text-right">
          {{ within24hours }}
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title class="font-weight-black"><v-icon color="black">mdi-message-processing</v-icon>Last Message</v-list-item-title>
        <v-list-item-subtitle class="text-right">
          {{ formatDate }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import moment from "moment";
export default {
  props: ["device"],

  computed: {
    within24hours() {
      if (moment(this.device.lastSeen).valueOf() >= moment().subtract(24, "hours").valueOf()) {
        return "Active";
      } else {
        return "InActive";
      }
    },
    formatDate() {
      return moment(this.device.lastSeen).format("YYYY-MM-DD HH:mm");
    },
  },
};
</script>
