<script setup lang="ts">
import type { ICloseApproachData, TDistanceType } from '@/pages/mainPage';

import Stack from '@/shared/ui/stack/Stack.vue';

import CloseApproachDataItem from '../closeApproachDataItem/CloseApproachDataItem.vue';

interface ICloseApproachDataListProps {
  closeApproachData: ICloseApproachData[];
  distanceType: TDistanceType;
}

const props = defineProps<ICloseApproachDataListProps>();
</script>

<template>
  <Stack :direction="'column'" :gap="24">
    <h3 class="title">Список всех сближений:</h3>
    <CloseApproachDataItem
      :distanceType="props.distanceType"
      v-for="item in props.closeApproachData"
      :closeApproachData="item"
      :key="item.close_approach_date_full"
    />
  </Stack>
</template>

<style scoped>
.title {
  font: var(--font-m);
  font-weight: 700;
}
</style>
