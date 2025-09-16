import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { ApartmentService } from '@/entities/apartment/service/apartmentService'

import { PersistentStorage } from '@/shared/lib/persistentStorage'
import { apartmentMergeFilter } from '@/shared/utils/apartmentMergeFilter'
import { MOCK_APARTMENTS } from '@/shared/const/MOCK_APARTMENTS'
import type { IApartment } from '@/entities/apartment/types/IApartment'
import type { sortApartmentsKeyType } from '@/shared/types/sortApartmentsKeyType'
import type { sortDirectionType } from '@/shared/types/sortDirectionType'
import type { IApartmentsFilter } from '@/entities/apartment/filter/types/IApartmentsFilter'

export const useApartmentsStore = defineStore('apartments', () => {
  const filterStorage = new PersistentStorage<IApartmentsFilter>('apartments-filter', apartmentMergeFilter())

  const apartments = ref<IApartment[]>([])
  const isLoading = ref<boolean>(false)
  const isError = ref<boolean>(false)
  const visibleCount = ref<number>(5)
  const filter = ref<IApartmentsFilter>(apartmentMergeFilter())
  const sortKey = ref<sortApartmentsKeyType | ''>('')
  const sortDirection = ref<sortDirectionType>('asc')

  const visibleApartments = computed<IApartment[]>(() => filteredSorted.value.slice(0, visibleCount.value))

  const filteredSorted = computed<IApartment[]>(() => {
    let list = apartments.value
    list = ApartmentService.filter(list, filter.value)

    if (sortKey.value) {
      list = ApartmentService.sort(list, sortKey.value, sortDirection.value)
    }

    return list
  })

  const loadMore = () => (visibleCount.value += 20)

  const setSort = (key: sortApartmentsKeyType): void => {
    if (sortKey.value === key) {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortKey.value = key
      sortDirection.value = 'asc'
    }
  }

  const setFilter = (f: IApartmentsFilter) => {
    const merged = apartmentMergeFilter(f)
    filter.value = merged
    filterStorage.set(merged)
    visibleCount.value = 5
  }

  const resetFilter = () => {
    filterStorage.clear()
    filter.value = apartmentMergeFilter()
    visibleCount.value = 5
  }

  const fetchApartments = async () => {
    isLoading.value = true
    isError.value = false

    try {
      await new Promise<void>(res => setTimeout(res, 2000))

      apartments.value = MOCK_APARTMENTS
    } catch {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  const fetchByFilter = async (f?: IApartmentsFilter) => {
    isLoading.value = true
    isError.value = false
    visibleCount.value = 5

    try {
      await new Promise<void>(res => setTimeout(res, 2000))

      const filtered = ApartmentService.filter(MOCK_APARTMENTS, f ?? filter.value)
      apartments.value = filtered
    } catch {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  return {
    apartments,
    isLoading,
    isError,
    visibleCount,
    filter,
    sortKey,
    sortDirection,
    setSort,
    fetchApartments,
    loadMore,
    filteredSorted,
    visibleApartments,
    fetchByFilter,
    setFilter,
    resetFilter
  }
})