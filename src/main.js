import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./assets/css/tailwind.css";

const app = createApp(App);

library.add(fas);

app.use(createPinia());
app.use(router);

app.component("fa", FontAwesomeIcon);

app.mount("#app");
