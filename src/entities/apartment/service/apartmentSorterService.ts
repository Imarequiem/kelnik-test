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
      const vA = this.normalizeValue((a as SortableApartmentKeys)[key], key)
      const vB = this.normalizeValue((b as SortableApartmentKeys)[key], key)

      return this.compareValues(vA, vB, direction)
    })
  }

  private normalizeValue(value: unknown, key: sortApartmentsKeyType): number | string {
    const raw = value ?? ''

    switch (key) {
      case 'price':
      case 'floor':
        return Number(String(raw).replace(/[^\d]/g, '')) || 0

      case 'size':
        return parseFloat(String(raw).replace(',', '.')) || 0

      default:
        return String(raw)
    }
  }

  private compareValues(
    a: number | string,
    b: number | string,
    direction: sortDirectionType
  ): number {
    if (typeof a === 'string' && typeof b === 'string') {
      return direction === 'asc'
        ? a.localeCompare(b)
        : b.localeCompare(a)
    }

    return direction === 'asc'
      ? (a as number) - (b as number)
      : (b as number) - (a as number)
  }
}