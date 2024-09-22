export interface AdjacentStoreResponse {
  distance: string;
  storeId: number;
  name: string;
  brandName: string;
  description: string;
  rate?: number | null;
  startsAt: Date;
  endsAt: Date;
  address: Address;
  isSaved: boolean;
  imageUrls: string[];
  openingHours: OpeningHour[];
  categories: CategoryResponse[];
  isInHotCuration: boolean;
}

interface CategoryResponse {
  categoryId: number;
  name: string;
}
export interface Address {
  region: string;
  city: string;
  street: string;
  detail?: string | null;
  latitude: number;
  longitude: number;
  locationHash?: string | null;
}
export interface OpeningHour {
  dayOfWeek: DayOfWeek;
  startsAt: string;
  endsAt: string;
}
export enum DayOfWeek {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY"
}