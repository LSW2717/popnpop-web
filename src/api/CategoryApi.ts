import {CategoryResponse} from "@/interfaces/CategoryInterface";
import api from "@/config/axios/AxiosConfig";

export class SearchParams {
  isActive?: boolean;
  categoryId?: number | null;
  regionAndCityNames?: string | null;
  keyword?: string | null;
  startRangeDate?: string | null;
  endRangeDate?: string | null;
  page: number;
  size: number;
  sortType: string;

  constructor() {
    this.isActive = true;
    this.categoryId = null;
    this.regionAndCityNames = null;
    this.keyword = null;
    this.startRangeDate = null;
    this.endRangeDate = null;
    this.page = 0;
    this.size = 8;
    this.sortType = 'OPEN';
  }
}

export async function searchStores(params: SearchParams): Promise<CategoryResponse> {
  try {
    const response = await api.get<CategoryResponse>('/stores/search', {
      params: {
        isActive: params.isActive,
        categoryId: params.categoryId,
        regionAndCityNames: params.regionAndCityNames,
        keyword: params.keyword,
        startRangeDate: params.startRangeDate,
        endRangeDate: params.endRangeDate,
        page: params.page,
        size: params.size,
        sortType: params.sortType,
      },
    });
    return response.data;
  } catch (error) {
    console.error('API 호출 중 오류가 발생했습니다:', error);
    throw error;
  }
}