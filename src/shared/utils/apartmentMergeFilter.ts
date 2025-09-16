import { apartmentDefaultFilter } from '@/entities/apartment/filter/const/apartmentDefaultFilter'

import type { IApartmentsFilter } from '@/entities/apartment/filter/types/IApartmentsFilter'

export const apartmentMergeFilter = (overrides?: Partial<IApartmentsFilter>): IApartmentsFilter => {
  if (!overrides) {
    return { ...apartmentDefaultFilter }
  }

  return {
    rooms: Array.isArray(overrides.rooms)
      ? overrides.rooms
      : apartmentDefaultFilter.rooms,

    size: Array.isArray(overrides.size)
      && overrides.size.length === 2
      ? overrides.size
      : apartmentDefaultFilter.size,

    price: Array.isArray(overrides.price)
      && overrides.price.length === 2
      ? overrides.price
      : apartmentDefaultFilter.price
  }
}
