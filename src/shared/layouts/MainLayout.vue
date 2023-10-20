<script setup lang="ts"></script>

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

<style scoped lang="scss">
.main {
  display: grid;
  grid-template-areas: 'leftBar content rightBar';
  grid-template-columns: 1fr minmax(min-content, 402px) 1fr;
  height: 100%;
  width: 100%;
}

.leftBar {
  grid-area: leftBar;
}

.content {
  grid-area: content;
  /* max-width: 402px; */
  margin: 0 auto;
}

.rightBar {
  grid-area: rightBar;
  margin-right: auto;
}

.leftBar,
.rightBar {
  position: sticky;
  top: 0;
  height: 100vh;
}

@include middleScreen {
  .main {
    grid-template-areas: 'leftBar content';
    grid-template-columns: 1fr minmax(279px, 402px);
  }

  .rightBar {
    $max-height: 78px;
    position: fixed;
    width: 100%;
    max-height: $max-height;
    top: calc(100% - $max-height);
  }
}
</style>
