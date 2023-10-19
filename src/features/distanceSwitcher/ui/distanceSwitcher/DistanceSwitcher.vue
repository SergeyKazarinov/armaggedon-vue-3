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
  <Stack :direction="'column'" :gap="4">
    <p>Отображать расстояние:</p>
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
