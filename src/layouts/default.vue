<template>
  <main class="apartments-layout">
    <slot />

    <button-component
      v-if="show"
      class="scroll-button"
      :icon="'i-mdi-arrow-up'"
      :rounded="true"
      :bg-color="'var(--second-green)'"
      :color="'var(--main-white)'"
      @click="handleScrollTop"
    />
  </main>
</template>

<script setup lang="ts">
import buttonComponent from '@/shared/ui/button/buttonComponent.vue'

import { useScrollButton } from '@/shared/lib/useScrollButton'

const { show, handleScrollTop } = useScrollButton(50)
</script>

<style scoped lang="scss">
.apartments-layout {
  min-height: 100svh;
  width: 100svw;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-y: auto;
}

.scroll-button {
  width: 40px;
  height: 40px;
  position: fixed;
  right: 32px;
  bottom: 32px;
  z-index: 1000;

  &:active {
    background-color: var(--main-green) !important;
  }
}
</style>
