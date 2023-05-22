<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <h1 class="mt-10 ml-10"><v-icon large>mdi-chart-box</v-icon> Graphs</h1>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        align="right"
      >
        <TimeSelector />
      </v-col>
      <v-col
        cols="12"
        sm="12"
        align="right"
      >
        <LineChart :device="device" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import TimeSelector from "@/components/general/TimeSelector";
import LineChart from "@/components/general/LineChart";
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  props: ["device"],
  components: {
    TimeSelector,
    LineChart,
  },
  computed: {
    ...mapGetters(["metrics"]),
    getmetricNames() {
      let names = [];
      this.metrics.forEach((element) => {
        names.push(element.label);
      });
      return names;
    },
  },
};
</script>
