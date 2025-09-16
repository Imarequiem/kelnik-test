export type SortableApartmentKeys = Pick<IApartment, 'title' | 'size' | 'floor' | 'price' | 'rooms'>

export interface IApartment {
  id: number;
  title: string;
  size: string;
  floor: number;
  price: string;
  image: string;
  rooms: number;
}