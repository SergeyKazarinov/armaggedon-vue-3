<script setup lang="ts">
import { DateTime } from 'luxon';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

import type { IStoreSchema } from '@/app/store/store.types';
import { ScrollToTopButton } from '@/features/scrollToTopButom';
import MainLayouts from '@/shared/layouts/MainLayout.vue';
import Stack from '@/shared/ui/stack/Stack.vue';
import { Basket, basketMutations } from '@/widgets/basket';
import { LeftBar } from '@/widgets/leftBar';
import { MainContent } from '@/widgets/mainContent';

import type { IAsteroid, TDistanceType } from '../..';
import { asteroidActions, asteroidMutations } from '../../model/store/asteroidModule';

const store = useStore<IStoreSchema>();

const isLoading = computed(() => store.state.asteroidResolve.isLoading);
const isLoadingNextAsteroid = computed(() => store.state.asteroidResolve.isLoadingNextAsteroid);
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

const handleFetchNextAsteroids = () => {
  store.dispatch(asteroidActions.getNextAsteroidsAction);
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
          :isLoadingNextAsteroid="isLoadingNextAsteroid"
          :asteroids="asteroids"
          :distanceType="distanceType"
          @changeDistance="changeDistance"
          @addAsteroid="handleAddAsteroid"
          @removeAsteroid="handleRemoveAsteroid"
          @fetch-next-asteroids="handleFetchNextAsteroids"
        />
      </template>
      <template #rightBar>
        <Stack :direction="'column'" :justify="'between'" style="height: 100%">
          <Basket />
          <ScrollToTopButton />
        </Stack>
      </template>
    </MainLayouts>
  </div>
</template>
