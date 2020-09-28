import { ref, UnwrapRef } from "vue";

export const useRef = <T>(def?: T) => {
  const refValue = ref<T | undefined>(def);
  const setRef = (newValue?: T) => {
    refValue.value = newValue as UnwrapRef<T>;
  };

  return [refValue, setRef];
};
