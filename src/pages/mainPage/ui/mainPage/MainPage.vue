<script setup lang="ts">
import { DateTime } from 'luxon';
import { computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';

import type { IStoreSchema } from '@/app/store/store.types';

import { Basket } from '@/widgets/basket';
import { MyHeader } from '@/widgets/header';
import { LeftBar } from '@/widgets/leftBar';
import { MainContent } from '@/widgets/mainContent';

import MainLayouts from '@/shared/layouts/MainLayout.vue';

import type { TDistanceType } from '../..';
import { asteroidActions, asteroidMutations } from '../../model/store/asteroidModule';

const store = useStore<IStoreSchema>();

const isLoading = computed(() => store.state.asteroidResolve.isLoading);
const asteroids = computed(() => store.state.asteroidResolve.asteroids);
const distanceType = computed(() => store.state.asteroidResolve.distanceType);

const changeDistance = (distanceType: TDistanceType) => {
  store.commit(asteroidMutations.setDistanceType, distanceType);
};

onMounted(() => {
  store.dispatch(asteroidActions.getAsteroidListAction, {
    startDate: DateTime.now().toFormat('yyyy-LL-dd')
  });
});
</script>

<template>
  <div>
    <MyHeader />
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
        />
      </template>
      <template #rightBar>
        <Basket />
      </template>
    </MainLayouts>
  </div>
</template>
