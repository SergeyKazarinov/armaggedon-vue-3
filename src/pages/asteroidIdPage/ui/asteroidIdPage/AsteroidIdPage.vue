<script setup lang="ts">
import { type IAsteroid, type TDistanceType, asteroidMutations } from '@/pages/mainPage';
import { DateTime } from 'luxon';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import type { IStoreSchema } from '@/app/store/store.types';

import { DistanceSwitcher } from '@/features/distanceSwitcher';

import { CloseApproachDataList } from '@/entities/closeApproachData';

import { apiNeoInstance } from '@/shared/api/apiInstance';
import { convertDate } from '@/shared/lib/helpers/convertDate';
import { getAsteroidName } from '@/shared/lib/helpers/getAsteroidName';
import { getDiameterAsteroid } from '@/shared/lib/helpers/getDiameterAsteroid';
import { getKmDistance } from '@/shared/lib/helpers/getKmDistance';
import { getPluralLunarDistance } from '@/shared/lib/helpers/getPluralLunarDistance';
import Stack from '@/shared/ui/stack/Stack.vue';

const store = useStore<IStoreSchema>();
const route = useRoute();
const asteroid = ref<IAsteroid>();
const today = DateTime.now().toFormat('yyyy-LL-dd');

const distanceType = computed(() => store.state.asteroidResolve.distanceType);

const asteroidDateInfo = computed(() => {
  if (asteroid.value) {
    for (const obj of asteroid.value.close_approach_data) {
      if (obj.close_approach_date >= today) {
        const dateInterval = DateTime.fromISO(obj.close_approach_date)
          .diff(DateTime.now(), 'days')
          .toObject().days;

        return {
          asteroidDate: obj.close_approach_date,
          dateInterval: Math.floor(dateInterval!),
          closeApproachData: obj
        };
      }
    }
  }
  return null;
});

const changeDistance = (distanceType: TDistanceType) => {
  store.commit(asteroidMutations.setDistanceType, distanceType);
};

onMounted(async () => {
  const { asteroidId } = route.params;
  const resolve = await apiNeoInstance.get(`/${asteroidId}`);

  asteroid.value = resolve.data;
});
</script>

<template>
  <main class="main" v-if="asteroid">
    <Stack :direction="'column'" :gap="16">
      <h2 class="title">Ближайшие подлёты к Земле астероидов</h2>
      <div class="imageWrapper">
        <img class="img img_type_asteroid" src="@/shared/assets/asteroid.png" alt="Астероид" />
      </div>
      <DistanceSwitcher
        class="distanceSwitcher"
        :type="distanceType"
        @changeDistance="changeDistance"
      />
      <Stack :direction="'column'" :gap="0" class="titleContainer">
        <h3 class="date">
          {{ asteroidDateInfo?.asteroidDate && convertDate(asteroidDateInfo.asteroidDate) }}
        </h3>
        <p class="dateInterval">через {{ asteroidDateInfo?.dateInterval }} дней</p>
      </Stack>
      <p
        class="dangerous"
        :class="{ dangerous_active: asteroid.is_potentially_hazardous_asteroid }"
      >
        Опасно
      </p>
      <Stack :align="'center'">
        <div class="earthWrapper">
          <img class="img" src="@/shared/assets/earth.svg" alt="Планета Земля" />
        </div>
        <Stack :direction="'column'" class="distance">
          <p class="distance__text">
            {{
              distanceType === 'kilometer'
                ? getKmDistance(
                    Number(asteroidDateInfo?.closeApproachData.miss_distance.kilometers)
                  )
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
    </Stack>
  </main>
</template>

<style scoped lang="scss">
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
.main {
  padding: 16px;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.title,
.distanceSwitcher {
  z-index: 2;
}

.title {
  font: var(--font-l);
  font-weight: 700;
}

.imageWrapper {
  width: 328px;
  height: 355px;
  position: absolute;
  right: 0;
  top: 70px;
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;

  &_type_asteroid {
    animation: rotate 9s infinite linear;
  }
}

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
  transform: rotate(-13deg);

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
