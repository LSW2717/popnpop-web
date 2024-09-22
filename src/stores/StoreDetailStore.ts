import {defineStore} from "pinia";
import {computed, reactive, ref, watch} from "vue";
import {AdjacentStoreResponse, ReviewResponse, StoreResponse} from "@/interfaces/StoreDetailInterface";
import {getAdjacentStores, getSimilarStores, getStore, getStoreReviews} from "@/api/StoreDetailApi";
import {useQuery} from "vue-query";
import {SimplifiedStoreResponse} from "@/interfaces/HomeInterface";
import {useRoute} from "vue-router";

export const useStoreDetailStore = defineStore('store', () => {
  const similarStoresData = reactive<SimplifiedStoreResponse[]>([]);
  const storeReviewsData = reactive<ReviewResponse[]>([]);
  const storeData = reactive<StoreResponse>(new StoreResponse());
  const adjacentStoresData = reactive<AdjacentStoreResponse[]>([]);

  const route = useRoute();
  const storeId = ref(Number(route.params.id));

  watch(() => route.params.id, (newId) => {
    storeId.value = Number(newId);
  });

  const { isLoading: storeLoading,  isError: storeError} = useQuery<StoreResponse>({
    queryKey: ['storeData', storeId],
    queryFn: () => getStore(storeId.value),
    enabled: computed(() => !isNaN(storeId.value)),
    onSuccess: (data: StoreResponse) => {
      Object.assign(storeData, new StoreResponse());
      Object.assign(storeData, data);
    },
    cacheTime: 0,
    staleTime: 0,
  });
  const { isLoading: similarStoreLoading,  isError: similarStoreError} = useQuery<SimplifiedStoreResponse[]>({
    queryKey: ['similarStores', storeId],
    queryFn: () => getSimilarStores(storeId.value),
    enabled: computed(() => !isNaN(storeId.value)),
    onSuccess: (data: SimplifiedStoreResponse[]) => {
      similarStoresData.length = 0;
      similarStoresData.push(...data);
    },
    cacheTime: 0,
    staleTime: 0,
  });
  const { isLoading: adjacentStoreLoading,  isError: adjacentStoreError} = useQuery<AdjacentStoreResponse[]>({
    queryKey: ['adjacentStores', storeId],
    queryFn: () => getAdjacentStores(storeId.value),
    enabled: computed(() => !isNaN(storeId.value)),
    onSuccess: (data: AdjacentStoreResponse[]) => {
      adjacentStoresData.length = 0;
      adjacentStoresData.push(...data);
    },
    cacheTime: 0,
    staleTime: 0,
  });
  const { isLoading: storeReviewsLoading,  isError: storeReviewsError} = useQuery<ReviewResponse[]>({
    queryKey: ['storeReviews', storeId],
    queryFn: () => getStoreReviews(storeId.value),
    enabled: computed(() => !isNaN(storeId.value)),
    onSuccess: (data: ReviewResponse[]) => {
      storeReviewsData.length = 0;
      storeReviewsData.push(...data);
    },
    cacheTime: 0,
    staleTime: 0,
  });

  const isLoading = computed(() => {
    return (
        storeLoading ||
        similarStoreLoading ||
        adjacentStoreLoading ||
        storeReviewsLoading
    );
  });

// 모든 isError 값을 묶어서 하나의 값으로 계산
  const isError = computed(() => {
    return (
        storeError ||
        similarStoreError ||
        adjacentStoreError ||
        storeReviewsError
    );
  });

  return {
    isLoading,
    isError,
    similarStoresData,
    storeData,
    storeReviewsData,
    adjacentStoresData,
    storeId,
  };
})