<template>
  <div v-if="isLoading">
    <div class="ml-5 mt-5">
      <v-skeleton-loader height="30" width="100"></v-skeleton-loader>
    </div>
    <div class="pa-5" style="height: 343px">
      <v-skeleton-loader
          style="width: 100%; height: 100%"
      >
      </v-skeleton-loader>
    </div>
    <div class="ml-5 d-flex">
      <v-skeleton-loader width="300" height="30"/>
    </div>
  </div>
  <div v-else>
    <div class="ml-5 mt-5">
      <span class="header5-medium color-gray800">팝업 위치</span>
    </div>
    <div class="pa-5" style="height: 340px; position: relative" @click="openNaverDirections">
      <NaverMap
          style="width: 100%; height: 100%;"
          :map-options="mapOptions"
      >
        <NaverMarker
            :latitude="store.address.latitude + 0.0002"
            :longitude="store.address.longitude - 0.00027"
        >
          <v-img width="50" height="50" :src="getIconForCategory(store.categories[0].name)"/>
        </NaverMarker>
      </NaverMap>
      <div class="d-flex align-center" style="position: absolute; bottom: 40px; right: 42px; z-index: 1000; border-radius: 6px; background-color: #7C7C7C; padding: 2px 8px;">
        <div>
          <v-img width="25" height="25" cotain src="@/assets/svg/store_detail_map_route.svg"></v-img>
        </div>
        <span class="body3-medium color-white">길찾기</span>
      </div>
    </div>
    <div class="ml-5 d-flex" @click="openNaverDirections" style="cursor: pointer">
      <div class="mr-2">
        <v-img width="24" height="24" src="@/assets/svg/category_location.svg"></v-img>
      </div>
      <span class="body1-medium color-gray600">
             {{ fullAddress }}
      </span>
    </div>
  </div>
  <div style="width: 600px; height: 50px"></div>
</template>

<script setup lang="ts">
import {useStoreDetailStore} from "@/stores/StoreDetailStore";
import {NaverMap, NaverMarker} from "vue3-naver-maps";
import {computed, reactive, watch} from "vue";
import {StoreResponse} from "@/interfaces/StoreDetailInterface";

const storeDetailStore = useStoreDetailStore();
const store = storeDetailStore.storeData as StoreResponse;
const isLoading = storeDetailStore.isLoading;

const fullAddress = computed(() =>
    `${store.address?.region ?? ''} ${store.address?.city ?? ''} ${store.address?.street ?? ''} ${store.address?.detail ?? ''}`
);

const mapOptions = reactive({
  latitude: store.address.latitude, // 지도 중앙 위도
  longitude: store.address.longitude, // 지도 중앙 경도
  zoom: 17,
  draggable: false,
  scrollWheel: false,
  pinchZoom: false,
  keyboardShortcuts: false,
  disableDoubleClickZoom: true,
});

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

function openNaverDirections() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const currentLat = position.coords.latitude;
      const currentLng = position.coords.longitude;
      console.log("내 현재 위도", currentLat);
      console.log("내 현재 경도", currentLng);

      const destinationLat = store.address.latitude;
      const destinationLng = store.address.longitude;
      const naverMapUrl = `https://map.naver.com/index.nhn?slng=${currentLng}&slat=${currentLat}&stext=내위치&elng=${destinationLng}&elat=${destinationLat}&etext=${store.name}&menu=route&pathType=1`;
      window.open(naverMapUrl, '_blank');
    });
  } else {
    alert("위치 정보를 사용할 수 없습니다.");
  }
}



watch(
    () => store.address,
    (newAddress) => {
      if (newAddress.latitude && newAddress.longitude) {
        mapOptions.latitude = newAddress.latitude;
        mapOptions.longitude = newAddress.longitude;
      }
    },
    {immediate: true}
);

</script>

<style scoped>

</style>