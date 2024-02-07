import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "./media/index.css";
// Components/UI
import components from "./components/UI/index.js";
// Vuetify
import vuetify from "./plugins/vuetify";
// pinia
import { createPinia } from "pinia";
// Fonts
const webFontLoader = await import("webfontloader");

webFontLoader.load({
  google: {
    families: ["Roboto:100,300,400,500,700,900&display=swap"],
  },
});

const app = createApp(App);
const pinia = createPinia();

components.forEach((component) => {
  app.component(component.compName, component);
});

app.use(vuetify).use(pinia).use(router).mount("#app");
