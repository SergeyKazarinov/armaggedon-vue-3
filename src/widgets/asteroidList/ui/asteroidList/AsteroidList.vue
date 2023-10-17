<script setup lang="ts">
import type { IAsteroid } from '@/pages/mainPage';

import Stack from '@/shared/ui/stack/Stack.vue';

import AsteroidItem from '../asteroidItem/AsteroidItem.vue';

interface IAsteroidListProps {
  isLoading: boolean;
  asteroids: IAsteroid[];
}

const { asteroids, isLoading } = defineProps<IAsteroidListProps>();
const ruOrdinalRules = new Intl.PluralRules('ru');
</script>

<template>
  <Stack :direction="'column'" :gap="24" class="container">
    <Stack :direction="'column'">
      <h2 class="title">Ближайшие подлёты астероидов</h2>
      <div class="distanceSwitcher">
        <span>В километрах</span>
        |
        <span>В лунных орбитах</span>
      </div>
    </Stack>
    <div v-if="isLoading">Загрузка...</div>
    <Stack v-else :direction="'column'" :gap="24">
      <AsteroidItem v-for="asteroid in asteroids" :asteroid="asteroid" :key="asteroid.id" />
    </Stack>
  </Stack>
</template>

<style scoped>
.container {
  max-width: 402px;
}
.title {
  font: var(--font-l);
  font-weight: 700;
}

.distanceSwitcher {
  display: flex;
}
</style>
@/shared/lib/getPluralLunarDistance
