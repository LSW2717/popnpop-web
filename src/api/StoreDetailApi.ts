import api from "@/config/axios/AxiosConfig";
import {
  AdjacentStoreResponse,
  ReviewResponse,
  StoreResponse
} from "@/interfaces/StoreDetailInterface";
import {SimplifiedStoreResponse} from "@/interfaces/HomeInterface";

export const getStore = async (id: number): Promise<StoreResponse> => {
  const response = await api.get<StoreResponse>(`/stores/${id}`);
  return response.data;
};

export const getSimilarStores = async (id: number): Promise<SimplifiedStoreResponse[]> => {
  const response = await api.get<SimplifiedStoreResponse[]>(`/stores/${id}/similarities`);
  return response.data;
};

export const getAdjacentStores = async (id: number): Promise<AdjacentStoreResponse[]> => {
  const response = await api.get<AdjacentStoreResponse[]>(`/stores/${id}/adjacent`);
  return response.data;
};

export const getStoreReviews = async (id: number): Promise<ReviewResponse[]> => {
  const response = await api.get<ReviewResponse[]>(`/reviews/store/${id}`,{
    params: {
      sortType: 'LIKED_COUNTS_DESC',
    }
  });
  return response.data
}

