<template>
  <v-row justify="start">
    <v-dialog
      v-model="editDialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          v-if="editPermission"
          small
          class="mr-2"
          v-bind="attrs"
          v-on="on"
        >
          mdi-pencil
        </v-icon>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Device</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Device Name*"
                  required
                  outlined
                  v-model="deviceCopy.name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Serial Number*"
                  required
                  outlined
                  disabled
                  v-model="deviceCopy.serialNumber"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  outlined
                  name="input-7-4"
                  label="Description"
                  v-model="deviceCopy.description"
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
            @click="editDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="editDevice"
            :disabled="deviceCopy.name === ''"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="deleteDialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          v-if="deletePermission"
          small
          v-bind="attrs"
          v-on="on"
        >
          mdi-delete
        </v-icon>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Delete Device</span>
        </v-card-title>
        <v-card-text> Are you sure you want to delete this device? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="deleteDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="deleteDevice"
            :disabled="deviceCopy.name === ''"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import axios from "axios";
export default {
  data: () => ({
    editDialog: false,
    deleteDialog: false,
    deviceCopy: {
      name: "",
      serialNumber: "",
      description: "",
    },
  }),
  props: ["item"],
  mounted() {
    this.deviceCopy = this.device;
    this.deviceCopy = JSON.parse(JSON.stringify(this.deviceCopy));
  },
  computed: {
    ...mapGetters(["editPermission", "deletePermission"]),
    ...mapState({
      device: function (state) {
        return state.devices.find((device) => device.UUID === this.item.uuid);
      },
    }),
  },
  methods: {
    ...mapActions(["getDevices"]),
    async editDevice() {
      const res = await axios.put(`api/v1/devices/${this.deviceCopy.UUID}`, this.deviceCopy).catch((err) => console.log(err));
      if (res !== undefined && res.status === 200) {
        this.getDevices();
      }
      this.editDialog = false;
    },
    async deleteDevice() {
      const res = await axios.delete(`api/v1/devices/${this.deviceCopy.UUID}`).catch((err) => console.log(err));
      if (res !== undefined && res.status === 200) {
        this.getDevices();
      }
      this.deleteDialog = false;
    },
  },
};
</script>
