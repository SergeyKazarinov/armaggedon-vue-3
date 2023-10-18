<script setup lang="ts">
type TVariantButton = 'primary' | 'secondary' | 'added';

interface IButtonProps {
  variant?: TVariantButton;
}

const { variant = 'primary' } = defineProps<IButtonProps>();
const classes = [variant];
</script>

<template>
  <button :class="classes">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
@mixin orangeBase {
  background: var(--orange-base);
  color: var(--white-base);
}

.primary {
  padding: 8px 16px;
  height: 48px;
  @include orangeBase();
  border-radius: 40px;

  &:hover {
    @include cursor();
  }
}

.secondary,
.added {
  padding: 2px 11px;
  border-radius: 16px;
  background: var(--orange-smooth);
  color: var(--orange-base);

  &:hover {
    @include orangeBase();
    @include cursor();
  }
}

.added {
  color: var(--red-smooth);
}
</style>
