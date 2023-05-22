<template>
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
      <div
        id="chartdiv"
        style="width: 100%; min-height: 500px"
        class="elevation-6"
      ></div>
    </v-card>
  </div>
</template>

<script>
import { queryDeviceData } from "../../utils/queryDataHelper";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { mapGetters } from "vuex";
am4core.useTheme(am4themes_animated);
export default {
  data: () => ({
    chart: null,
    metric: "",
    metricLabels: [],
    metricName: null,
  }),
  props: ["device"],

  mounted() {
    this.getmetricLabels();
    if (this.device !== undefined) {
      var self = this;
      am4core.ready(function () {
        am4core.options.commercialLicense = true;
        self.updateGraphs();
      });
    }
  },
  computed: {
    ...mapGetters(["dateRange", "metrics"]),
    isSingleDaySelected() {
      return this.dateRange[1].diff(this.dateRange[0].valueOf(), "hours") < 25;
    },
  },
  watch: {
    dateRange: function () {
      this.updateGraphs();
    },
    metric(newVal) {
      this.getMetricName(newVal);
      this.updateGraphs();
    },
  },
  methods: {
    getmetricLabels() {
      this.metrics.forEach((element) => {
        this.metricLabels.push(element.label);
      });
      return;
    },
    getMetricName(label) {
      const selectedMetric = this.metrics.find((metric) => metric.label === label);
      this.metricName = selectedMetric.name;
    },
    updateGraphs() {
      if (this.metric) {
        this.disposeAllCharts();
        this.generateCharts();
      }
    },
    async generateCharts() {
      let chart = am4core.create("chartdiv", am4charts.XYChart);
      let data = await queryDeviceData(this.isSingleDaySelected, this.device, this.dateRange[0].startOf("hour").valueOf(), this.dateRange[1].endOf("hour").valueOf(), this.metricName);

      chart.data = data;
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      var series1 = chart.series.push(new am4charts.LineSeries());
      series1.dataFields.valueY = "metric_value";
      series1.dataFields.dateX = "date";
      series1.name = this.metric;
      series1.bullets.push(new am4charts.CircleBullet());
      series1.tooltipText = "{name} : {valueY}";
      series1.legendSettings.valueText = "{valueY}";
      series1.visible = false;
      series1.fill = am4core.color("#311B92");
      series1.strokeWidth = 2;
      series1.stroke = am4core.color("#311B92");

      // Make a panning cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.behavior = "panXY";
      chart.cursor.xAxis = dateAxis;
      chart.paddingRight = 30;
      this.chart = chart;
    },
    disposeAllCharts() {
      if (this.chart) {
        this.chart.dispose();
      }
    },
  },
  beforeDestroy() {
    this.disposeAllCharts();
  },
};
</script>

<style lang="scss" scoped>
.styledSelect {
  position: absolute;
  margin-bottom: 30px;
  width: 300px;
  background-color: white;
  padding: 0 px;
  border: 2px solid transparent;
  border-color: var(--v-secondary-base) var(--v-secondary-base) var(--v-secondary-base) var(--v-secondary-base);
}
</style>
