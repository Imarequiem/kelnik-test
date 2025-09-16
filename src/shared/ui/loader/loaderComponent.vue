<template>
  <div class="loader">
    <div v-if="isLoading">
      <p>{{ titleLoading }}</p>
    </div>

    <div v-else-if="isError">
      <p>{{ titleError }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isLoading?: boolean
  isError?: boolean
  titleError?: string
  titleLoading?: string
}

withDefaults(defineProps<Props>(), {
  titleError: 'Загрузка',
  titleLoading: 'Ошибка загрузки',
  isLoading: false,
  isError: false
})
</script>