<template>
  <div>
    <Banner />
    <DeviceTable />
  </div>
</template>
<script>
import Banner from "@/components/general/Banner";
import DeviceTable from "@/components/general/DeviceTable";
export default {
  components: {
    DeviceTable,
    Banner,
  },
};
</script>
