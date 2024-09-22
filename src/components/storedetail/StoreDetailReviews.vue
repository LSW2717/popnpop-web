<template>
  <div v-if="isLoading" class="mx-5 mt-5">
    <v-skeleton-loader height="30" width="120"></v-skeleton-loader>
    <v-skeleton-loader class="mt-5" height="220" width="560" style="border-radius: 12px;"></v-skeleton-loader>
    <v-skeleton-loader class="mt-5" height="220" width="560" style="border-radius: 12px;"></v-skeleton-loader>
    <v-skeleton-loader class="mt-5" height="220" width="560" style="border-radius: 12px;"></v-skeleton-loader>
  </div>
  <div v-else>
    <v-dialog v-model="isDialogOpen" max-width="500">
      <v-card>
        <v-img :src="img" style="max-width: 100%;"/>
      </v-card>
    </v-dialog>
    <div class="mx-5 mt-5">
    <span class="header5-medium color-gray800">방문자 리뷰&nbsp;
      <span class="color-gray500">
        ({{ reviews.length }}개)
       </span>
    </span>
    </div>
    <div v-if="reviews.length > 0 && !isLoading">
      <div class="pt-5 review-card" v-for="review in reviews" :key="review.reviewId">
        <div class="d-flex align-center mx-5">
          <p class="body1-medium color-gray650 mr-2">{{ review.writerName }}</p>
          <div class="d-flex">
            <v-img
                v-for="n in review.rate"
                :key="'yellow-' + n"
                width="20"
                height="20"
                src="@/assets/svg/store_detail_review_star_yellow.svg"
            ></v-img>
            <v-img
                v-for="n in (5 - review.rate)"
                :key="'gray-' + n"
                width="20"
                height="20"
                src="@/assets/svg/store_detail_review_star_gray.svg"
            ></v-img>
          </div>
        </div>
        <div class="ma-5">
          <p class="body1-medium color-gray700">
            {{ review.comment }}
          </p>
        </div>
        <div class="d-flex ml-5">
          <div v-for="(img, index) in review.images" class="d-flex" :key="index">
            <v-img @click="toggleDialog(img.imageUrl)" width="120" height="120" :src="img.imageUrl" class="image-container mr-3" cover style="cursor: pointer;"></v-img>
          </div>
        </div>
        <div class="d-flex justify-space-between align-end ma-4" style="height: 50px;">
          <p class="body4-medium color-gray500 ml-1">{{ formatDateWithYear(review.createdAt) }}</p>
          <div class="d-flex align-center">
            <v-img  width="25" height="25" src="@/assets/svg/store_detail_review_thumb.svg"></v-img>
            <p class="color-main1 body3-medium ml-1">{{ review.likedCount }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else style="height: 300px; width: 100%" class="d-flex justify-center align-center">
      <p class="body1-medium color-gray500">팝앤팝 어플로 리뷰를 작성해주세요!</p>
    </div>
  </div>
  <div style="height: 50px; width: 600px"></div>
</template>

<script setup lang="ts">

import {formatDateWithYear} from "@/util/util";
import {ReviewResponse} from "@/interfaces/StoreDetailInterface";
import {useStoreDetailStore} from "@/stores/StoreDetailStore";
import {ref} from "vue";

const storeDetailStore = useStoreDetailStore();
const reviews = storeDetailStore.storeReviewsData as ReviewResponse[];

const isLoading = storeDetailStore.isLoading;
const img = ref<string>('');
const isDialogOpen = ref(false);

const toggleDialog = (imgUrl: string) => {
  img.value = imgUrl;
  isDialogOpen.value = !isDialogOpen.value;
}

</script>

<style scoped>
.image-container {
  border-radius: 8px;
  width: 120px;
  height: 120px;
}

.review-card {
  border-radius: 12px;
  border: 1px solid #EFEDF0;
  margin: 20px;
}

</style>