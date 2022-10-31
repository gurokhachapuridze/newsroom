import { createApp } from "vue";
import { createPinia } from "pinia";
import "./index.css";

const pinia = createPinia();
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).use(pinia).mount("#app");
