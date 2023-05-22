<template>
  <v-marker-cluster :options="{ iconCreateFunction: clusterIcon }">
    <div
      v-for="device in devices"
      :key="device.UUID"
    >
      <l-marker
        v-if="device.gpsLastSeen"
        :lat-lng="getLatLong(device.latitude, device.longitude)"
        :icon="selectedIcon"
      >
        <l-tooltip :options="{ interactive: true }"> Device: {{ device.name }} </l-tooltip>
      </l-marker>
    </div>
  </v-marker-cluster>
</template>
<script>
// If you need to reference 'L', such as in 'L.icon', then be sure to
// explicitly import 'leaflet' into your component
import L from "leaflet";
import { LMarker, LTooltip } from "vue2-leaflet";
import { latLng } from "leaflet";
import { mapGetters } from "vuex";
import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";

export default {
  name: "DeviceClusters",
  components: {
    LMarker,
    LTooltip,
    "v-marker-cluster": Vue2LeafletMarkerCluster,
  },

  data: () => ({
    zoom: 13,
    map: null,
    selectedIcon: L.divIcon({
      html: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24px" height="24px" viewBox="0 0 24 24" ><path d="M5,10.5 C5,6 8,3 12.5,3 C17,3 20,6.75 20,10.5 C20,12.8325623 17.8236613,16.03566 13.470984,20.1092932 C12.9154018,20.6292577 12.0585054,20.6508331 11.4774555,20.1594925 C7.15915182,16.5078313 5,13.2880005 5,10.5 Z M12.5,12 C13.8807119,12 15,10.8807119 15,9.5 C15,8.11928813 13.8807119,7 12.5,7 C11.1192881,7 10,8.11928813 10,9.5 C10,10.8807119 11.1192881,12 12.5,12 Z" /></svg>',
      className: "live",
    }),
  }),
  async mounted() {},
  methods: {
    getLatLong(lat, long) {
      return latLng(lat, long);
    },

    clusterIcon(cluster) {
      var childCount = cluster.getChildCount();

      var c = " marker-cluster-";
      if (childCount < 10) {
        c += "small";
      } else if (childCount < 100) {
        c += "medium";
      } else {
        c += "large";
      }

      return new L.DivIcon({
        html: "<div><span>" + childCount + "</span></div>",
        className: "marker-cluster marker-cluster-davra " + c,
        iconSize: new L.Point(40, 40),
      });
    },
  },
  computed: {
    ...mapGetters(["devices"]),
  },
};
</script>

<style>
.marker-cluster-davra {
  color: white !important;
  background-color: var(--v-primary-base) !important;
}

.marker-cluster-davra div {
  color: white !important;
  background-color: var(--v-primary-base) !important;
}
</style>
