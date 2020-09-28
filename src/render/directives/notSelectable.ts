import { Directive } from "vue";

export const notSelectable: Directive<HTMLElement> = {
  mounted(el) {
    el.classList.add("not-selectable");
  }
};
