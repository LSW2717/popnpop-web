<template>
  <carousel v-if="homeStore.homeLoading"
            :autoplay="1000"
            :items-to-show="3"
            :wrap-around="true"
            :breakpoints="{
              1600: { itemsToShow: 4 },
              1200: { itemsToShow: 3 },
              800: { itemsToShow: 2 },
              0: { itemsToShow: 1 }
            }"
  >
    <slide v-for="item in 10"
           :key="item"
           style="height: 400px"
    >
      <v-skeleton-loader width="400" height="400"/>
    </slide>

    <template #addons>
      <navigation/>
      <pagination/>
    </template>
  </carousel>
  <carousel v-else
            :autoplay="1000"
            :items-to-show="3"
            :wrap-around="true"
            :breakpoints="{
              1600: { itemsToShow: 4 },
              1200: { itemsToShow: 3 },
              800: { itemsToShow: 2 },
              0: { itemsToShow: 1 }
            }"
  >
    <slide v-for="item in homeStore.homeData.banners"
           :key="item.targetId"
           style="height: 400px"
    >
      <v-img @dblclick="goToStoreDetail(item.targetId)" height="400" :src="item.bannerImagePath" contain style="cursor: pointer;"></v-img>
    </slide>

    <template #addons>
      <navigation/>
      <pagination/>
    </template>
  </carousel>
</template>

<script setup lang="ts">
import {useHomeStore} from "@/stores/HomeStore";
import 'vue3-carousel/dist/carousel.css'
import {Carousel, Navigation, Pagination, Slide} from "vue3-carousel";
import {useRouter} from "vue-router";

const homeStore = useHomeStore();
const router = useRouter();

function goToStoreDetail(id: number){
  router.push(`/store/${id}`);
}

</script>

<style scoped>

</style>