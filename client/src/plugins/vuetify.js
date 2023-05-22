import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    options: { customProperties: true },
    themes: {
      light: {
        primary: "#4043AD",
        secondary: colors.grey.lighten1,
        background: colors.white,
      },
      dark: {
        primary: "#4043AD",
        secondary: colors.grey.lighten1,
        background: colors.white,
      },
    },
  },
});
