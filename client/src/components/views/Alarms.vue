<template>
  <v-card
    class="ma-10"
    height="565"
  >
    <v-list-item one-line>
      <v-list-item-content>
        <v-list-item-title class="primary--text text-h5">Active Alarms </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-card-text
      v-if="openAlerts.length === 0"
      class="primary--text text-h6"
      style="text-align: center"
    >
      No Active Alarms
    </v-card-text>
    <v-virtual-scroll
      v-else
      :items="openAlerts"
      height="425"
      item-height="100"
    >
      <template v-slot:default="{ item }">
        <v-scroll-x-transition>
          <v-list-item
            :key="item.id"
            v-if="item.status === 'open'"
          >
            <v-list-item-content>
              <v-alert
                color="error"
                class="mb-3"
              >
                <v-list-item>
                  <v-list-item-title><v-icon left>mdi-alert-circle</v-icon>{{ item.title }}</v-list-item-title>
                  <v-list-item-subtitle class="text-right">
                    <v-icon left>mdi-clock</v-icon>
                    {{ formatDate(item.date) }}
                  </v-list-item-subtitle>
                  <v-btn
                    small
                    class="ml-4"
                    color="amber"
                    @click="complete(item)"
                  >
                    <v-icon
                      left
                      small
                    >
                      mdi-alert-outline
                    </v-icon>
                    <span class="no-uppercase">Resolve!</span>
                  </v-btn>
                </v-list-item>
              </v-alert>
            </v-list-item-content>
          </v-list-item>
        </v-scroll-x-transition>
      </template>
    </v-virtual-scroll>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
export default {
  data() {
    return {};
  },
  props: ["device"],
  methods: {
    ...mapActions(["completeIncident"]),
    complete: async function (item) {
      await this.completeIncident({
        incidentId: item.id,
        deviceId: item.deviceId,
      });
    },
    formatDate(alertTime) {
      return moment(alertTime).format("YYYY-MM-DD HH:mm");
    },
  },
  computed: {
    ...mapGetters(["alerts"]),
    openAlerts() {
      let allAlerts = Object.values(this.alerts)
        .flat()
        .sort((a, b) => b.date - a.date);
      return allAlerts.filter((alert) => alert.status === "open" && alert.deviceId === this.device.UUID);
    },
  },
};
</script>
