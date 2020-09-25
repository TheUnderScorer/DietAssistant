import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { IpcSenderService } from "@/render/services/IpcSenderService";

const data = {
  ipcSender: new IpcSenderService()
};

createApp(App, {
  data() {
    return data;
  }
})
  .use(router)
  .mount("#app");
