import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as icons from "@mdi/font/css/materialdesignicons.css";

export default createVuetify({
  defaults: {
    VTextField: {
      color: "primary",
      variant: "outlined",
    },
    VCard: {
      color: "white",
    },
  },
  theme: {
    themes: {
      light: {
        colors: {
          background: "#F1F5F9",
          background_dialog: "#FFFFFF",
          reverse_background: "#FFFFFF",
          primary: "#0EA5E9",
          secondary: "#5CBBF6",
          text: "#415174",
          white: "#FFFFFF",
          sub: "#6E6E6E",
          my_grey: "#EDEFF2",
        },
      },
      dark: {
        colors: {
          background: "#09233B",
          navigation: "#122D54",
          primary: "#4C57BA",
          secondary: "#5CBBF6",
        },
      },
    },
  },
  components,
  directives,
  icons,
});
