import type { IApartment, SortableApartmentKeys } from '@/entities/apartment/types/IApartment'
import type { sortApartmentsKeyType } from '@/shared/types/sortApartmentsKeyType'
import type { sortDirectionType } from '@/shared/types/sortDirectionType'

import { SorterService } from '@/shared/lib/sort/SorterService'

export class ApartmentSorterService extends SorterService<IApartment> {
  sort(
    items: IApartment[],
    key: sortApartmentsKeyType,
    direction: sortDirectionType
  ): IApartment[] {
    return [...items].sort((a, b) => {
      const rawA = (a as SortableApartmentKeys)[key] ?? ''
      const rawB = (b as SortableApartmentKeys)[key] ?? ''

      let vA: number | string
      let vB: number | string

      if (key === 'price' || key === 'floor') {
        vA = Number(String(rawA).replace(/[^\d]/g, '')) || 0
        vB = Number(String(rawB).replace(/[^\d]/g, '')) || 0
      } else if (key === 'size') {
        vA = parseFloat(String(rawA).replace(',', '.')) || 0
        vB = parseFloat(String(rawB).replace(',', '.')) || 0
      } else {
        vA = String(rawA)
        vB = String(rawB)
      }

      if (typeof vA === 'string' && typeof vB === 'string') {
        return direction === 'asc'
          ? vA.localeCompare(vB)
          : vB.localeCompare(vA)
      }

      return direction === 'asc'
        ? (vA as number) - (vB as number)
        : (vB as number) - (vA as number)
    })
  }
}