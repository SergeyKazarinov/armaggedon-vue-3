<script setup lang="ts">
import type { TDistanceType } from '@/pages/mainPage';

import Stack from '@/shared/ui/stack/Stack.vue';

interface IDistanceProps {
  type: TDistanceType;
}

interface IDistanceEmits {
  (e: 'changeDistance', distanceType: TDistanceType): void;
}

const emit = defineEmits<IDistanceEmits>();

const { type } = defineProps<IDistanceProps>();

const changeDistance = (distanceType: TDistanceType) => {
  emit('changeDistance', distanceType);
};
</script>

<template>
  <Stack>
    <div
      @click="changeDistance('kilometer')"
      class="distance"
      :class="{ active: type === 'kilometer' }"
    >
      В километрах
    </div>
    |
    <div @click="changeDistance('luna')" class="distance" :class="{ active: type === 'luna' }">
      В лунных орбитах
    </div>
  </Stack>
</template>

<style scoped lang="scss">
.distance {
  text-decoration: underline;

  &:hover {
    @include cursor();
  }

  &.active {
    font-weight: 700;
    text-decoration: none;
  }
}
</style>
