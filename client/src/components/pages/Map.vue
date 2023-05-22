<template>
  <div class="map-wrapper">
    <l-map
      :zoom="zoom"
      :center="center"
      :options="options"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      ></l-tile-layer>
      <DeviceClusters />
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer } from "vue2-leaflet";
import { latLng } from "leaflet";
import DeviceClusters from "@/components/general/DeviceClusters";

export default {
  components: {
    LMap,
    LTileLayer,
    DeviceClusters,
  },
  data() {
    return {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: "",
      subdomains: ["server", "services"],
      center: latLng(0.0, 0.0),
      zoom: 3,
      filters: false,
      options: { tap: false },
    };
  },
};
</script>

<style>
.map-wrapper {
  height: calc(100vh - 48px);
  width: 100%;
}
</style>
