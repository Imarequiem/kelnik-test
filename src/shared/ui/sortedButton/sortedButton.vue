<template>
  <div class="sorted-button" @click="toggleSort">
    <span :style="{ color: direction ? activeColor : 'inherit' }">
      {{ label }}
    </span>

    <div class="arrows">
      <Icon
        name="material-symbols:keyboard-arrow-up"
        style="position: relative; top: 3px;"
        :style="{ fontSize: iconSize, color: direction === 'asc' ? activeColor : '#0B173933' }"
      />

      <Icon
        name="material-symbols:keyboard-arrow-down"
        style="position: relative; bottom: 3px;"
        :style="{ fontSize: iconSize, color: direction === 'desc' ? activeColor : '#0B173933' }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { sortDirectionType } from '@/shared/types/sortDirectionType'

const props = defineProps<{
  label: string
  sortKey: string
  direction?: sortDirectionType | ''
  activeColor?: string
  iconSize?: string
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()

const toggleSort = (): void => emit('toggle')

const activeColor = props.activeColor ?? 'var(--main-green)'
const iconSize = props.iconSize ?? '14px'
const direction = computed(() => props.direction ?? '')
</script>

<style scoped lang="scss">
.sorted-button {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.arrows {
  display: flex;
  flex-direction: column;

  &__arrow-up {
    position: relative;
    top: 2px;
  }

  &__arrow-down {
    position: relative;
    bottom: 2px;
  }
}

</style>
