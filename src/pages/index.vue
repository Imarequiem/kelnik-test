<template>
  <ClientOnly>
    <div class="apartments">
      <div class="apartments__content">
        <h1 class="apartments__content-title">
          Квартиры
        </h1>

        <loader-component
          v-if="apartmentsStore.isLoading && !apartmentsStore.isError"
          :title-loading="'Загружаем квартиры...'"
          :is-loading="apartmentsStore.isLoading"
          :is-error="apartmentsStore.isError"
        />

        <div v-else-if="!apartments.length">
          <p>Ещё нет ни одной квартиры</p>
        </div>

        <div v-else-if="!visibleApartments.length">
          <p>Мы не нашли ни одной квартиры по вашим требованиям</p>
        </div>

        <div v-else>
          <apartments-table :apartments="visibleApartments" />
        </div>

        <buttonComponent
          v-if="canLoadMore"
          class="apartments__content__load-more"
          :title="'Загрузить ещё'"
          @click="clickLoadMore"
        />
      </div>

      <div class="apartments__filter-wrap">
        <apartmentsFilter @filter-changed="onFilterChanged" />
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useApartmentsStore } from '@/stores/apartments'

import apartmentsFilter from '@/features/apartments/apartments-filter/apartmentsFilter.vue'
import apartmentsTable from '@/widgets/apartmentsTable/apartmentsTable.vue'
import buttonComponent from '@/shared/ui/button/buttonComponent.vue'
import loaderComponent from '@/shared/ui/loader/loaderComponent.vue'

import type { IApartmentsFilter } from '@/entities/apartment/filter/types/IApartmentsFilter'

const apartmentsStore = useApartmentsStore()
const {
  apartments,
  visibleApartments,
  filteredSorted,
  visibleCount,
  isLoading
} = storeToRefs(apartmentsStore)

const canLoadMore = computed<boolean>(
  () => visibleApartments.value.length < filteredSorted.value.length
  && !isLoading.value
)

const clickLoadMore = () => apartmentsStore.loadMore()

const onFilterChanged = async (filter: IApartmentsFilter) => {
  visibleCount.value = 20

  await apartmentsStore.fetchByFilter(filter)
}

onMounted(async () => await apartmentsStore.fetchByFilter(apartmentsStore.filter))
</script>

<style scoped lang="scss">
.apartments {
  padding: 96px 80px;
  width: 100%;
  display: flex;
  gap: 80px;

  &__content {
    width: 100%;
    min-width: 506px;
    display: flex;
    flex-direction: column;
    gap: 48px;

    &-title {
      font-family: PT Root UI;
      font-weight: 700;
      font-size: 54px;
      line-height: 55px;
    }

    &__load-more {
      width: 156px;
      height: 40px;
      border-radius: 25px;
      border: 1px solid #0B173933
    }
  }
}
</style>