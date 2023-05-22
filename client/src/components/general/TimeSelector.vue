<template>
  <div class="select-wrapper mt-10 mr-10">
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="datesISOFormat"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template
        v-if="true"
        v-slot:activator="{ on }"
      >
        <v-text-field
          v-model="dateRangeText"
          readonly
          append-icon="mdi-calendar-blank"
          hide-details
          dense
          v-on="on"
          solo
          outlined
        ></v-text-field>
      </template>
      <div
        class="d-flex justify-space-between px-1 py-2"
        style="background-color: white"
      >
        <v-btn
          text
          color="primary"
          @click="() => onClickSelectors(1)"
          >24 hours</v-btn
        >
        <v-btn
          text
          color="primary"
          @click="() => onClickSelectors(7)"
          >7 days</v-btn
        >
        <v-btn
          text
          color="primary"
          @click="() => onClickSelectors(30)"
          >30 days</v-btn
        >
      </div>
      <v-date-picker
        no-title
        scrollable
        v-model="datesISOFormat"
        @input="onSelectedManually"
        elevation="2"
        range
        :max="maxDate"
      >
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="menu = false"
        >
          Cancel
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="onSubmit"
        >
          Save
        </v-btn>
        <v-spacer></v-spacer>
      </v-date-picker>
    </v-menu>
  </div>
</template>
<script>
import { mapState } from "vuex";
const dayjs = require("dayjs");
import sortBy from "lodash/sortBy";

export default {
  data: () => ({
    datesISOFormat: [],
    isSelectedManually: false,
    startRangeDate: null,
    finishRangeDate: null,
    menu: false,
  }),
  mounted() {
    this.syncDatesWithStore();
  },
  computed: {
    ...mapState({
      dateRange: (state) => state.dateRange,
    }),
    dateRangeText() {
      const datesSorted = sortBy(this.datesISOFormat, (date) => date);
      let startDate = datesSorted[0];
      let finishDate = datesSorted[1];

      if (!this.isSelectedManually) {
        startDate = this.startRangeDate;
        finishDate = this.finishRangeDate;

        return dayjs(startDate).format("YYYY-MM-DD HH:mm") + " - " + dayjs(finishDate).format("YYYY-MM-DD HH:mm");
      }

      return dayjs(startDate).startOf("day").format("YYYY-MM-DD HH:mm") + " - " + dayjs(finishDate).endOf("day").format("YYYY-MM-DD HH:mm");
    },
    maxDate() {
      return dayjs().format("YYYY-MM-DD");
    },
  },
  methods: {
    onClickSelectors(dayOffset) {
      this.isSelectedManually = false;

      let datesSorted = sortBy(this.datesISOFormat, (date) => date);

      const timeOffset = dayOffset * 24;

      const startRangeDate = dayjs().subtract(timeOffset, "hour");

      this.startRangeDate = startRangeDate;
      this.finishRangeDate = dayjs();

      datesSorted[0] = startRangeDate;
      datesSorted[1] = dayjs();

      const changedDates = [...datesSorted];

      this.datesISOFormat = changedDates.map((date) => date.format("YYYY-MM-DD"));
    },
    onSelectedManually() {
      this.isSelectedManually = true;
    },
    syncDatesWithStore() {
      const sortedDates = sortBy(this.dateRange, (date) => date.format("YYYY-MM-DD"));
      this.startRangeDate = sortedDates[0];
      this.finishRangeDate = sortedDates[1];
      this.datesISOFormat = sortedDates.map((date) => date.format("YYYY-MM-DD"));
    },
    onSubmit() {
      const datesSorted = sortBy(this.datesISOFormat, (date) => date);
      let dateRange = [dayjs(datesSorted[0], "YYYY-MM-DD", true).startOf("day"), dayjs(datesSorted[1], "YYYY-MM-DD", true).endOf("day")];

      if (!this.isSelectedManually) {
        dateRange = [this.startRangeDate, this.finishRangeDate];
      }

      this.$store.commit("setDateRange", dateRange);

      const { query } = this.$route;

      const newQuery = {
        ...query,
        start: dateRange[0].format("YYYY-MM-DD HH:mm"),
        end: dateRange[1].format("YYYY-MM-DD HH:mm"),
      };

      this.$router
        .replace({
          query: newQuery,
        })
        .catch(() => {});

      this.$refs.menu.save(this.datesISOFormat);
    },
  },
  watch: {
    dateRange() {
      this.syncDatesWithStore();
    },
  },
};
</script>

<style scoped>
.select-wrapper {
  width: 22.8rem;
}
</style>
