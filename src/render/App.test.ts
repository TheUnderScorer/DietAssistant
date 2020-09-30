import { shallowMount } from "@vue/test-utils";
import App from "@/render/App.vue";

describe("App.vue", () => {
  it("renders without crashing", () => {
    const wrapper = shallowMount(App, {});
    expect(wrapper).toBeDefined();
  });
});
