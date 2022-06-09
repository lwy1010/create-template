<template>
  <svg aria-hidden="true" class="fill-dark-800 svg-icon">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  prefix?: string;
  name: string;
}

defineOptions({ name: "Breadcrumb" });

const props = withDefaults(defineProps<Props>(), {
  prefix: "icon",
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>
