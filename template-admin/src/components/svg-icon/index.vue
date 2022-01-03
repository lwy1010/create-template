<template>
  <svg aria-hidden="true" class="fill-dark-800 svg-icon">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  name: {
    type: String,
    required: true,
  },
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>
