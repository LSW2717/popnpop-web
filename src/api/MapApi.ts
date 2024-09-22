import {AdjacentStoreResponse} from "@/interfaces/MapInterface";
import api from "@/config/axios/AxiosConfig";

export interface MapSearchParams {
  southWestLatitude: number | null;
  southWestLongitude: number | null;
  northEastLatitude: number | null;
  northEastLongitude: number | null;
  currentLatitude: number | null;
  currentLongitude: number | null;
  keyword: string | null;
}

export async function getStoreList(params: MapSearchParams): Promise<AdjacentStoreResponse[]> {
  try {
    const response = await api.get<AdjacentStoreResponse[]>('/stores/area', {
      params: {
        southWestLatitude: params.southWestLatitude,
        southWestLongitude: params.southWestLongitude,
        northEastLatitude: params.northEastLatitude,
        northEastLongitude: params.northEastLongitude,
        currentLatitude: params.currentLatitude,
        currentLongitude: params.currentLongitude,
        keyword: params.keyword,
      },
    });
    return response.data;
  } catch (error) {
    console.error('API 호출 중 오류가 발생했습니다:', error);
    throw error;
  }
}