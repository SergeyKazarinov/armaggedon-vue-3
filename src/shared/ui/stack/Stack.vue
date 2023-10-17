<script lang="ts">
export default defineComponent({
  name: 'MyStack'
});
</script>

<script setup lang="ts">
import { defineComponent } from 'vue';

type TDirection = 'row' | 'column';
type TGap = 0 | 4 | 8 | 16 | 24 | 32;
type TJustify = 'start' | 'end' | 'center' | 'between';
type TAlign = 'start' | 'center' | 'end';

interface IStackProps {
  direction?: TDirection;
  gap?: TGap;
  justify?: TJustify;
  align?: TAlign;
}
const {
  direction = 'row',
  gap = 8,
  justify = 'start',
  align = 'start'
} = defineProps<IStackProps>();

const gapClass = `gap-${gap}`;
const directionClass = direction;
const justifyClass = `justify-${justify}`;
const alignClass = `align-${align}`;
</script>

<template>
  <div class="stack" :class="[gapClass, directionClass, justifyClass, alignClass]">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
$gaps: (
  4: 4px,
  8: 8px,
  16: 16px,
  24: 24px,
  32: 32px
);

$justify: (
  'justify-start': 'start',
  'justify-center': 'center',
  'justify-end': 'center',
  'justify-between': 'space-between'
);

$align: (
  'align-start': 'start',
  'align-center': 'center',
  'align-end': 'end'
);
.stack {
  display: flex;
}

.row {
  flex-direction: row;
}

.column {
  flex-direction: column;
}

@each $name, $gap in $gaps {
  .gap-#{$name} {
    gap: #{$gap};
  }
}

@each $name, $property in $justify {
  .#{$name} {
    justify-content: #{$property};
  }
}

@each $name, $property in $align {
  .#{$name} {
    align-items: #{$property};
  }
}
</style>
