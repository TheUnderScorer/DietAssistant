<template>
  <component :is="wrapperComponent" :class="className" class="box-list-item">
    <div :class="{ fieldset: withInput }">
      <h4 v-if="!withInput && title" class="box-list-title">{{ title }}:</h4>
      <label
        :for="labelFor"
        v-if="withInput && title"
        class="box-list-title thin"
      >
        {{ title }}:
      </label>
      <span class="box-list-value" :class="valueClassName">
        <slot></slot>
      </span>
    </div>
  </component>
</template>

<script lang="ts">
export default {
  props: {
    title: String,
    withInput: Boolean,
    labelFor: String,
    wrapperComponent: {
      type: String,
      default: "li",
    },
    className: String,
    valueClassName: String,
  },
};
</script>

<style scoped lang="scss">
.box-list-title {
  font-weight: 900;
  margin: 0 5px 0 0;
  letter-spacing: 5px;
  font-size: 20px;
}

label.box-list-title {
  font-weight: 200;
}

li {
  list-style: none;

  > div {
    display: flex;
    align-items: baseline;
  }
}

.fieldset {
  display: flex;
  width: 100%;

  label {
    max-width: 50%;
  }

  input[type="text"] {
    width: 50%;
  }

  input {
    width: auto;
  }
}
</style>
