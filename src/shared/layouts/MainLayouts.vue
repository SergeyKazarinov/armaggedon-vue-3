<template>
  <main class="main">
    <div class="leftBar">
      <slot name="leftBar"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <div class="rightBar">
      <slot name="rightBar"></slot>
    </div>
  </main>
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
.main {
  display: grid;
  grid-template-areas:
    'header header header'
    'leftBar content rightBar';
}
.header {
}
</style>
