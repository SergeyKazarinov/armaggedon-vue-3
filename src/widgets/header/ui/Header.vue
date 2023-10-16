<template>
  <header class="header">
    <h1 class="title">ARMAGEDDON 2023</h1>
    <div class="subtitle">
      <span> ООО “Команда им. Б. Уиллиса”. </span>
      <span>Взрываем астероиды с 1998 года.</span>
    </div>
  </header>
</template>

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
  display: flex;
  flex-direction: column;
}
</style>
