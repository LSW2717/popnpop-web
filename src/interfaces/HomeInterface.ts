export interface HomeResponse {
  banners: BannerResponse[];
  curations: StoreByCurationResponse[];
  places: PlaceResponse[];
  recentReviews: HomeReviewsResponse[];
}
interface BannerResponse {
  bannerType: BannerType;
  targetId: number;
  bannerImagePath: string;
}

enum BannerType {
  ADMIN_ARTICLE = "ADMIN_ARTICLE",
  STORE = "STORE",
}
export interface StoreByCurationResponse {
  curationId: number;
  title: string;
  curationOrder: number;
  curationLayoutType: CurationLayoutType;
  stores: SimplifiedStoreResponse[];
}

enum CurationLayoutType {
  LAYOUT_1xN = "LAYOUT_1xN",
  LAYOUT_2xN = "LAYOUT_2xN",
}

export interface SimplifiedStoreResponse {
  storeId: number;
  name: string;
  startsAt: Date;
  endsAt: Date;
  address: Address;
  thumbnailImageUrl: string;
  isSaved: boolean;
}
interface PlaceResponse {
  placeId: number;
  name: string;
  region: string;
  address: string;
  description: string;
  imageUrl: string;
}
interface HomeReviewsResponse {
  reviewId: number;
  storeId: number;
  writerId: number;
  writerName: string;
  rate: number;
  comment: string;
  likedCount: number;
  isLiked: boolean;
  storeThumbnailUrl: string;
  storeName: string;
  createdAt: Date;
}
interface Address {
  region: string;
  city: string;
  street: string;
  detail?: string | null;
  latitude: number;
  longitude: number;
}