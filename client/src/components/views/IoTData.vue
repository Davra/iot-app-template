<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <h1 class="mt-10 ml-10"><v-icon large>mdi-database</v-icon> Data</h1>
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
      >
        <div class="mx-10 my-2">
          <v-card flat>
            <v-card-title class="primary--text">
              <select
                class="styledSelect"
                label="Select Metric"
                v-model="metric"
                outlined
              >
                <option
                  value=""
                  disabled
                  selected
                >
                  Select metric
                </option>
                <option
                  v-for="metric in metricLabels"
                  :value="metric"
                  :key="metric"
                >
                  {{ metric }}
                </option>
              </select>
            </v-card-title>
            <v-card-text class="text-h6">{{ cardText }}</v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import TimeSelector from "@/components/general/TimeSelector";
import { mapGetters } from "vuex";
import { queryDeviceAverageData } from "../../utils/queryDataHelper";
export default {
  data() {
    return {
      metric: "",
      metricLabels: [],
      metricName: null,
      cardText: "Select a metric to see the average value",
    };
  },
  props: ["device"],
  components: {
    TimeSelector,
  },
  async mounted() {
    await this.getmetricLabels();
  },
  watch: {
    dateRange: function () {
      this.getIoTData();
    },
    metric(newVal) {
      this.getMetricName(newVal);
      this.getIoTData();
    },
    metrics() {
      this.getmetricLabels();
    },
  },
  computed: {
    ...mapGetters(["dateRange", "metrics"]),
  },
  methods: {
    getmetricLabels() {
      this.metrics.forEach((element) => {
        this.metricLabels.push(element.label);
        this.optionsHtml += `<option>${element.label}</option>`;
      });
      return;
    },
    getMetricName(label) {
      const selectedMetric = this.metrics.find((metric) => metric.label === label);
      this.metricName = selectedMetric.name;
    },
    async getIoTData() {
      let data = await queryDeviceAverageData(this.device, this.dateRange[0].startOf("hour").valueOf(), this.dateRange[1].endOf("hour").valueOf(), this.metricName);
      console.log(data);
      if (data.length >= 1) {
        this.cardText = `Average value for ${this.metric}: ${data[0].metric_value}`;
      } else {
        this.cardText = `No data for ${this.metric} within the selected timerange`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.styledSelect {
  position: absolute;
  width: 300px;
  background-color: white;
  padding: 0 px;
  border: 2px solid transparent;
  border-color: var(--v-secondary-base) var(--v-secondary-base) var(--v-secondary-base) var(--v-secondary-base);
}
</style>
