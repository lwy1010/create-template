<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconHref" />
  </svg>
</template>

<script>
import { computed } from "vue";
export default {
  name: "SvgIcon",
  props: {
    iconName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return { iconHref: computed(() => `#icon-${props.iconName}`) };
  },
};
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
