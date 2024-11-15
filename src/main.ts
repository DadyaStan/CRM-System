import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import Antd from "ant-design-vue";

const pinia = createPinia();

createApp(App).use(router).use(pinia).use(Antd).mount("#app");
