import { ApartmentFilterService } from '@/entities/apartment/service/apartmentFilterService'
import { ApartmentSorterService } from '@/entities/apartment/service/apartmentSorterService'

import type { IApartment } from '@/entities/apartment/types/IApartment'
import type { sortApartmentsKeyType } from '@/shared/types/sortApartmentsKeyType'
import type { sortDirectionType } from '@/shared/types/sortDirectionType'
import type { IApartmentsFilter } from '@/entities/apartment/filter/types/IApartmentsFilter'

export class ApartmentService {
  private static filterer = new ApartmentFilterService()
  private static sorter = new ApartmentSorterService()

  static filter(list: IApartment[], filter?: IApartmentsFilter | null): IApartment[] {
    return this.filterer.filter(list, filter)
  }

  static sort(
    list: IApartment[],
    key: sortApartmentsKeyType,
    direction: sortDirectionType
  ): IApartment[] {
    return this.sorter.sort(list, key, direction)
  }
}