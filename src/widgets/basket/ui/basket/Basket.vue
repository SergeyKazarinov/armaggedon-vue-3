<template>
  <Stack :direction="'column'" :gap="32" :justify="'center'" class="basket">
    <Stack :direction="'column'" :gap="0">
      <h4 class="title">Корзина</h4>
      <p class="subtitle">2 астероида</p>
    </Stack>
    <MyButton :variant="'primary'">Отправить</MyButton>
  </Stack>
</template>

<script setup lang="ts">
import MyButton from '@/shared/ui/myButton/MyButton.vue';
import Stack from '@/shared/ui/stack/Stack.vue';
</script>

<style scoped lang="scss">
.basket {
  padding: 16px;
  background: var(--gray);
  border-radius: 24px;
}

.title {
  font: var(--font-s);
  font-weight: 700;
}

.subtitle {
  font: var(--font-s);
  font-weight: 400;
}

@include middleScreen {
  .basket {
    flex-direction: row;
    justify-content: space-between;
    border-radius: 0;
  }
}
</style>
