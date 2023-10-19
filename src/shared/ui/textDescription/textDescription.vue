<script setup lang="ts">
import Stack from '../stack/Stack.vue';

interface ITextDescriptionProps {
  boldText?: string;
  normalText?: string;
}

const props = defineProps<ITextDescriptionProps>();
</script>

<template>
  <Stack>
    <p class="bold">{{ props.boldText }}</p>
    <p class="normal">{{ props.normalText }}</p>
  </Stack>
</template>

<style scoped>
.bold {
  font-weight: 700;
}

.normal {
  font-weight: 400;
}
</style>
