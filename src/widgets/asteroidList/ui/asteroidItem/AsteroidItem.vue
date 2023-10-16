<template>
  <Stack :direction="'column'" class="item">
    <h3 class="title">12 сент 2023</h3>
    <Stack :align="'center'">
      <Stack :direction="'column'" class="distance">
        <p>3 лунные орбиты</p>
        <img src="@/shared/assets/arrow.svg" alt="Линия с двумя стрелками на концах" />
      </Stack>
      <div class="asteroidWrapper" :class="asteroidSizeClass">
        <img src="@/shared/assets/asteroid.png" alt="Астероид" class="img" />
      </div>
      <Stack :direction="'column'" :gap="0">
        <span class="name">2021 FQ</span>
        <span class="diameter">&oslash; 85 м</span>
      </Stack>
    </Stack>
    <Stack :gap="8" class="btns">
      <MyButton :variant="'added'">Заказать</MyButton>
      <p class="dangerous">
        <span class="triangle">⚠</span>
        Опасен
      </p>
    </Stack>
  </Stack>
</template>

<script setup lang="ts">
import Stack from '@/shared/ui/stack/Stack.vue';
import MyButton from '@/shared/ui/myButton/MyButton.vue';

type TAsteroidSize = 's' | 'm' | 'l';
interface IAsteroidItemProps {
  asteroid: any;
  asteroidSize?: TAsteroidSize;
}
const { asteroid, asteroidSize = 's' } = defineProps<IAsteroidItemProps>();

const asteroidSizeClass = `asteroidSize-${asteroidSize}`;
</script>

<style scoped lang="scss">
.title {
  font: var(--font-m);
  font-weight: 700;
}

.name {
  text-decoration: underline;
}

.dangerous {
  color: var(--gray-30);

  .triangle {
    color: var(--orange-base);
  }
}

.asteroidSize-s {
  width: 22px;
  height: 24px;
}

.asteroidSize-m {
  width: 37px;
  height: 40px;
}

.img {
  width: 100%;
  height: 100%;
}
</style>
