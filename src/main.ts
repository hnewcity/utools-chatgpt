import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPersist from 'pinia-plugin-persist'
import ElementPlus from 'element-plus'
import '@/assets/base.css'
import 'element-plus/dist/index.css'
const pinia = createPinia();
pinia.use(piniaPersist)

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(pinia);
app.mount("#app");
