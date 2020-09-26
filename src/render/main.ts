import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { IpcRendererService } from "@/render/services/IpcRendererService";

createApp(App)
  .use(router)
  .use(app => {
    app.mixin({
      beforeCreate() {
        this.$ipcSender = new IpcRendererService();
      }
    });
  })
  .mount("#app");
