<script setup lang="ts">
import { DateTime } from 'luxon';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

import type { IStoreSchema } from '@/app/store/store.types';
import MainLayouts from '@/shared/layouts/MainLayout.vue';
import { Basket, basketMutations } from '@/widgets/basket';
import { LeftBar } from '@/widgets/leftBar';
import { MainContent } from '@/widgets/mainContent';

import type { IAsteroid, TDistanceType } from '../..';
import { asteroidActions, asteroidMutations } from '../../model/store/asteroidModule';

const store = useStore<IStoreSchema>();

const isLoading = computed(() => store.state.asteroidResolve.isLoading);
const asteroids = computed(() => store.state.asteroidResolve.asteroids);
const distanceType = computed(() => store.state.asteroidResolve.distanceType);

const handleAddAsteroid = (asteroid: IAsteroid) => {
  store.commit(basketMutations.addAsteroid, asteroid);
};

const handleRemoveAsteroid = (asteroid: IAsteroid) => {
  store.commit(basketMutations.removeAsteroid, asteroid);
};

const changeDistance = (distanceType: TDistanceType) => {
  store.commit(asteroidMutations.setDistanceType, distanceType);
};

onMounted(() => {
  if (!store.state.asteroidResolve.inited) {
    store.dispatch(asteroidActions.getAsteroidListAction, {
      startDate: DateTime.now().toFormat('yyyy-LL-dd')
    });
  }
});
</script>

<template>
  <div>
    <MainLayouts>
      <template #leftBar>
        <LeftBar />
      </template>
      <template #content>
        <MainContent
          :isLoading="isLoading"
          :asteroids="asteroids"
          :distanceType="distanceType"
          @changeDistance="changeDistance"
          @addAsteroid="handleAddAsteroid"
          @removeAsteroid="handleRemoveAsteroid"
        />
      </template>
      <template #rightBar>
        <Basket />
      </template>
    </MainLayouts>
  </div>
</template>
