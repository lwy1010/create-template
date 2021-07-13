<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconHref" />
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
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
});
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
