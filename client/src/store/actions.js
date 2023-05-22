import moment from "moment";
import Vue from "vue";
import { generateRandomData } from "../utils/randomData";

export async function initStore({ dispatch }) {
  await dispatch("getMetrics");
  dispatch("getDevices");
  dispatch("getAlerts");
}

export async function getDevices({ commit }) {
  const { data: devices } = await Vue.axios.get("/api/v1/devices");
  commit("devices", devices.records);
}

export async function getMetrics({ commit }) {
  const { data: metatData } = await Vue.axios.get("/api/v1/iotdata/meta-data");
  commit("metrics", metatData.fields);
}

export async function getUser({ commit }) {
  const { data } = await Vue.axios.get("/user");
  commit("setUser", data);
}

export async function getRandomData({ commit }) {
  if (process.env.VUE_APP_LOCAL_DEV && process.env.VUE_APP_LOCAL_DEV === "true") {
    const data = generateRandomData();
    commit("randomData", data);
  } else {
    const { data } = await Vue.axios.get("/random-data");
    commit("randomData", data);
  }
}

export async function editPermission({ commit }) {
  const { data } = await Vue.axios.post("/api/v1/authorization/policy/check", [{ Action: "devices.EDIT" }]);

  if (data[0].Allowed !== undefined) {
    commit("editPermission", data[0].Allowed);
  }
}

export async function deletePermission({ commit }) {
  const { data } = await Vue.axios.post("/api/v1/authorization/policy/check", [{ Action: "devices.DELETE" }]);
  if (data[0].Allowed !== undefined) {
    commit("deletePermission", data[0].Allowed);
  }
}

const formatDate = (alertTime) => {
  return moment(alertTime).format("YYYY-MM-DD HH:mm");
};

const buildAlertEntity = (incident) => {
  const attributes = incident.customAttributes;
  return {
    id: incident.UUID,
    date: incident.createdTime,
    description: attributes.description,
    status: incident.labels.stateful_status,
    title: attributes.title,
    deviceName: attributes.deviceName,
    deviceId: incident.labels.stateful_incident_device,
    value: attributes.value,
    formatedDate: formatDate(incident.createdTime),
  };
};

export async function getAlerts({ commit }) {
  const { data: rawAlerts } = await Vue.axios.get("/api/v1/twins?digitalTwinTypeName=stateful_incident&customAttributes.title=~");
  rawAlerts.sort((a, b) => b.createdTime - a.createdTime);
  const alerts = rawAlerts.reduce((acc, alert) => {
    const deviceId = alert.labels.stateful_incident_device;
    if (!deviceId) return acc;
    if (!acc[deviceId]) acc[deviceId] = [];
    acc[deviceId].push(buildAlertEntity(alert));
    return acc;
  }, {});
  commit("setAlerts", alerts);
}

export async function completeIncident({ commit }, { incidentId, deviceId }) {
  const { data: res } = await Vue.axios.put(`api/v1/twins/${incidentId}`, { "labels.stateful_status": "closed" });
  if (res.ok) {
    commit("updateIncident", { id: incidentId, deviceId, status: "closed" });
  }
}

export default {
  initStore,
  getDevices,
  deletePermission,
  editPermission,
  getUser,
  getAlerts,
  getMetrics,
  completeIncident,
  getRandomData,
};
