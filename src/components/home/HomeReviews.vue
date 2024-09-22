<template>
  <div v-if="homeStore.homeLoading">
    <div class="ml-5">
      <v-skeleton-loader width="130" height="30"/>
    </div>
    <div class="review-cards">
      <div v-for="item in 10" :key="item" class="review-card">
        <div class="d-flex flex-column justify-space-between" style="width: 260px;">
          <v-skeleton-loader width="100" height="20"></v-skeleton-loader>
          <v-skeleton-loader width="250" height="20"></v-skeleton-loader>
          <v-skeleton-loader width="230" height="20"></v-skeleton-loader>
          <v-skeleton-loader width="200" height="20"></v-skeleton-loader>
          <v-skeleton-loader width="100" height="15"></v-skeleton-loader>
        </div>
        <div>
          <v-skeleton-loader width="100" height="100"/>
        </div>
      </div>
    </div>
    <div style="height: 60px;"></div>
  </div>
  <div v-else>
    <div class="ml-5">
      <span class="header4-medium custom-stroke">실시간 후기</span>
    </div>
    <div class="review-cards">
      <div v-for="item in homeStore.homeData.recentReviews" :key="item" class="review-card" @click="goToStoreDetail(item.storeId)">
        <div class="d-flex flex-column justify-space-between" style="width: 260px;">
          <p class="body2-medium color-gray600 text-overflow">{{item.storeName}}</p>
          <p class="body2-medium color-gray800 text-overflow-3">{{ item.comment }}</p>
          <p class="body4-medium color-gray500">{{item.writerName}}&nbsp;·&nbsp;{{timeAgo(item.createdAt)}}</p>
        </div>
        <div>
          <v-img width="100" height="100" cover
                 :src="item.storeThumbnailUrl"
                 style="border-radius: 4px"
          ></v-img>
        </div>
      </div>
    </div>
    <div style="height: 60px;"></div>
  </div>
</template>

<script setup lang="ts">

import {useHomeStore} from "@/stores/HomeStore";
import {useRouter} from "vue-router";

const homeStore = useHomeStore();
const router = useRouter();

function goToStoreDetail(id: number){
  router.push(`/store/${id}`);
}

function timeAgo(dateString: Date): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  if (seconds < intervals.minute) {
    return `${Math.floor(seconds)}초 전`;
  } else if (seconds < intervals.hour) {
    return `${Math.floor(seconds / intervals.minute)}분 전`;
  } else if (seconds < intervals.day) {
    return `${Math.floor(seconds / intervals.hour)}시간 전`;
  } else if (seconds < intervals.month) {
    return `${Math.floor(seconds / intervals.day)}일 전`;
  } else if (seconds < intervals.year) {
    return `${Math.floor(seconds / intervals.month)}개월 전`;
  } else {
    return `${Math.floor(seconds / intervals.year)}년 전`;
  }
}
</script>

<style scoped>
.review-cards{
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  flex-direction: row;
  -ms-overflow-style: none; /* IE 및 Edge에서 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
}
.review-cards::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.review-card{
  display: flex;
  justify-content: space-between;
  min-width: 400px;
  width: 400px;
  height: 150px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #EFEDF0;
  transition: transform 0.3s ease;
  cursor: pointer;
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  white-space: normal;
  position: relative;
}
.review-card:hover {
  transform: scale(1.05);
}
</style>