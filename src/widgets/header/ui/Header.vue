<template>
  <header class="header">
    <h1 class="title">ARMAGEDDON 2023</h1>
    <p class="subtitle">ООО “Команда им. Б. Уиллиса”. Взрываем астероиды с 1998 года.</p>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  }
});
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  max-width: 375px;
  width: 100%;
}

.title {
  font: var(--font-xl);
  color: var(--orange-base);
  font-weight: 700;
}

.subtitle {
  font: var(--font-s);
}
</style>
