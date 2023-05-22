<template>
  <div>
    <ChartBanner />
    <div class="mx-10 my-2">
      <v-card flat>
        <v-card-title class="primary--text">
          <h3>Average Value: {{ average }}</h3>
        </v-card-title>
        <div
          id="chartdiv"
          style="width: 100%; min-height: 500px"
          class="elevation-6"
        ></div>
      </v-card>
    </div>
  </div>
</template>

<script>
import ChartBanner from "@/components/general/ChartBanner";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { mapGetters } from "vuex";
am4core.useTheme(am4themes_animated);
export default {
  data: () => ({
    chart: null,
    average: "",
  }),
  components: {
    ChartBanner,
  },
  watch: {
    randomData() {
      this.updateGraphs();
    },
  },
  computed: {
    ...mapGetters(["randomData"]),
  },
  mounted() {
    var self = this;
    am4core.ready(function () {
      am4core.options.commercialLicense = true;
      self.updateGraphs();
    });
  },

  methods: {
    updateGraphs() {
      this.disposeAllCharts();
      this.generateCharts();
    },
    generateChartData() {
      if (this.randomData.arr !== undefined && this.randomData.chartData !== undefined) {
        this.average = (this.randomData.arr.reduce((a, b) => a + b, 0) / this.randomData.arr.length).toFixed(3);
        return this.randomData.chartData;
      } else {
        return [];
      }
    },
    async generateCharts() {
      let chart = am4core.create("chartdiv", am4charts.XYChart);
      let data = this.generateChartData();

      chart.data = data;
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      var series1 = chart.series.push(new am4charts.LineSeries());
      series1.dataFields.valueY = "temperature";
      series1.dataFields.dateX = "date";
      series1.name = "temperature";
      series1.bullets.push(new am4charts.CircleBullet());
      series1.tooltipText = "{name} : {valueY}";
      series1.legendSettings.valueText = "{valueY}";
      series1.visible = false;
      series1.fill = am4core.color("#311B92");
      series1.strokeWidth = 2;
      series1.stroke = am4core.color("#311B92");
      // Add scrollbar
      chart.scrollbarX = new am4charts.XYChartScrollbar();
      chart.scrollbarX.series.push(series1);

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
