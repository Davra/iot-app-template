import Vue from "vue";
import VueRouter from "vue-router";
import Base from "@/components/layout/Base";
import Devices from "@/components/pages/Devices";
import Device from "@/components/pages/Device";
import GraphPreview from "@/components/pages/GraphPreview";
import Map from "@/components/pages/Map";
import RulesEngine from "@/components/pages/RulesEngine";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Base,
    redirect: "/devices",
    children: [
      {
        path: "/devices",
        name: "Devices",
        component: Devices,
      },
      {
        path: "/device/:deviceUUID",
        name: "Device",
        component: Device,
      },
      {
        path: "/random",
        name: "random",
        component: GraphPreview,
      },
      {
        path: "/map",
        name: "Map",
        component: Map,
      },
      {
        path: "/rules-engine",
        name: "Rules Engine",
        component: RulesEngine,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
