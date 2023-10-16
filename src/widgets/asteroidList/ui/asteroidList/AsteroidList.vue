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
    <AsteroidItem :asteroid="'asteroid'" />
    <AsteroidItem :asteroid="'asteroid'" />
    <AsteroidItem :asteroid="'asteroid'" />
    <AsteroidItem :asteroid="'asteroid'" />
    <AsteroidItem :asteroid="'asteroid'" />
    <AsteroidItem :asteroid="'asteroid'" />
    <AsteroidItem :asteroid="'asteroid'" />
    <AsteroidItem :asteroid="'asteroid'" />
  </Stack>
</template>

<script setup lang="ts">
import Stack from '@/shared/ui/stack/Stack.vue';
import AsteroidItem from '../asteroidItem/AsteroidItem.vue';
</script>

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
