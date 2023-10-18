<script setup lang="ts">
import type { IAsteroid, TDistanceType } from '@/pages/mainPage';

import Stack from '@/shared/ui/stack/Stack.vue';

import AsteroidItem from '../asteroidItem/AsteroidItem.vue';

interface IAsteroidListProps {
  isLoading: boolean;
  asteroids: IAsteroid[];
  distanceType: TDistanceType;
}

const props = defineProps<IAsteroidListProps>();
</script>

<template>
  <div v-if="isLoading">Загрузка...</div>
  <Stack v-else :direction="'column'" :gap="24">
    <AsteroidItem
      v-for="asteroid in props.asteroids"
      :asteroid="asteroid"
      :key="asteroid.id"
      :distanceType="props.distanceType"
    />
  </Stack>
</template>

<style scoped lang="scss"></style>
