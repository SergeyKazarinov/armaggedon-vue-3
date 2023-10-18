<script setup lang="ts">
import { AsteroidList } from '@/enteties/asteroid';
import type { IAsteroid, TDistanceType } from '@/pages/mainPage';
import { computed, watch } from 'vue';

import { DistanceSwitcher } from '@/features/distanceSwitcher';

import Stack from '@/shared/ui/stack/Stack.vue';

interface IAsteroidListProps {
  isLoading: boolean;
  asteroids: IAsteroid[];
  distanceType: TDistanceType;
}

interface IAsteroidListEmits {
  (e: 'changeDistance', distanceType: TDistanceType): void;
  (e: 'addAsteroid', asteroid: IAsteroid): void;
  (e: 'removeAsteroid', asteroid: IAsteroid): void;
}

const emit = defineEmits<IAsteroidListEmits>();

const props = defineProps<IAsteroidListProps>();

const changeDistance = (distanceType: TDistanceType) => {
  emit('changeDistance', distanceType);
};

const handleAddAsteroid = (asteroid: IAsteroid) => {
  emit('addAsteroid', asteroid);
};

const handleRemoveAsteroid = (asteroid: IAsteroid) => {
  emit('removeAsteroid', asteroid);
};
</script>

<template>
  <Stack :direction="'column'" :gap="24" class="container">
    <Stack :direction="'column'">
      <h2 class="title">Ближайшие подлёты астероидов</h2>
      <DistanceSwitcher :type="props.distanceType" @changeDistance="changeDistance" />
    </Stack>
    <AsteroidList
      @addAsteroid="handleAddAsteroid"
      @removeAsteroid="handleRemoveAsteroid"
      :isLoading="props.isLoading"
      :asteroids="props.asteroids"
      :distanceType="props.distanceType"
    />
  </Stack>
</template>

<style scoped lang="scss">
.container {
  max-width: 402px;
}

.title {
  font: var(--font-l);
  font-weight: 700;
}
</style>
