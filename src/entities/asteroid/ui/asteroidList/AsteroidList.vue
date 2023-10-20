<script setup lang="ts">
import type { IAsteroid, TDistanceType } from '@/pages/mainPage';

import Spinner from '@/shared/ui/spinner/Spinner.vue';
import Stack from '@/shared/ui/stack/Stack.vue';

import AsteroidItem from '../asteroidItem/AsteroidItem.vue';

interface IAsteroidListProps {
  isLoading: boolean;
  asteroids: IAsteroid[];
  distanceType: TDistanceType;
}

interface IAsteroidListEmits {
  (e: 'addAsteroid', asteroid: IAsteroid): void;
  (e: 'removeAsteroid', asteroid: IAsteroid): void;
}

const props = defineProps<IAsteroidListProps>();
const emit = defineEmits<IAsteroidListEmits>();

const handleAddAsteroid = (asteroid: IAsteroid) => {
  emit('addAsteroid', asteroid);
};

const handleRemoveAsteroid = (asteroid: IAsteroid) => {
  emit('removeAsteroid', asteroid);
};
</script>

<template>
  <Spinner class="spinner" v-if="isLoading" scale="4" />
  <Stack v-else :direction="'column'" :gap="24">
    <AsteroidItem
      v-for="asteroid in props.asteroids"
      @addAsteroid="handleAddAsteroid"
      @removeAsteroid="handleRemoveAsteroid"
      :asteroid="asteroid"
      :key="asteroid.id"
      :distanceType="props.distanceType"
    />
  </Stack>
</template>

<style scoped lang="scss">
.spinner {
  margin: 0 auto;
}
</style>
