<script setup lang="ts">
import { computed } from "vue";

interface Props {
  prefix?: string;
  name: string;
}

const props = withDefaults(defineProps<Props>(), {
  prefix: "icon",
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<template>
  <svg aria-hidden="true" class="fill-dark-800 svg-icon">
    <use :xlink:href="symbolId" />
  </svg>
</template>
