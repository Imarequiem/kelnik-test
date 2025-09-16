export abstract class FilterService<TItem, TFilter> {
  abstract filter(items: TItem[], filter: TFilter): TItem[]
}