export abstract class SorterService<TItem> {
  abstract sort(
    items: TItem[],
    key: keyof TItem,
    direction: 'asc' | 'desc'
  ): TItem[]
}