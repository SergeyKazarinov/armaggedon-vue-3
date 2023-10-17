<script setup lang="ts">
import Stack from '@/shared/ui/stack/Stack.vue';

interface IDistanceProps {
  type: 'kilometer' | 'luna';
}

const { type } = defineProps<IDistanceProps>();
</script>

<template>
  <Stack>
    <span class="distance" :class="{ active: type === 'kilometer' }">В километрах</span>
    |
    <span class="distance" :class="{ active: type === 'luna' }">В лунных орбитах</span>
  </Stack>
</template>

<style scoped lang="scss">
.distance {
  text-decoration: underline;

  &.active {
    font-weight: 700;
    text-decoration: none;
  }
}
</style>
