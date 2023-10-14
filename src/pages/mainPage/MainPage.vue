<template>
  <div>
    <MyHeader />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { MyHeader } from '@/widgets/header';

export default defineComponent({
  setup() {
    return {};
  },

  components: {
    MyHeader
  }
});
</script>

<style scoped></style>
