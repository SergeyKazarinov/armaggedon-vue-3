<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

import type { IStoreSchema } from '@/app/store/store.types';
import { getPluralAsteroids } from '@/shared/lib/helpers/getPluralAsteroids';
import MyButton from '@/shared/ui/myButton/MyButton.vue';
import Stack from '@/shared/ui/stack/Stack.vue';

const store = useStore<IStoreSchema>();

const asteroidLength = computed(() => getPluralAsteroids(store.state.basket.asteroids.length));
</script>

<template>
  <Stack :direction="'column'" :gap="32" :justify="'center'" class="basket">
    <Stack :direction="'column'" :gap="0">
      <h4 class="title">Корзина</h4>
      <p class="subtitle">{{ asteroidLength }}</p>
    </Stack>
    <MyButton :variant="'primary'">Отправить</MyButton>
  </Stack>
</template>

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
