<script setup lang="ts">
import type { IAsteroid } from '@/pages/mainPage';

import Stack from '@/shared/ui/stack/Stack.vue';

import AsteroidItem from '../asteroidItem/AsteroidItem.vue';

interface IAsteroidListProps {
  isLoading: boolean;
  asteroids: IAsteroid[];
}

const { asteroids, isLoading } = defineProps<IAsteroidListProps>();
</script>

<template>
  <div v-if="isLoading">Загрузка...</div>
  <Stack v-else :direction="'column'" :gap="24">
    <AsteroidItem v-for="asteroid in asteroids" :asteroid="asteroid" :key="asteroid.id" />
  </Stack>
</template>

<style scoped lang="scss"></style>
