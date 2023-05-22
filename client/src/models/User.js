import Vue from "vue";

class User {
  constructor(initData) {
    Object.assign(this, initData);
    this.getIP();
    // set API access details once User details loaded
    console.log(this);
    if (this.oauth) {
      Vue.axios.defaults.baseURL = "https://" + process.env.VUE_APP_TENANT_HOST;
      Vue.axios.defaults.headers.common.Authorization = "Bearer " + this.oauth.accessToken;
    }
  }

  getIP() {
    fetch("https://api.ipify.org?format=json")
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        this.ip = data.ip;
      })
      .catch((error) => {
        console.log("IP Request failed", error);
      });
  }
}

export default User;
