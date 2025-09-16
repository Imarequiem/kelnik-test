import type { IApartment } from '@/entities/apartment/types/IApartment'
import type { IApartmentsFilter } from '@/entities/apartment/filter/types/IApartmentsFilter'

import { FilterService } from '@/shared/lib/filter/FilterService'

export class ApartmentFilterService extends FilterService<IApartment, IApartmentsFilter> {
  filter(list: IApartment[], filter?: IApartmentsFilter | null): IApartment[] {
    if (!filter) return list

    const roomsFilter = this.getRoomsFilter(filter)
    const [sizeMin, sizeMax] = this.getRange(filter.size)
    const [priceMin, priceMax] = this.getRange(filter.price)

    return list.filter(apartment => {
      if (!this.matchRooms(apartment, roomsFilter)) return false
      if (!this.matchSize(apartment, sizeMin, sizeMax)) return false
      if (!this.matchPrice(apartment, priceMin, priceMax)) return false

      return true
    })
  }

  private getRoomsFilter(filter: IApartmentsFilter): number[] {
    return Array.isArray(filter.rooms) ? filter.rooms : []
  }

  private getRange(range?: [number, number]): [number, number] {
    return Array.isArray(range) && range.length === 2
      ? [Number(range[0]), Number(range[1])]
      : [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY]
  }

  private matchRooms(apartment: IApartment, roomsFilter: number[]): boolean {
    if (roomsFilter.length === 0) return true

    const match = String(apartment.title).match(/^(\d+)/)
    const roomsFromTitle = match ? Number(match[1]) : NaN

    return Number.isFinite(roomsFromTitle) && roomsFilter.includes(roomsFromTitle)
  }

  private matchSize(apartment: IApartment, min: number, max: number): boolean {
    const size = parseFloat(String(apartment.size).replace(',', '.'))
    return Number.isNaN(size) || (size >= min && size <= max)
  }

  private matchPrice(apartment: IApartment, min: number, max: number): boolean {
    const price = Number(String(apartment.price).replace(/[^\d]/g, ''))
    return Number.isNaN(price) || (price >= min && price <= max)
  }
}