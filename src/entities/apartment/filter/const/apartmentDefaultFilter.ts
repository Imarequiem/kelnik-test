import type { IApartmentsFilter } from '@/entities/apartment/filter/types/IApartmentsFilter'

export const apartmentDefaultFilter: IApartmentsFilter = {
  rooms: [1, 2, 3, 4],
  price: [1, 10000000],
  size: [20, 300]
}
