export class StoreResponse {
  storeId: number;
  name: string;
  imageUrls: string[];
  address: Address;
  place: PlaceResponse | null;
  categories: CategoryResponse[];
  startsAt: Date;
  endsAt: Date;
  openingHours: OpeningHour[];
  websiteUrls: string[];
  instagramIds: string[];
  brandName: string;
  reservationDescription: ReservationDescription;
  openingHourDescription: string | null;
  storeDescription: string;
  goodsDescription: string[];
  activityDescription: string[];
  storeComments: string[];
  editorComments: string[];

  constructor() {
    this.storeId = 0;
    this.name = "";
    this.imageUrls = [];
    this.address = {
      region: "",
      city: "",
      street: "",
      detail: null,
      latitude: 0,
      longitude: 0,
      locationHash: "",
    };
    this.place = null;
    this.categories = [];
    this.startsAt = new Date();
    this.endsAt = new Date();
    this.openingHours = [];
    this.websiteUrls = [];
    this.instagramIds = [];
    this.brandName = "";
    this.reservationDescription = {
      reservationTypes: [],
      reservationUrl: null,
      reservationStartsAt: null,
      reservationEndsAt: null,
    };
    this.openingHourDescription = null;
    this.storeDescription = "";
    this.goodsDescription = [];
    this.activityDescription = [];
    this.storeComments = [];
    this.editorComments = [];
  }
}

interface PlaceResponse {
  placeId: number;
  name: string;
  region: string;
  address: string;
  description: string;
  imageUrl: string;
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
export interface ReservationDescription {
  reservationTypes: ReservationType[];
  reservationUrl: string | null;
  reservationStartsAt: Date | null;
  reservationEndsAt: Date | null;
}
export enum ReservationType {
  WALK_IN = "WALK_IN",
  PRE_RESERVE = "PRE_RESERVE",
  ON_SITE_RESERVE = "ON_SITE_RESERVE",
}

export interface ReviewResponse {
  reviewId: number;
  storeId: number;
  storeName: string;
  writerId: number;
  writerName: string;
  rate: number;
  comment: string;
  likedCount: number;
  isLiked: boolean;
  images: ReviewImageResponse[];
  createdAt: Date;
}

export interface ReviewImageResponse {
  // Optional properties
  imageUrl: string;
  imageOrder: number;
}

export enum ReviewResponseSortType {
  CREATED_AT_DESC,
  LIKED_COUNTS_DESC,
  RATE_DESC,
  RATE_ASC,
}

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