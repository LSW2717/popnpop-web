<template>
  <v-text-field
      v-model="inputValue"
      variant="outlined"
      label="팝업스토어명, 브랜드명 검색"
      single-line
      :class="{'focused': isFocused}"
      class="body1-medium custom-input-field"
      @focus="isFocused = true"
      @blur="isFocused = false"
      color="#B89FFF"
      base-color="#97959E"
      bg-color="white"
      rounded
      @keydown.enter="searchKeyWordStores"
      style="max-width: 600px; width: 100%; position: fixed; top: 80px; left: 50%; transform: translateX(-50%); z-index: 1000;"
  >
    <template v-slot:append-inner>
      <v-btn flat width="40" height="40" icon @click="searchKeyWordStores">
        <v-icon size="30" :color="isFocused ? '#8B62FF' : '#97959E'">mdi-magnify</v-icon>
      </v-btn>
    </template>
  </v-text-field>
  <v-btn v-if="start" color="black" class="py-5 px-3 d-flex justify-center"
         @click="searchMapStores"
         style="position: fixed; top: 180px; left: 50%; transform: translateX(-50%); border-radius: 50px; opacity: 0.8; z-index:2000"
  >
    <v-icon size="25" class="mr-2" color="white">mdi-refresh</v-icon>
    <span class="body3-medium color-white">주변 검색하기</span>
  </v-btn>

  <!--  네이버맵-->
  <NaverMap
      style="width: 100%; height: 100%"
      :map-options="mapOptions"
      @onLoad="onMapLoad"
      @bounds_changed="updateBoundsWithExpand"
      @zoom_changed="updateBounds"
      @drag="start=true"
  >
    <NaverMarker
        v-for="(item, index) in mapData"
        :key="item.storeId"
        :latitude="item.address.latitude"
        :longitude="item.address.longitude"
        :position="{ lat: item.address.latitude, lng: item.address.longitude }"
        @mouseover="isOpen[item.storeId]=true"
        @mouseout="isOpen[item.storeId]=false"
        @click="clickMarker(item)"
        @onLoad="onLoadMarker($event, index)"
    >
      <v-img style="position: relative; top: -20px; left: -20px;" width="40" height="40"
             :src="getIconForCategory(item.categories[0].name)"/>
    </NaverMarker>
    <NaverInfoWindow
        v-for="(info,index) in mapData"
        :key="info.storeId"
        :marker="markerRefs[index]"
        :open="isOpen[info.storeId]"
        @onLoad="onLoadInfoWindow($event, index)"
        style="cursor: pointer;"
        :options="{borderColor: 'transparent',backgroundColor: 'transparent'}"
    >
      <div class="info-window-style body1-medium color-gray700">{{ info.name }}</div>
    </NaverInfoWindow>
    <NaverMarker
        v-for="(item,index) in searchData"
        :key="item.storeId"
        :latitude="item.address.latitude"
        :longitude="item.address.longitude"
        @mouseover="isOpen[item.storeId]=true"
        @mouseout="isOpen[item.storeId]=false"
        @click="clickMarker(item)"
        :position="{ lat: item.address.latitude, lng: item.address.longitude }"
        @onLoad="onLoadMarker($event, index)"
    >
      <v-img style="position: relative; top: -20px; left: -20px;" width="40" height="40"
             :src="getIconForCategory(item.categories[0].name)"/>
    </NaverMarker>
    <NaverInfoWindow
        v-for="(info,index) in searchData"
        :key="info.storeId"
        :marker="markerRefs[index]"
        :open="isOpen[info.storeId]"
        @onLoad="onLoadInfoWindow($event, index)"
        style="cursor: pointer;"
        :options="{borderColor: 'transparent',backgroundColor: 'transparent'}"
    >
      <div class="info-window-style body1-medium color-gray700">{{ info.name }}</div>
    </NaverInfoWindow>
  </NaverMap>

  <v-dialog v-model="dialog" max-width="332">
    <v-card class="pa-4" style="border-radius: 20px">
      <MapStoreCard :item="selectedItem" @click="goToStoreDetail(selectedItem.storeId)" style="cursor: pointer"/>
    </v-card>
  </v-dialog>

  <v-btn @click="moveToCurrentGPS"  icon style="position: absolute; top: 220px; right:20px; z-index: 1200">
    <v-icon>mdi-crosshairs-gps</v-icon>
  </v-btn>


  <!--  주변 검색하기-->
  <div class="d-flex flex-column justify-start align-center cards-tab"
       :style="isExpand ? {height: '450px'} : {height: '50px'}"
  >
    <v-btn @click="isExpand=!isExpand" icon style="position: absolute; top: -55px;">
      <v-icon v-if="isExpand">mdi-chevron-down</v-icon>
      <v-icon v-else>mdi-chevron-up</v-icon>
    </v-btn>
    <span class="header4-medium color-gray800 mt-4 mb-2">주변 팝업스토어 목록</span>
    <div v-if="mapData.length > 0" class="d-flex map-cards">
      <div v-for="item in mapData" :key="item.storeId" class="mx-2">
        <MapStoreCard @click="goToStoreDetail(item.storeId)" :item="item" style="cursor: pointer"/>
      </div>
    </div>
    <div v-else-if="isExpand" style="height: 300px; width: 100%" class="d-flex flex-column justify-center align-center">
      <p class="body1-medium color-gray700 mb-2">근처에 팝업스토어가 없어요</p>
      <p class="body2-medium color-gray500">팝업스토어 주변으로 이동해보세요!</p>
    </div>
  </div>

  <!--  검색결과-->
  <div class="d-flex flex-column justify-start align-center search-cards-tab"
       :style="isSearch ? {height: '450px'} : {height: '0px'}"
  >
    <v-btn v-show="isSearch" @click="searchClose" icon style="position: absolute; top: -55px;">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <span v-if="isSearch" class="header4-medium color-gray800 mt-4 mb-2">검색목록</span>
    <div v-if="keyWordData.length > 0" class="d-flex map-cards">
      <div v-for="item in keyWordData" :key="item.storeId" class="mx-2">
        <MapStoreCard :item="item" @click="moveToStore(item)" style="cursor: pointer"/>
      </div>
    </div>
    <div v-else-if="isSearch" style="height: 300px; width: 100%" class="d-flex flex-column justify-center align-center">
      <p class="body1-medium color-gray700 mb-2">검색결과에 해당하는 스토어가 없어요</p>
      <p class="body2-medium color-gray500">팝업스토어 주변으로 이동해 보세요!</p>
    </div>
  </div>

  <!--  로딩 인디케이터-->
  <div v-if="isLoading"
       style="position: absolute; top:40%; left: 50%; transform: translateX(-50%); z-index: 1200;"
  >
    <v-progress-circular :size="100" :width="10" color="#8B62FF" bg-color="white" indeterminate/>
  </div>
