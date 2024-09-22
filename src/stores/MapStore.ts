import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import {getStoreList, MapSearchParams} from "@/api/MapApi";
import {AdjacentStoreResponse} from "@/interfaces/MapInterface";

export const useMapStore = defineStore('map', () => {

  const mapData = reactive<AdjacentStoreResponse[]>([]);
  const keyWordData = reactive<AdjacentStoreResponse[]>([]);
  const searchData = reactive<AdjacentStoreResponse[]>([]);
  const zoomParam = reactive({zoom: 16});

  const mapSearchParams = reactive<MapSearchParams>({
    keyword: null,
    southWestLatitude: null,
    southWestLongitude: null,
    northEastLatitude: null,
    northEastLongitude: null,
    currentLatitude: 37.51347,
    currentLongitude: 127.041722,
  });

  const search = async () => {
    mapData.length = 0;
    try {
      const response = await getStoreList(mapSearchParams)
      Object.assign(mapData, response);
    } catch (error) {
      console.error('search',error);
      throw error;
    }
  };

  const searchKeyWord = async () => {
    keyWordData.length = 0;
    try {
      const response = await getStoreList(mapSearchParams)
      Object.assign(keyWordData, response);
    } catch (error) {
      console.error('searchKeyWord',error);
      throw error;
    }
  }


  return {
    search,
    searchKeyWord,
    mapData,
    keyWordData,
    mapSearchParams,
    searchData,
    zoomParam,
  };
});

