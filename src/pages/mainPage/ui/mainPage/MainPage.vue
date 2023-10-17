<script setup lang="ts">
import { DateTime } from 'luxon';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

import type { IStoreSchema } from '@/app/store/store.types';

import { AsteroidList } from '@/widgets/asteroidList';
import { Basket } from '@/widgets/basket';
import { MyHeader } from '@/widgets/header';
import { LeftBar } from '@/widgets/leftBar';

import MainLayouts from '@/shared/layouts/MainLayout.vue';

import { asteroidActions } from '../../model/store/asteroidModule';

const store = useStore<IStoreSchema>();

const value = computed(() => store.state.asteroidResolve.data.near_earth_objects);
const isLoading = computed(() => store.state.asteroidResolve.isLoading);
const asteroids = computed(() => store.state.asteroidResolve.asteroids);

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
        <AsteroidList :isLoading="isLoading" :asteroids="asteroids" />
      </template>
      <template #rightBar>
        <Basket />
      </template>
    </MainLayouts>
  </div>
</template>
