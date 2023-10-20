<script setup lang="ts">
import { type IAsteroid, type TDistanceType, asteroidMutations } from '@/pages/mainPage';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import type { IStoreSchema } from '@/app/store/store.types';
import { DistanceSwitcher } from '@/features/distanceSwitcher';
import { apiNeoInstance } from '@/shared/api/apiInstance';
import Stack from '@/shared/ui/stack/Stack.vue';

import AsteroidIdInfo from '../asteroidIdInfo/AsteroidIdInfo.vue';

const store = useStore<IStoreSchema>();
const route = useRoute();
const asteroid = ref<IAsteroid>();

const distanceType = computed(() => store.state.asteroidResolve.distanceType);

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
      <AsteroidIdInfo :asteroid="asteroid" />
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
</style>
