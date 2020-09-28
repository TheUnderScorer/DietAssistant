import { Directive } from "vue";

const resize = (el: HTMLElement) => {
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
};

export const resizable: Directive<HTMLElement> = {
  mounted(el) {
    resize(el);

    el.addEventListener("input", e => {
      const target = e.target as HTMLElement;

      resize(target);
    });
  }
};
