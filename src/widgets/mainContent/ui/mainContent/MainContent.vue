<script setup lang="ts">
import type { IAsteroid, TDistanceType } from '@/pages/mainPage';

import { AsteroidList } from '@/entities/asteroid';
import { DistanceSwitcher } from '@/features/distanceSwitcher';
import { vInterception } from '@/shared/lib/directives/vInterception';
import Spinner from '@/shared/ui/spinner/Spinner.vue';
import Stack from '@/shared/ui/stack/Stack.vue';

interface IAsteroidListProps {
  isLoading: boolean;
  isLoadingNextAsteroid: boolean;
  asteroids: IAsteroid[];
  distanceType: TDistanceType;
}

interface IAsteroidListEmits {
  (e: 'changeDistance', distanceType: TDistanceType): void;
  (e: 'addAsteroid', asteroid: IAsteroid): void;
  (e: 'removeAsteroid', asteroid: IAsteroid): void;
  (e: 'fetchNextAsteroids'): void;
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

const handleFetchNextAsteroids = () => {
  emit('fetchNextAsteroids');
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
    <Spinner v-if="props.isLoadingNextAsteroid" class="spinner" scale="2" />
    <div
      class="observer"
      v-if="props.asteroids.length"
      v-interception="{ callback: handleFetchNextAsteroids }"
    ></div>
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

.spinner {
  margin: 0 auto;
}
.observer {
  height: 50px;
}
</style>
