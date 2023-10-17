<script setup lang="ts"></script>

<template>
  <div class="leftBar">
    <img src="@/shared/assets/planet.jpeg" alt="Планета земля" class="img" />
  </div>
</template>

<style scoped lang="scss">
.leftBar {
  height: 620px;
  width: 536px;
  margin-left: -136px;
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

@include largeScreen {
  .leftBar {
    width: 377px;
    height: 436px;
    margin-left: -73px;
  }
}

@include middleScreen {
  .leftBar {
    margin-left: -290px;
  }
}
</style>
