import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import User from "../models/User";
const dayjs = require("dayjs");

import { createLogger } from "vuex";

Vue.use(Vuex);

const debug = true;

export default new Vuex.Store({
  state: {
    devices: [],
    alerts: {},
    dateRange: [dayjs().subtract(7, "days"), dayjs()],
    user: {},
    editPermission: false,
    deletePermission: false,
    metrics: [],
    randomData: {},
  },
  getters: {
    devices: (state) => state.devices,
    alerts: (state) => state.alerts,
    dateRange: (state) => state.dateRange,
    user: (state) => state.user,
    editPermission: (state) => state.editPermission,
    deletePermission: (state) => state.deletePermission,
    metrics: (state) => state.metrics,
    randomData: (state) => state.randomData,
  },
  mutations: {
    /**
     * After load from API, create obj and set in state
     * @param {*} state
     * @param {*} user
     */
    setDateRange(state, dateRange) {
      state.dateRange = dateRange;
    },
    devices(state, devices) {
      state.devices = devices;
    },
    metrics(state, metrics) {
      state.metrics = metrics;
    },
    randomData(state, randomData) {
      state.randomData = randomData;
    },
    setAlerts(state, alerts) {
      state.alerts = alerts;
    },
    updateIncident(state, { id, deviceId, status }) {
      state.alerts = {
        ...state.alerts,
        [deviceId]: state.alerts[deviceId].map((alert) => {
          if (alert.id === id) {
            return { ...alert, status };
          }
          return alert;
        }),
      };
    },
    updateDevices(state, { device }) {
      const deviceIndex = state.devices.findIndex((logger) => (logger.UUID = device.UUID));
      state.devices[deviceIndex] = device;
    },
    setUser(state, user) {
      state.user = new User(user);
    },
    editPermission(state, editPermission) {
      state.editPermission = editPermission;
    },
    deletePermission(state, deletePermission) {
      state.deletePermission = deletePermission;
    },
  },
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
