<template>
  <fieldset :disabled="isDisabled">
    <section class="apartments-filter" aria-label="Фильтры квартир">
      <div class="apartments-filter__rooms">
        <button-component
          v-for="room in apartmentRoomsButton"
          :key="room.value"
          class="apartments-filter__rooms-button"
          :class="{ 'apartments-filter__rooms-button--active': isRoomActive(room.value) }"
          :title="room.title"
          :color="'var(--main-black)'"
          :bg-color="'var(--main-white)'"
          :rounded="true"
          @click="toggleRoom(room.value)"
        />
      </div>

      <div class="apartments-filter__price">
        <slider-component
          :model-value="filterState.price"
          :title="'Стоимость квартиры, ₽'"
          :min="1"
          :max="10000000"
          @update:model-value="p => filterState = { ...filterState, price: p }"
        />
      </div>

      <div class="apartments-filter__size">
        <slider-component
          :model-value="filterState.size"
          :title="'Площадь, м²'"
          :min="20"
          :max="300"
          @update:model-value="s => filterState = { ...filterState, size: s }"
        />
      </div>

      <div class="apartments-filter__reset" @click="resetFilter">
        <span>Сбросить параметры</span>

        <Icon name="i-mdi-close" />
      </div>
    </section>
  </fieldset>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useApartmentsStore } from '@/stores/apartments'

import sliderComponent from '@/shared/ui/slider/sliderComponent.vue'
import buttonComponent from '@/shared/ui/button/buttonComponent.vue'

import { apartmentRoomsButton } from '@/features/apartments/apartments-filter/const/apartmentRoomsButton'
import { apartmentMergeFilter } from '@/shared/utils/apartmentMergeFilter'
import type { IApartmentsFilter } from '@/entities/apartment/filter/types/IApartmentsFilter'

const emit = defineEmits<{
  filterChanged: [filter: IApartmentsFilter]
}>()

const apartmentsStore = useApartmentsStore()
const { filter: storeFilter } = storeToRefs(apartmentsStore)

const filterState = computed<IApartmentsFilter>({
  get: () => storeFilter.value,
  set: v => apartmentsStore.setFilter(v)
})

const isDisabled = computed(() => apartmentsStore.isLoading)

const resetFilter = () => apartmentsStore.resetFilter()

const isRoomActive = (value: number): boolean => {
  return Array.isArray(filterState.value.rooms) && filterState.value.rooms.includes(value)
}

const toggleRoom = (value: number) => {
  const rooms = Array.isArray(filterState.value.rooms)
    ? [...filterState.value.rooms]
    : []

  const index = rooms.indexOf(value)

  if (index === -1) {
    rooms.push(value)
  } else {
    rooms.splice(index, 1)
  }

  filterState.value = { ...filterState.value, rooms }
}

watch(() => filterState.value, (newFilter) => {
  emit('filterChanged', apartmentMergeFilter(newFilter))
}, { deep: true })
</script>

<style scoped lang="scss">
.apartments-filter {
  padding: 40px;
  width: 399px;
  height: 372px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 10px;
  background: var(--bg-green);

  &__rooms {
    display: flex;
    gap: 16px;

    &-button {
      width: 44px;
      height: 44px;
      box-shadow: none;

      &--active {
        color: var(--main-white) !important;
        background-color: var(--main-green) !important;
        box-shadow: 0px 6px 20px 0px #95D0A1;
      }
    }
  }

  &__reset {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
}
</style>