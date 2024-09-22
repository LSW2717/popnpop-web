import {defineStore} from "pinia";
import {reactive} from "vue";
import {getHome} from "@/api/HomeApi";
import {useQuery} from "vue-query";
import {HomeResponse} from "@/interfaces/HomeInterface";

export const useHomeStore = defineStore('home', () => {
  const homeData = reactive<HomeResponse>({
    banners: [],
    curations: [],
    places: [],
    recentReviews: [],
  });
  const { isLoading: homeLoading,  isError: homeError} = useQuery<HomeResponse>({
    queryKey: ['homeData'],
    queryFn: getHome,
    staleTime: 60000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    onSuccess(data) {
      Object.assign(homeData, data);
    },
  });

  return {
    homeData,
    homeError,
    homeLoading
  };
});

