import moment from "moment";
import Vue from "vue";

export const queryDeviceData = async (isSingleDaySelected, device, startValue, endValue, metric) => {
  let format;
  if (isSingleDaySelected) {
    format = "YYYY-MM-DD HH";
  } else {
    format = "YYYY-MM-DD";
  }
  var metricsArr = [
    {
      name: metric.replace(/ /g, "_").toLowerCase(),
      tags: {
        UUID: [device.UUID],
      },
      group_by: [
        {
          name: "tag",
          tags: ["UUID"],
        },
      ],
      aggregators: [
        {
          name: "avg",
          align_sampling: true,
          sampling: {
            value: 1,
            unit: isSingleDaySelected ? "hours" : "days",
          },
        },
      ],
      exclude_tags: true,
    },
  ];
  const query = {
    metrics: metricsArr,
    start_absolute: startValue,
    end_absolute: endValue,
  };
  const response = await Vue.axios.post("/api/v2/timeseriesData", query);
  var result = [];
  if (response && response.data && response.data.queries) {
    response.data.queries[0].results[0].values.forEach((value) => {
      result.push({
        date: moment(moment(value[0]).format(format)).valueOf(),
        metric_value: value[1],
      });
    });
  }
  return result;
};

// Get one datapoint for a device(average over timerange)

export const queryDeviceAverageData = async (device, startValue, endValue, metric) => {
  var metricsArr = [
    {
      name: metric.replace(/ /g, "_").toLowerCase(),
      tags: {
        UUID: [device.UUID],
      },
      group_by: [
        {
          name: "tag",
          tags: ["UUID"],
        },
      ],
      aggregators: [
        {
          name: "avg",
          align_sampling: true,
          sampling: {
            value: 100,
            unit: "years",
          },
        },
      ],
      exclude_tags: true,
    },
  ];
  const query = {
    metrics: metricsArr,
    start_absolute: startValue,
    end_absolute: endValue,
  };
  const response = await Vue.axios.post("/api/v2/timeseriesData", query);
  var result = [];
  if (response && response.data && response.data.queries) {
    response.data.queries[0].results[0].values.forEach((value) => {
      result.push({
        timstamp: value[0],
        metric_value: value[1],
      });
    });
  }
  return result;
};
