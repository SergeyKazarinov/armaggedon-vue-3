<script setup lang="ts">
import { AsteroidList } from '@/enteties/asteroid';
import type { IAsteroid } from '@/pages/mainPage';

import { DistanceSwitcher } from '@/features/distanceSwitcher';

import Stack from '@/shared/ui/stack/Stack.vue';

interface IAsteroidListProps {
  isLoading: boolean;
  asteroids: IAsteroid[];
}

const { asteroids, isLoading } = defineProps<IAsteroidListProps>();
</script>

<template>
  <Stack :direction="'column'" :gap="24" class="container">
    <Stack :direction="'column'">
      <h2 class="title">Ближайшие подлёты астероидов</h2>
      <DistanceSwitcher :type="'kilometer'" />
    </Stack>
    <AsteroidList :isLoading="isLoading" :asteroids="asteroids" />
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
