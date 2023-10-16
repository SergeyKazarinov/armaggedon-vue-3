<template>
  <div>
    <MyHeader />
    <MainLayouts>
      <template #leftBar>
        <LeftBar />
      </template>
      <template #content>
        <AsteroidList />
      </template>
      <template #rightBar>
        <Basket />
      </template>
    </MainLayouts>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { MyHeader } from '@/widgets/header';
import { AsteroidList } from '@/widgets/asteroidList';
import { LeftBar } from '@/widgets/leftBar';
import MainLayouts from '@/shared/layouts/MainLayout.vue';
import Basket from '@/widgets/basket/ui/basket/Basket.vue';

export default defineComponent({
  setup() {
    return {};
  },

  components: {
    MyHeader,
    MainLayouts,
    LeftBar,
    AsteroidList,
    Basket
  }
});
</script>

<style scoped></style>
