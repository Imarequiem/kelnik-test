<template>
  <div class="apartments-table">
    <div class="apartments-table__head">
      <span class="head-plan">
        Планировка
      </span>

      <span class="head-title">
        Квартира
      </span>

      <sorted-button
        class="head-size"
        label="S, м²"
        sort-key="size"
        :direction="sortKey === 'size' ? sortDirection : ''"
        @toggle="setSort('size')"
      />

      <sorted-button
        class="head-floor"
        label="Этаж"
        sort-key="floor"
        :direction="sortKey === 'floor' ? sortDirection : ''"
        @toggle="setSort('floor')"
      />

      <sorted-button
        class="head-price"
        label="Цена"
        sort-key="price"
        :direction="sortKey === 'price' ? sortDirection : ''"
        @toggle="setSort('price')"
      />
    </div>

    <apartment-item
      v-for="apartment in apartments"
      :key="apartment.id"
      :apartment
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useApartmentsStore } from '@/stores/apartments'

import apartmentItem from '@/entities/apartment/ui/apartmentItem/apartmentItem.vue'
import sortedButton from '@/shared/ui/sortedButton/sortedButton.vue'

import type { sortApartmentsKeyType } from '@/shared/types/sortApartmentsKeyType'
import type { IApartment } from '@/entities/apartment/types/IApartment'

defineProps<{
  apartments: IApartment[]
}>()

const apartmentsStore = useApartmentsStore()

const { sortKey, sortDirection } = storeToRefs(apartmentsStore)

const setSort = (key: sortApartmentsKeyType) => apartmentsStore.setSort(key)
</script>

<style scoped>
.apartments-table {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.apartments-table__head {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  padding-bottom: 8px;
  font-weight: 400;
  font-size: 14px;
  box-shadow: var(--main-shadow);
}

.head-plan {
  min-width: 100px;
}

.head-title {
  min-width: 301px;
}

.head-size {
  min-width: 140px;
}

.head-floor {
  min-width: 140px;
}

.head-price {
  min-width: 120px;
}

.apartments-table__head > div,
.apartments-table__head > * {
  display: flex;
  align-items: center;
}

@media (max-width: 1439px) and (min-width: 960px) {
  .apartments-table__head {
    display: grid;
    grid-template-columns: 45px 48px 64px;
    gap: 20px;
  }

  .head-plan,
  .head-title {
    display: none !important;
  }
}
</style>
