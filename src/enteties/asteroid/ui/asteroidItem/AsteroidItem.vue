<script setup lang="ts">
import type { IAsteroid } from '@/pages/mainPage';

import { convertDate } from '@/shared/lib/convertDate';
import { getAsteroidName } from '@/shared/lib/getAsteroidName';
import { getDiameterAsteroid } from '@/shared/lib/getDiameterAsteroid';
import { getPluralLunarDistance } from '@/shared/lib/getPluralLunarDistance';
import MyButton from '@/shared/ui/myButton/MyButton.vue';
import Stack from '@/shared/ui/stack/Stack.vue';

type TAsteroidSize = 's' | 'm' | 'l';
interface IAsteroidItemProps {
  asteroid: IAsteroid;
  asteroidSize?: TAsteroidSize;
}
const { asteroid, asteroidSize = 's' } = defineProps<IAsteroidItemProps>();

const asteroidDate = convertDate(asteroid.close_approach_data[0].close_approach_date);
const asteroidName = getAsteroidName(asteroid.name);

const asteroidSizeClass = `asteroidSize-${asteroidSize}`;

const lunarDistance = getPluralLunarDistance(
  Math.floor(Number(asteroid.close_approach_data[0].miss_distance.lunar))
);

const diameterAsteroid = getDiameterAsteroid(
  asteroid.estimated_diameter.meters.estimated_diameter_min,
  asteroid.estimated_diameter.meters.estimated_diameter_max
);
</script>

<template>
  <Stack :direction="'column'" class="item">
    <h3 class="title">{{ asteroidDate }}</h3>
    <Stack :align="'center'">
      <Stack :direction="'column'" class="distance">
        <p>{{ lunarDistance }}</p>
        <img src="@/shared/assets/arrow.svg" alt="Линия с двумя стрелками на концах" />
      </Stack>
      <div class="asteroidWrapper" :class="asteroidSizeClass">
        <img src="@/shared/assets/asteroid.png" alt="Астероид" class="img" />
      </div>
      <Stack :direction="'column'" :gap="0">
        <span class="name">{{ asteroidName }}</span>
        <span class="diameter">&oslash; {{ diameterAsteroid }} м</span>
      </Stack>
    </Stack>
    <Stack :gap="8" class="btns">
      <MyButton :variant="'added'">Заказать</MyButton>
      <p class="dangerous" v-if="asteroid.is_potentially_hazardous_asteroid">
        <span class="triangle">⚠</span>
        Опасен
      </p>
    </Stack>
  </Stack>
</template>

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
@/shared/lib/getPluralLunarDistance @/shared/lib/getPluralLunarDistance
