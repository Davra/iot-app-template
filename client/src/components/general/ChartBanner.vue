<template>
  <v-banner
    single-line
    color="secondary"
  >
    <h1 class="my-8">Graph Preview</h1>
    <template v-slot:actions>
      <v-btn
        disabled
        color="white"
        class="mr-10"
      >
        <v-icon left> mdi-refresh </v-icon>
        Refresh to fetch new data
      </v-btn>
    </template>
  </v-banner>
</template>
