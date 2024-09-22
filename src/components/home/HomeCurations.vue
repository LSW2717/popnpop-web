<template>
  <div v-if="homeStore.homeLoading" class="mt-5">
    <div v-for="item in 2"
         :key="item"
         class="curations-container"
    >
      <div class="ml-5 mt-5">
        <v-skeleton-loader height="30" width="300"></v-skeleton-loader>
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
      <div style="height: 60px;"></div>
    </div>
  </div>
  <div v-else class="mt-5"
       :class="{ 'row-card': curations.reduce((acc: number, curation: StoreByCurationResponse) => acc + curation.stores.length, 0) < 10 }"
  >
    <div v-for="item in curations"
         :key="item.curationId"
    >
      <div v-if="item.stores.length > 0" class="ml-5 mt-5">
        <span class="header4-medium custom-stroke">{{ item.title }}</span>
      </div>
      <div class="d-flex flex-row store-cards">
        <StoreCard
            v-for="store in item.stores"
            :key="store"
            :store="store"
        />
      </div>
      <div style="height: 60px;"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineModel} from "vue";
import {useHomeStore} from "@/stores/HomeStore";
import StoreCard from "@/components/StoreCard.vue";
import {StoreByCurationResponse} from "@/interfaces/HomeInterface";

const curations = defineModel('curations',{
  type: Array,
});

const homeStore = useHomeStore();

</script>

<style scoped>
.store-cards {
  overflow-y: hidden;
  overflow-x: auto;
  white-space: nowrap;
  padding-left: 20px;
  padding-top: 20px;
}

.store-cards::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.store-cards {
  -ms-overflow-style: none; /* IE 및 Edge에서 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
}

.store-card {
  width: 200px;
  height: 340px;
  margin-right: 20px;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.store-card:hover {
  transform: scale(1.1);
}

@media (min-width: 1600px) {
  .row-card {
    display: flex;
  }
}

</style>