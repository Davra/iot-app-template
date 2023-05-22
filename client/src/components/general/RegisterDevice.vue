<template>
  <v-row justify="end">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="white"
          class="mr-10"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon left> mdi-plus </v-icon>
          Register a new device
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Register a new Device</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Device Name*"
                  required
                  outlined
                  v-model="deviceName"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Serial Number*"
                  required
                  outlined
                  v-model="serialNumber"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  outlined
                  name="input-7-4"
                  label="Description"
                  v-model="description"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="upsertDevice"
            :disabled="deviceName === '' && serialNumber === ''"
          >
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapActions } from "vuex";
import axios from "axios";
export default {
  data: () => ({
    dialog: false,
    deviceName: "",
    serialNumber: "",
    description: "",
  }),
  methods: {
    ...mapActions(["getDevices"]),
    async upsertDevice() {
      const device = {
        name: this.deviceName,
        serialNumber: this.serialNumber,
        description: this.description,
      };
      const res = await axios.post("api/v1/devices", device).catch((err) => console.log(err));
      if (res !== undefined && res.status === 200) {
        await this.getDevices();
      }
      this.deviceName = "";
      this.serialNumber = "";
      this.description = "";
      this.dialog = false;
    },
  },
};
</script>
