<script setup lang="ts">
const handleClick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<template>
  <v-icon name="bi-arrow-up-circle-fill" scale="3" class="icon" @click="handleClick" />
</template>

<style scoped lang="scss">
.icon {
  fill: var(--orange-base);

  &:hover {
    @include cursor();
  }
}

@include middleScreen {
  .icon {
    display: none;
  }
}
</style>
