<template>
  <div class="page-wrap">
    <v-banner
      single-line
      color="secondary"
    >
      <h1 class="my-8">Rules Engine</h1>
    </v-banner>
    <div class="rules-table">
      <v-card>
        <div style="display: none">
          <form
            @submit="submitForm()"
            ref="form-login"
            id="form-login"
            target="frame-re"
            method="post"
            :action="`${baseUrl}/ui/login`"
          >
            <input
              type="hidden"
              name="loginusername"
              :value="username"
            />
            <input
              type="hidden"
              name="loginpassword"
              :value="password"
            />
            <input
              type="hidden"
              name="username"
              :value="username"
            />
            <input
              type="hidden"
              name="password"
              :value="password"
            />
            <input
              type="hidden"
              name="onsuccess"
              :value="`/ui/rules-engine.html?embedded=true`"
            />
            <input
              type="hidden"
              name="Submit"
              value="submit"
            />
          </form>
        </div>
        <div style="overflow: hidden">
          <iframe
            class="tab-item-wrapper"
            id="frame-re"
            name="frame-re"
            :src="`${baseUrl}/ui/rules-engine.html?embedded=true`"
            width="100%"
            height="100%"
            frameborder="0"
            ref="frame-re"
            style="position: relative"
            SameSite="Secure"
            sandbox="allow-scripts allow-same-origin allow-top-navigation allow-forms allow-popups allow-pointer-lock allow-popups-to-escape-sandbox"
          >
          </iframe>
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyIframe",
  data: () => ({
    myIframe: null,
    tab: 0,
    baseUrl: "https://" + process.env.VUE_APP_TENANT_HOST,
    username: process.env.VUE_APP_DAVRA_LOGIN,
    password: process.env.VUE_APP_DAVRA_PASSWORD,
  }),
  mounted() {
    this.submitForm();
  },
  methods: {
    submitForm() {
      document.getElementById("form-login").submit();
    },
  },
};
</script>

<style scoped>
.tab-item-wrapper {
  height: calc(90vh);
  border-radius: 0.5%;
}
</style>
