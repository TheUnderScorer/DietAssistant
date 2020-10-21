import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import { IpcRendererService } from "@/render/services/IpcRendererService";
import { resizable } from "@/render/directives/resizable";
import { notSelectable } from "@/render/directives/notSelectable";

createApp(App)
  .use((app) => {
    app.mixin({
      beforeCreate() {
        this.$ipcSender = new IpcRendererService();
      },
    });
  })
  .directive("resizable", resizable)
  .directive("not-selectable", notSelectable)
  .mount("#app");
