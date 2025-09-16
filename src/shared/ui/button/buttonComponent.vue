<template>
  <button
    class="button"
    :class="[{ 'button--rounded': rounded }]"
    :style="style"
  >
    <Icon
      v-if="icon"
      :name="icon"
      class="button__icon"
    />

    <span v-else class="button-title">
      {{ title }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'

const props = defineProps<{
  title?: string
  color?: string
  icon?: string
  rounded?: boolean,
  bgColor?: string
}>()

const style = computed<CSSProperties>(() => ({
  color: props.color,
  background: props.bgColor ?? '#FFFFFF'
}))
</script>

<style scoped>
.button {
  cursor: pointer;
  transition: opacity 0.2s;
}

.button--rounded {
  border-radius: 50%;
}

.button__icon {
  width: 1.25em;
  height: 1.25em;
}
</style>