</template>

<script setup lang="ts">
import {NaverInfoWindow, NaverMap, NaverMarker} from "vue3-naver-maps";

import {reactive, ref} from "vue";
import {useMapStore} from "@/stores/MapStore";
import {AdjacentStoreResponse} from "@/interfaces/MapInterface";
import MapStoreCard from "@/components/map/MapStoreCard.vue";
import {useRouter} from "vue-router";

const isFocused = ref<boolean>(false);
const inputValue = ref<string | null>(null);
const isExpand = ref<boolean>(false);
const isSearch = ref<boolean>(false);
const {mapSearchParams, zoomParam} = useMapStore();
const mapData = useMapStore().mapData as AdjacentStoreResponse[];
const keyWordData = useMapStore().keyWordData as AdjacentStoreResponse[];
const searchData = useMapStore().searchData as AdjacentStoreResponse[];
const isLoading = ref<boolean>(false);
const start = ref<boolean>(true);

const map = ref<any>();
const markerRefs = ref<any>([]);
const infoWindowRefs = ref<any>([]);
const isOpen = ref<any>({});
const router = useRouter();
const dialog = ref<boolean>(false);
const selectedItem = ref<any>(null);

const onMapLoad = (mapObj: any) => {
  console.log("지도 로드됨:", mapObj);
  map.value = mapObj;
  // 지도 경계 좌표 설정
  updateBounds();
};
const onLoadMarker = (markerObject: any, index: number) => {
  markerRefs.value[index] = markerObject;
};

const onLoadInfoWindow = (infoWindowObject: any, index: number) => {
  infoWindowRefs.value[index] = infoWindowObject;
};

const mapOptions = reactive({
  latitude: mapSearchParams.currentLatitude,
  longitude: mapSearchParams.currentLongitude,
  zoom: zoomParam.zoom,
  zoomControl: false,
})

const searchClose = () => {
  isSearch.value=false;
  keyWordData.length = 0;
}

const searchMapStores = async () => {
  start.value = false;
  isLoading.value = true
  mapSearchParams.keyword = null;
  searchData.length = 0;
  isExpand.value = true;
  Object.keys(isOpen.value).forEach(key => {
    isOpen.value[key] = false;
  });
  try {
    await useMapStore().search();
    isLoading.value = false
  } catch (e) {
    console.error("searchMapStores", e);
  }
}

