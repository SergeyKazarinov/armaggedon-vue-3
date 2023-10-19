<script setup lang="ts">
import type { IAsteroid, TDistanceType } from '@/pages/mainPage';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import type { IStoreSchema } from '@/app/store/store.types';
import { convertDate } from '@/shared/lib/helpers/convertDate';
import { getAsteroidName } from '@/shared/lib/helpers/getAsteroidName';
import { getDiameterAsteroid } from '@/shared/lib/helpers/getDiameterAsteroid';
import { getKmDistance } from '@/shared/lib/helpers/getKmDistance';
import { getPluralLunarDistance } from '@/shared/lib/helpers/getPluralLunarDistance';
import MyButton from '@/shared/ui/myButton/MyButton.vue';
import Stack from '@/shared/ui/stack/Stack.vue';

interface IAsteroidItemProps {
  asteroid: IAsteroid;
  distanceType: TDistanceType;
}

interface IAsteroidItemEmits {
  (e: 'addAsteroid', asteroid: IAsteroid): void;
  (e: 'removeAsteroid', asteroid: IAsteroid): void;
}
const props = defineProps<IAsteroidItemProps>();
const emit = defineEmits<IAsteroidItemEmits>();
const store = useStore<IStoreSchema>();
const router = useRouter();

const asteroidDate = convertDate(props.asteroid.close_approach_data[0].close_approach_date);
const asteroidName = getAsteroidName(props.asteroid.name);

const lunarDistance = getPluralLunarDistance(
  Number(props.asteroid.close_approach_data[0].miss_distance.lunar)
);

const kilometerDistance = getKmDistance(
  Number(props.asteroid.close_approach_data[0].miss_distance.kilometers)
);

const distance = computed(() =>
  props.distanceType === 'kilometer' ? kilometerDistance : lunarDistance
);

const diameterAsteroid = getDiameterAsteroid(
  props.asteroid.estimated_diameter.meters.estimated_diameter_min,
  props.asteroid.estimated_diameter.meters.estimated_diameter_max
);

const asteroidSizeClass = `asteroidSize-${diameterAsteroid > 100 ? 'm' : 's'}`;

const inBasket = computed(() =>
  store.state.basket.asteroids.find((item) => item.id === props.asteroid.id)
);

const handleClick = (e: Event) => {
  e.stopPropagation();
  if (!inBasket.value) {
    emit('addAsteroid', props.asteroid);
  } else {
    emit('removeAsteroid', props.asteroid);
  }
};
</script>

<template>
  <Stack :direction="'column'" class="item" @click="router.push(`/asteroids/${props.asteroid.id}`)">
    <h3 class="title">{{ asteroidDate }}</h3>
    <Stack :align="'center'">
      <Stack :direction="'column'" class="distance">
        <p>{{ distance }}</p>
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
      <MyButton :variant="'added'" @click="handleClick">{{
        inBasket ? 'В корзине' : 'Заказать'
      }}</MyButton>
      <p class="dangerous" v-if="asteroid.is_potentially_hazardous_asteroid">
        <span class="triangle">⚠</span>
        Опасен
      </p>
    </Stack>
  </Stack>
</template>

<style scoped lang="scss">
.item {
  border-radius: 16px;
  padding: 8px;
  &:hover {
    @include cursor();
    box-shadow: inset 0 0 10px 10px var(--orange-smooth);
  }
}
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
