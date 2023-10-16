<template>
  <div class="leftBar">
    <img src="@/shared/assets/planet.jpeg" alt="Планета земля" class="img" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {};
  }
});
</script>

<style scoped>
.leftBar {
  height: 620px;
  width: 536px;
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  margin-left: -136px;
}
</style>
