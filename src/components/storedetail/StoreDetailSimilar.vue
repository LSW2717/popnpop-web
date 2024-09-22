<template>
  <div v-if="isLoading">
    <div class="ml-5 mt-5">
      <v-skeleton-loader height="30" width="120"></v-skeleton-loader>
    </div>
    <div class="d-flex flex-row store-cards">
      <div v-for="store in 10" :key="store" class="store-card">
        <v-skeleton-loader width="200" height="200" style="border-radius: 12px"/>
        <v-skeleton-loader width="100" height="20" class="mt-2"></v-skeleton-loader>
        <v-skeleton-loader height="20" class="mt-2"></v-skeleton-loader>
        <v-skeleton-loader width="150" height="20" class="my-2"></v-skeleton-loader>
        <v-skeleton-loader width="60" height="20"></v-skeleton-loader>
      </div>
    </div>
    <div style="height: 30px;"></div>
  </div>
  <div v-else-if="similarStores.length > 0 && !isLoading">
    <div class="ml-5 mt-5">
      <span class="header5-medium color-gray800">유사 팝업 추천</span>
    </div>
    <div class="d-flex flex-row store-cards">
      <StoreCard
          v-for="(item, i) in similarStores"
          :key="i"
          :store="item"
      />
    </div>
    <div style="height: 30px;"></div>
  </div>
</template>

<script setup lang="ts">

import StoreCard from "@/components/StoreCard.vue";
import {SimplifiedStoreResponse} from "@/interfaces/HomeInterface";
import {useStoreDetailStore} from "@/stores/StoreDetailStore";

const storeDetailStore = useStoreDetailStore();
const similarStores = storeDetailStore.similarStoresData as SimplifiedStoreResponse[];

const isLoading = storeDetailStore.isLoading;
</script>

<style scoped>
.store-cards {
  overflow-x: auto;
  overflow-y: hidden;
  flex-wrap: nowrap;
  white-space: nowrap;
  padding-left: 20px;
  padding-top: 20px;
  max-width: 100%;
}

.store-cards::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.store-cards {
  -ms-overflow-style: none; /* IE 및 Edge에서 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
}
.store-card{
  flex: 0 0 auto;
  width: 200px;
  height: 340px;
  margin-right: 20px;
  transition: transform 0.3s ease;
  cursor: pointer;
}
</style>