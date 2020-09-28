import { Directive } from "vue";

export const resizable: Directive<HTMLElement> = {
  created(el) {
    el.addEventListener("input", e => {
      const target = e.target as HTMLElement;

      target.style.height = "auto";
      target.style.height = `${target.scrollHeight}px`;
    });
  }
};
