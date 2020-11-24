import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import { IpcRendererService } from "@/render/services/IpcRendererService";
import { resizable } from "@/render/directives/resizable";
import { notSelectable } from "@/render/directives/notSelectable";
import "primeflex/primeflex.min.css";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/bootstrap4-dark-blue/theme.css";
import "primeicons/primeicons.css";
import ProgressSpinner from "primevue/progressspinner";
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import Dialog from "primevue/dialog";

const app = createApp(App as any)
  .use((app) => {
    app.mixin({
      beforeCreate() {
        this.$ipcSender = new IpcRendererService();
      },
    });
  })
  .directive("resizable", resizable)
  .directive("not-selectable", notSelectable);

app.component("ProgressSpinner", ProgressSpinner);
app.component("Button", Button);
app.component("Dialog", Dialog);
app.component("Toolbar", Toolbar);
app.mount("#app");
