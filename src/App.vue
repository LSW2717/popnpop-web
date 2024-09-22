<template>
  <v-app>
    <v-app-bar flat style="z-index: 1500">
      <v-app-bar-title>
        <v-img width="120" height="23"
               src="@/assets/logo/popnpop_logo.svg"
               style="cursor: pointer;"
               @click="router.push('/home')"
        />
        <v-spacer/>
      </v-app-bar-title>

      <v-btn width="100" class="mr-4 menu-button" v-for="item in appbarItem" :key="item.name" :to="item.router">
        <span class="body1-medium">{{ item.name }}</span>
      </v-btn>

      <v-menu class="text-center">
        <template v-slot:activator="{ props }">
          <v-btn
              width="110"
              v-bind="props"
              class="mr-4 dropdown-menu"
          >
            <span class="body1-medium">{{menuName}}</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
              v-for="(item, index) in appbarItem"
              :key="index"
              :to="item.router"
          >
            <span class="body1-medium">{{ item.name }}</span>
          </v-list-item>
        </v-list>
      </v-menu>
<!--      <v-btn class="color-bg1 mr-4">-->
<!--        <span class="body1-medium text-white">로그인</span>-->
<!--      </v-btn>-->
    </v-app-bar>

    <v-main>
      <router-view :key="route.fullPath" />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useMapStore} from "@/stores/MapStore";

const router = useRouter();
const route = useRoute();

const menuName = computed(() => {
  const currentItem = appbarItem.find(item => item.router === route.path);
  return currentItem ? currentItem.name : '메뉴';
});

const appbarItem = reactive([
  {
    name: '홈',
    router: '/home',
  },
  {
    name: '카테고리',
    router: '/category',
  },
  {
    name: '지도',
    router: '/map',
  },
  // {
  //   name: '저장',
  //   router: '/save',
  // },
  // {
  //   name: '마이페이지',
  //   router: '/mypage',
  // },
]);
const mapSearchParams = useMapStore().mapSearchParams;
function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
          mapSearchParams.currentLatitude = position.coords.latitude;
          mapSearchParams.currentLongitude = position.coords.longitude;
          console.log("현재 위치:", mapSearchParams.currentLatitude, mapSearchParams.currentLongitude);
          return position;
        },
        (error) => {
          console.error("위치 정보를 가져오는 중 오류 발생:", error);
        }
    );
  } else {
    alert("위치정보를 지원하지 않는 브라우저입니다.");
  }
}

onMounted(() => {
  getCurrentLocation();
})

</script>
<style scoped>
@media (max-width: 800px) {
  .menu-button {
    display: none;
  }
}

@media (min-width: 800px) {
  .dropdown-menu {
    display: none;
  }
}
</style>