const searchKeyWordStores = async () => {
  isLoading.value = true;
  isSearch.value = true;
  mapSearchParams.keyword = inputValue.value;
  try {
    await useMapStore().searchKeyWord();
    isLoading.value = false
  } catch (e) {
    console.error("searchKeyWord", e);
  }
}

const moveToStore = (store: AdjacentStoreResponse) => {
  mapData.length = 0;
  searchData.length = 0;
  console.log(markerRefs);
  console.log(infoWindowRefs);
  console.log(isOpen);

  searchData.push(store);
  const centerLat = store.address.latitude - 0.0007;
  const centerLog = store.address.longitude;
  if (map.value) {
    // eslint-disable-next-line no-undef
    const newCenter = new naver.maps.LatLng(centerLat, centerLog);
    map.value.setZoom(18);
    map.value.setCenter(newCenter);
  }
  isOpen.value[store.storeId] = true;
}

const moveToCurrentGPS = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
          const centerLat  = position.coords.latitude;
          const centerLog = position.coords.longitude;
          if(map.value){
            // eslint-disable-next-line no-undef
            const newCenter = new naver.maps.LatLng(centerLat, centerLog);
            map.value.panTo(newCenter);
          }
        },
        (error) => {
          console.error("위치 정보를 가져오는 중 오류 발생:", error);
        }
    );
  } else {
    alert("위치정보를 지원하지 않는 브라우저입니다.");
  }
}

const goToStoreDetail = (id: number) => {
  router.push(`/store/${id}`);
}

const clickMarker = (item: any) => {
  selectedItem.value = item;
  dialog.value = true;
  updateBounds();
}
const updateBoundsWithExpand = () => {
  isExpand.value = false;
  const currentZoom = map.value.getZoom();
  const bounds = map.value.getBounds();
  const center = map.value.getCenter();
  const southWest = bounds.getSW();
  const northEast = bounds.getNE();

  console.log(zoomParam.zoom);

  // 지도 경계 좌표를 mapSearchParams에 업데이트
  zoomParam.zoom = currentZoom;
  mapSearchParams.currentLatitude = center.lat();
  mapSearchParams.currentLongitude = center.lng();
  mapSearchParams.southWestLatitude = southWest.lat();
  mapSearchParams.southWestLongitude = southWest.lng();
  mapSearchParams.northEastLatitude = northEast.lat();
  mapSearchParams.northEastLongitude = northEast.lng();
}

const updateBounds = () => {
  const currentZoom = map.value.getZoom();
  const bounds = map.value.getBounds();
  const center = map.value.getCenter();
  const southWest = bounds.getSW();
  const northEast = bounds.getNE();

  console.log(zoomParam.zoom);

  // 지도 경계 좌표를 mapSearchParams에 업데이트
  zoomParam.zoom = currentZoom;
  mapSearchParams.currentLatitude = center.lat();
  mapSearchParams.currentLongitude = center.lng();
  mapSearchParams.southWestLatitude = southWest.lat();
  mapSearchParams.southWestLongitude = southWest.lng();
  mapSearchParams.northEastLatitude = northEast.lat();
  mapSearchParams.northEastLongitude = northEast.lng();
}

const getIconForCategory = (category: string) => {
  const iconMap: { [key: string]: string } = {
    '패션': require('@/assets/img/map_fashion.png'),
    '뷰티': require('@/assets/img/map_beauty.png'),
    '푸드': require('@/assets/img/map_food.png'),
    '라이프스타일': require('@/assets/img/map_lifestyle.png'),
    '아트': require('@/assets/img/map_art.png'),
    '기타': require('@/assets/img/map_etc.png')
  };

  return iconMap[category] || iconMap['기타'];
};

</script>

<style scoped>
.map-cards {
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  width: 100%;
  padding-left: 10px;
}

.map-cards::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.map-cards {
  -ms-overflow-style: none; /* IE 및 Edge에서 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
}

.custom-input-field {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  max-width: 800px;
}

.cards-tab {
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: white;
  z-index: 2000;
  transition: height 0.3s ease;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
}

.search-cards-tab {
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: white;
  z-index: 2100;
  transition: height 0.3s ease;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
}

.info-window-style {
  background-color: white;
  text-align: center;
  padding: 6px 8px;
  border-radius: 12px;
  border: 1px solid #ccc;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
}
</style>