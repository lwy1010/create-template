<template>
  <svg class="svg-icon fill-current overflow-hidden" aria-hidden="true">
    <use :xlink:href="iconHref" />
  </svg>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

const props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
});

const iconHref = computed(() => `#icon-${props.iconName}`);
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
}
</style>
