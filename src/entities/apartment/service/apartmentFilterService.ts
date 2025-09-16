import type { IApartment } from '@/entities/apartment/types/IApartment'
import type { IApartmentsFilter } from '@/entities/apartment/filter/types/IApartmentsFilter'

import { FilterService } from '@/shared/lib/filter/FilterService'

export class ApartmentFilterService extends FilterService<IApartment, IApartmentsFilter> {
  filter(list: IApartment[], filter?: IApartmentsFilter | null): IApartment[] {
    if (!filter) return list

    const roomsFilter = Array.isArray(filter.rooms) ? filter.rooms : []
    const sizeRange = Array.isArray(filter.size) && filter.size.length === 2
      ? filter.size
      : [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY]
    const priceRange = Array.isArray(filter.price) && filter.price.length === 2
      ? filter.price
      : [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY]

    const sizeMin = Number(sizeRange[0] ?? Number.NEGATIVE_INFINITY)
    const sizeMax = Number(sizeRange[1] ?? Number.POSITIVE_INFINITY)

    const priceMin = Number(priceRange[0] ?? Number.NEGATIVE_INFINITY)
    const priceMax = Number(priceRange[1] ?? Number.POSITIVE_INFINITY)

    return list.filter(apartment => {
    if (roomsFilter.length > 0) {
      const match = String(apartment.title).match(/^(\d+)/)
      const roomsFromTitle = match ? Number(match[1]) : NaN

      if (!Number.isFinite(roomsFromTitle) || !roomsFilter.includes(roomsFromTitle)) {
        return false
      }
    }

    const size = parseFloat(String(apartment.size).replace(',', '.'))
    if (!Number.isNaN(size) && (size < sizeMin || size > sizeMax)) {
      return false
    }

    const price = Number(String(apartment.price).replace(/[^\d]/g, ''))
    if (!Number.isNaN(price) && (price < priceMin || price > priceMax)) {
      return false
    }

    return true
  })
  }
}