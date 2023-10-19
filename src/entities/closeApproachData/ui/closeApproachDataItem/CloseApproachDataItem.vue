<script setup lang="ts">
import type { ICloseApproachData, TDistanceType } from '@/pages/mainPage';

import { convertDate } from '@/shared/lib/helpers/convertDate';
import { getKmDistance } from '@/shared/lib/helpers/getKmDistance';
import { getPluralLunarDistance } from '@/shared/lib/helpers/getPluralLunarDistance';
import Stack from '@/shared/ui/stack/Stack.vue';
import TextDescription from '@/shared/ui/textDescription/textDescription.vue';

interface ICloseApproachDataItemProps {
  closeApproachData: ICloseApproachData;
  distanceType: TDistanceType;
}

const props = defineProps<ICloseApproachDataItemProps>();

const date = `${convertDate(
  props.closeApproachData.close_approach_date
)} ${props.closeApproachData.close_approach_date_full.slice(-6)}`;
</script>

<template>
  <Stack :direction="'column'">
    <h4 class="date">{{ date }}</h4>
    <TextDescription
      :boldText="'Скорость относительно Земли: '"
      :normalText="`${Number(
        props.closeApproachData.relative_velocity.kilometers_per_second
      ).toFixed(2)} км/с`"
    />

    <TextDescription
      :boldText="'Расстояние до земли: '"
      :normalText="
        distanceType === 'kilometer'
          ? getKmDistance(Number(props.closeApproachData.miss_distance.kilometers))
          : getPluralLunarDistance(Number(props.closeApproachData.miss_distance.lunar))
      "
    />
    <TextDescription
      :boldText="'Летит вокруг орбиты: '"
      :normalText="props.closeApproachData.orbiting_body"
    />
  </Stack>
</template>

<style scoped>
.date {
  font: var(--font-m);
  font-weight: 700;
}
</style>
