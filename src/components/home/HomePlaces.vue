<template>
  <div v-if="homeStore.homeLoading">
    <div class="ml-5 mt-5">
      <v-skeleton-loader height="30" width="180"></v-skeleton-loader>
    </div>
    <div class="place-cards">
      <div v-for="item in 12" :key="item" class="place-card align-center">
        <v-skeleton-loader width="160" height="160" style="border-radius: 100%">
        </v-skeleton-loader>
        <v-skeleton-loader width="100" height="30" class="mt-5 text-center"></v-skeleton-loader>
      </div>
    </div>
    <div style="height: 60px;"></div>
  </div>
  <div v-else>
    <div class="ml-5 mt-5">
      <span class="header4-medium custom-stroke">공간별 둘러보기</span>
    </div>
    <div class="place-cards">
      <div v-for="item in homeStore.homeData.places" :key="item" class="place-card">
        <v-avatar size="160">
          <v-img :src="item.imageUrl" contain/>
        </v-avatar>
        <div class="body1-medium color-gray800 mt-5">{{ item.name }}</div>
      </div>
    </div>
    <div style="height: 60px;"></div>
  </div>

</template>

<script setup lang="ts">
import {useHomeStore} from "@/stores/HomeStore";

const homeStore = useHomeStore();
</script>

<style scoped>
.place-cards {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  flex-direction: row;
  -ms-overflow-style: none; /* IE 및 Edge에서 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
}

.place-cards::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.place-card {
  width: 160px;
  height: 250px;
  margin-left: 24px;
  margin-top: 10px;
  transition: transform 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.place-card:hover {
  transform: scale(1.1);
}
</style>