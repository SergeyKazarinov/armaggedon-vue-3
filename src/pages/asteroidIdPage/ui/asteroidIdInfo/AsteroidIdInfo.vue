<script setup lang="ts">
import type { IAsteroid } from '@/pages/mainPage';
import { DateTime } from 'luxon';
import { computed } from 'vue';
import { useStore } from 'vuex';

import type { IStoreSchema } from '@/app/store/store.types';
import { CloseApproachDataList } from '@/entities/closeApproachData';
import { convertDate } from '@/shared/lib/helpers/convertDate';
import { getAsteroidName } from '@/shared/lib/helpers/getAsteroidName';
import { getDiameterAsteroid } from '@/shared/lib/helpers/getDiameterAsteroid';
import { getKmDistance } from '@/shared/lib/helpers/getKmDistance';
import { getPluralLunarDistance } from '@/shared/lib/helpers/getPluralLunarDistance';
import Stack from '@/shared/ui/stack/Stack.vue';

import { getAsteroidDateInfo } from '../../helpers/getAsteroidDateInfo';

interface IAsteroidIdInfoProps {
  asteroid: IAsteroid;
}

const { asteroid } = defineProps<IAsteroidIdInfoProps>();
const store = useStore<IStoreSchema>();

const today = DateTime.now().toFormat('yyyy-LL-dd');

const asteroidDateInfo = computed(() => {
  if (asteroid) {
    return getAsteroidDateInfo(asteroid, today);
  }
  return undefined;
});

const distanceType = computed(() => store.state.asteroidResolve.distanceType);
</script>

<template>
  <Stack :direction="'column'" :gap="0" class="titleContainer">
    <h3 class="date">
      {{
        asteroidDateInfo?.closeApproachData.close_approach_date &&
        convertDate(asteroidDateInfo.closeApproachData.close_approach_date)
      }}
    </h3>
    <p class="dateInterval">
      {{
        asteroidDateInfo?.dateInterval === 0
          ? 'Сегодня'
          : `через ${asteroidDateInfo?.dateInterval} дней`
      }}
    </p>
  </Stack>
  <p class="dangerous" :class="{ dangerous_active: asteroid.is_potentially_hazardous_asteroid }">
    Опасно
  </p>
  <Stack :align="'start'">
    <div class="earthWrapper">
      <img class="img" src="@/shared/assets/earth.svg" alt="Планета Земля" />
    </div>
    <Stack :direction="'column'" class="distance">
      <p class="distance__text">
        {{
          distanceType === 'kilometer'
            ? getKmDistance(Number(asteroidDateInfo?.closeApproachData.miss_distance.kilometers))
            : getPluralLunarDistance(
                Number(asteroidDateInfo?.closeApproachData.miss_distance.lunar)
              )
        }}
      </p>
      <div class="distance__arrow">
        <img
          class="distance__arrowImage"
          src="@/shared/assets/arrow.svg"
          alt="Линия с двумя стрелками на концах"
        />
      </div>
    </Stack>
  </Stack>
  <Stack :direction="'column'" :align="'end'" class="asteroidContainer">
    <p class="name">Астероид {{ getAsteroidName(asteroid.name) }}</p>
    <span class="diameter"
      >&oslash;
      {{
        getDiameterAsteroid(
          asteroid?.estimated_diameter.meters.estimated_diameter_min,
          asteroid?.estimated_diameter.meters.estimated_diameter_max
        )
      }}
      м</span
    >
  </Stack>
  <CloseApproachDataList
    :closeApproachData="asteroid.close_approach_data"
    :distanceType="distanceType"
  />
</template>

<style scoped lang="scss">
.titleContainer {
  margin-top: 32px;
}
.date {
  font: var(--font-m);
  font-weight: 700;
  z-index: 2;
}

.dateInterval {
  font: var(--font-s);
}

.dangerous {
  padding: 8px 16px;
  background: var(--red-base);
  border-radius: 8px;
  opacity: 0;

  &_active {
    opacity: 1;
  }
}

.earthWrapper {
  margin-top: 56px;
  width: 102px;
  height: 102px;
}

.distance {
  transform: rotate(-14deg);

  &__text {
    margin: 0 auto;
  }

  &__arrow {
    width: 300px;
  }

  &__arrowImage {
    width: 100%;
  }
}

.asteroidContainer {
  align-self: end;
}
.name {
  font: var(--font-s);
  color: var(--blue-base);
}
</style>
